//! Assert that AidEscrow emits the correct indexer-friendly events for each key transition.

#![cfg(test)]

use aid_escrow::{AidEscrow, AidEscrowClient};
use soroban_sdk::{
    Address, Env, IntoVal, Map, Symbol, TryFromVal, Val, Vec, symbol_short,
    testutils::{Address as _, Events, Ledger},
    token::{StellarAssetClient, TokenClient},
};

fn setup_token(env: &Env, admin: &Address) -> (TokenClient<'static>, StellarAssetClient<'static>) {
    let token_contract = env.register_stellar_asset_contract_v2(admin.clone());
    let token_client = TokenClient::new(env, &token_contract.address());
    let token_admin_client = StellarAssetClient::new(env, &token_contract.address());
    (token_client, token_admin_client)
}

/// Returns events from the given contract. Each element: (contract_id, topics, data).
fn contract_events(
    env: &Env,
    contract_id: &Address,
) -> std::vec::Vec<(Address, Vec<Val>, Val)> {
    env.events()
        .all()
        .into_iter()
        .filter(|(id, _, _)| id == contract_id)
        .collect()
}

/// Asserts that the last event from the contract has the given topic and returns its data Val.
fn assert_last_event_topic(env: &Env, contract_id: &Address, topic_val: Val) -> Val {
    let events = contract_events(env, contract_id);
    let found = events
        .iter()
        .rev()
        .find(|(_, topics, _)| topics.first().as_ref() == Some(&topic_val));
    assert!(
        found.is_some(),
        "expected event with given topic, got {} contract events",
        events.len()
    );
    found.unwrap().2.clone()
}

/// Symbol for event key "package_id" (longer than symbol_short max 9 chars).
fn sym_package_id(env: &Env) -> Symbol {
    Symbol::new(env, "package_id")
}

#[test]
fn test_escrow_funded_emits_event() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let (token_client, token_admin_client) = setup_token(&env, &admin);

    let contract_id = env.register(AidEscrow, ());
    let client = AidEscrowClient::new(&env, &contract_id);
    client.init(&admin);

    token_admin_client.mint(&admin, &10_000);

    client.fund(&token_client.address, &admin, &5000);

    let data = assert_last_event_topic(
        &env,
        &contract_id,
        symbol_short!("escrow_funded").into_val(&env),
    );
    let map = Map::<Symbol, Val>::try_from_val(&env, &data).unwrap();
    assert_eq!(map.get(symbol_short!("from")), Some(admin.into_val(&env)));
    assert_eq!(
        map.get(symbol_short!("amount")),
        Some(5000i128.into_val(&env))
    );
    assert!(map.get(symbol_short!("timestamp")).is_some());
}

#[test]
fn test_package_created_emits_event() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let recipient = Address::generate(&env);
    let (token_client, token_admin_client) = setup_token(&env, &admin);

    let contract_id = env.register(AidEscrow, ());
    let client = AidEscrowClient::new(&env, &contract_id);
    client.init(&admin);
    token_admin_client.mint(&admin, &10_000);
    client.fund(&token_client.address, &admin, &5000);

    let expires_at = env.ledger().timestamp() + 86400;
    let pkg_id = 42u64;
    client.create_package(
        &admin,
        &pkg_id,
        &recipient,
        &1000,
        &token_client.address,
        &expires_at,
    );

    let data = assert_last_event_topic(
        &env,
        &contract_id,
        symbol_short!("package_created").into_val(&env),
    );
    let map = Map::<Symbol, Val>::try_from_val(&env, &data).unwrap();
    assert_eq!(
        map.get(sym_package_id(&env)),
        Some(42u64.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("recipient")),
        Some(recipient.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("amount")),
        Some(1000i128.into_val(&env))
    );
    assert_eq!(map.get(symbol_short!("actor")), Some(admin.into_val(&env)));
    assert!(map.get(symbol_short!("timestamp")).is_some());
}

#[test]
fn test_package_claimed_emits_event() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let recipient = Address::generate(&env);
    let (token_client, token_admin_client) = setup_token(&env, &admin);

    let contract_id = env.register(AidEscrow, ());
    let client = AidEscrowClient::new(&env, &contract_id);
    client.init(&admin);
    token_admin_client.mint(&admin, &10_000);
    client.fund(&token_client.address, &admin, &5000);

    let expires_at = env.ledger().timestamp() + 86400;
    let pkg_id = 0u64;
    client.create_package(
        &admin,
        &pkg_id,
        &recipient,
        &1000,
        &token_client.address,
        &expires_at,
    );

    client.claim(&pkg_id);

    let data = assert_last_event_topic(
        &env,
        &contract_id,
        symbol_short!("package_claimed").into_val(&env),
    );
    let map = Map::<Symbol, Val>::try_from_val(&env, &data).unwrap();
    assert_eq!(
        map.get(sym_package_id(&env)),
        Some(0u64.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("recipient")),
        Some(recipient.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("amount")),
        Some(1000i128.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("actor")),
        Some(recipient.into_val(&env))
    );
    assert!(map.get(symbol_short!("timestamp")).is_some());
}

