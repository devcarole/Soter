# PR: Basic Navigation Structure for Future Aid Flows (UI) (#69)

## Related Issue

Fixes #69

## Branch

`feat/navigation-aid-flows`

## Overview

Sets up the structural foundation for future aid-related flows (such as viewing aid packages and claims) in the mobile app. To avoid blocking the `main` branch with incomplete features, placeholder UI and basic route definitions have been added. The navigator is now scaled to support these upcoming features cleanly.

## Changes

### Navigation

- **[MODIFY]** [`src/navigation/types.ts`](file:///c:/Users/pd307/Pictures/opensource/Soter/app/mobile/src/navigation/types.ts)
  - Added `AidOverview` and `AidDetails` to the `RootStackParamList`. `AidDetails` accepts an `aidId: string` parameter.
- **[MODIFY]** [`src/navigation/AppNavigator.tsx`](file:///c:/Users/pd307/Pictures/opensource/Soter/app/mobile/src/navigation/AppNavigator.tsx)
  - Grouped existing screens under `Core Screens`.
  - Registered `AidOverview` and `AidDetails` screens under `Aid Flow Screens (Placeholders)`.

### Screens & UI

- **[MODIFY]** [`src/screens/HomeScreen.tsx`](file:///c:/Users/pd307/Pictures/opensource/Soter/app/mobile/src/screens/HomeScreen.tsx)
  - Added two placeholder action buttons for future flows.
  - Buttons currently show an alert (`Coming in a future wave`) when pressed to indicate they are under construction.
- **[NEW]** [`src/screens/AidOverviewScreen.tsx`](file:///c:/Users/pd307/Pictures/opensource/Soter/app/mobile/src/screens/AidOverviewScreen.tsx)
  - Created a simple placeholder screen component.
- **[NEW]** [`src/screens/AidDetailsScreen.tsx`](file:///c:/Users/pd307/Pictures/opensource/Soter/app/mobile/src/screens/AidDetailsScreen.tsx)
  - Created a simple placeholder screen component that reads the `aidId` param.

### Tests

- **[NEW]** [`src/__tests__/AppNavigator.test.tsx`](file:///c:/Users/pd307/Pictures/opensource/Soter/app/mobile/src/__tests__/AppNavigator.test.tsx)
  - Verifies the `NavigationContainer` mounts without crashing and defaults to the Home screen.
- **[MODIFY]** [`src/__tests__/HomeScreen.test.tsx`](file:///c:/Users/pd307/Pictures/opensource/Soter/app/mobile/src/__tests__/HomeScreen.test.tsx)
  - Added tests to ensure placeholder buttons trigger the correct `Alert.alert`.

## How to Run Tests

From `app/mobile`:

```bash
pnpm test
```

## Verification Results

| Requirement | Status |
|---|---|
| Clearly named/grouped screens in Navigator | Done |
| Placeholder routes (AidOverview, AidDetails) added | Done |
| Navigation Types updated | Done |
| HomeScreen shows placeholder buttons with Alert | Done |
| Navigator works without runtime errors | Done (Tests pass) |
| Tests cover navigation configuration and new UI | Done |

## Verification Evidence

> Attach your screenshot or screen recording showing the navigation between Home and Health, and showing the placeholder Alert below:

<!-- ![Demo](./path/to/demo.mp4) -->
