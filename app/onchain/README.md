# On-Chain Module (Soroban Contracts)

This module contains Soroban smart contracts for Soter's on-chain escrow and claimable packages functionality.

## 🧠 AidEscrow Contract

The **AidEscrow** contract facilitates secure, transparent aid disbursement. Packages are created for specific recipients with locked funds, and can be disbursed by administrators.

### Core Invariants
* **Solvency:** A package cannot be created if `Contract Balance < Total Locked Amount + New Package Amount`.
* **State Machine:** A package transitions from `Created` to `Claimed` when disbursed.
* **Time-Bounds:** Packages can have expiration times.
* **Admin Sovereignty:** Only the admin or authorized distributors can create packages and disburse funds.

### Method Reference

| Method | Description | Auth Required |
| :--- | :--- | :--- |
| `init(admin)` | Initializes the contract. Must be called once. | None |
| `create_package(operator, id, recipient, amount, token, expires_at)` | Creates a package locking funds for a recipient. | `admin` or `distributor` |
| `disburse(id)` | Admin manually disburses funds to the recipient. | `admin` |

## 🚀 Quick Start

## 🚀 Quick Start

### Prerequisites
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf [https://sh.rustup.rs](https://sh.rustup.rs) | sh

# Add WebAssembly target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install --locked soroban-cli