#[test]
fn test_package_disbursed_emits_event() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let recipient = Address::generate(&env);
    let (token_client, token_admin_client) = setup_token(&env, &admin);

    let contract_id = env.register(AidEscrow, ());
    let client = AidEscrowClient::new(&env, &contract_id);
    client.init(&admin);
    token_admin_client.mint(&admin, &10_000);
    client.fund(&token_client.address, &admin, &5000);

    let expires_at = env.ledger().timestamp() + 86400;
    let pkg_id = 0u64;
    client.create_package(
        &admin,
        &pkg_id,
        &recipient,
        &1000,
        &token_client.address,
        &expires_at,
    );

    client.disburse(&pkg_id);

    let data = assert_last_event_topic(
        &env,
        &contract_id,
        symbol_short!("package_disbursed").into_val(&env),
    );
    let map = Map::<Symbol, Val>::try_from_val(&env, &data).unwrap();
    assert_eq!(
        map.get(sym_package_id(&env)),
        Some(0u64.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("recipient")),
        Some(recipient.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("amount")),
        Some(1000i128.into_val(&env))
    );
    assert_eq!(map.get(symbol_short!("actor")), Some(admin.into_val(&env)));
    assert!(map.get(symbol_short!("timestamp")).is_some());
}

#[test]
fn test_package_revoked_emits_event() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let recipient = Address::generate(&env);
    let (token_client, token_admin_client) = setup_token(&env, &admin);

    let contract_id = env.register(AidEscrow, ());
    let client = AidEscrowClient::new(&env, &contract_id);
    client.init(&admin);
    token_admin_client.mint(&admin, &10_000);
    client.fund(&token_client.address, &admin, &5000);

    let expires_at = env.ledger().timestamp() + 86400;
    let pkg_id = 0u64;
    client.create_package(
        &admin,
        &pkg_id,
        &recipient,
        &1000,
        &token_client.address,
        &expires_at,
    );

    client.revoke(&pkg_id);

    let data = assert_last_event_topic(
        &env,
        &contract_id,
        symbol_short!("package_revoked").into_val(&env),
    );
    let map = Map::<Symbol, Val>::try_from_val(&env, &data).unwrap();
    assert_eq!(
        map.get(sym_package_id(&env)),
        Some(0u64.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("recipient")),
        Some(recipient.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("amount")),
        Some(1000i128.into_val(&env))
    );
    assert_eq!(map.get(symbol_short!("actor")), Some(admin.into_val(&env)));
    assert!(map.get(symbol_short!("timestamp")).is_some());
}

#[test]
fn test_package_refunded_emits_event() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let recipient = Address::generate(&env);
    let (token_client, token_admin_client) = setup_token(&env, &admin);

    let contract_id = env.register(AidEscrow, ());
    let client = AidEscrowClient::new(&env, &contract_id);
    client.init(&admin);
    token_admin_client.mint(&admin, &10_000);
    client.fund(&token_client.address, &admin, &5000);

    let expires_at = env.ledger().timestamp() + 1; // expires soon
    let pkg_id = 0u64;
    client.create_package(
        &admin,
        &pkg_id,
        &recipient,
        &1000,
        &token_client.address,
        &expires_at,
    );

    env.ledger().set_timestamp(env.ledger().timestamp() + 2);
    client.refund(&pkg_id);

    let data = assert_last_event_topic(
        &env,
        &contract_id,
        symbol_short!("package_refunded").into_val(&env),
    );
    let map = Map::<Symbol, Val>::try_from_val(&env, &data).unwrap();
    assert_eq!(
        map.get(sym_package_id(&env)),
        Some(0u64.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("recipient")),
        Some(recipient.into_val(&env))
    );
    assert_eq!(
        map.get(symbol_short!("amount")),
        Some(1000i128.into_val(&env))
    );
    assert_eq!(map.get(symbol_short!("actor")), Some(admin.into_val(&env)));
    assert!(map.get(symbol_short!("timestamp")).is_some());
}
