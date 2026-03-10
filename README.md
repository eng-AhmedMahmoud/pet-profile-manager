# Pet Profile Manager 🐾

> A mobile app for managing pet profiles, built with React Native and Expo.

## Overview

A clean, simple mobile application where users can manage their pets' profiles. Features include viewing a list of pets, adding new pets, editing existing ones, deleting pets with confirmation, and viewing detailed pet information.

## Features

- Pet list with species emoji avatars and breed info
- Add new pets with species picker and breed suggestions
- Edit existing pet profiles
- Delete with confirmation modal
- Detailed pet view with all information
- AsyncStorage persistence
- Empty state when no pets exist
- Clean navigation with slide animations

## Architecture

```
src/
├── types/          # TypeScript interfaces (Pet, Species, PetFormData)
├── constants/      # Species config, avatar colors, mock data
├── context/        # PetContext with React Context API + AsyncStorage
├── components/
│   ├── ui/         # Reusable UI (Button, Input, Card, ConfirmModal, EmptyState)
│   └── pet/        # Pet-specific (PetAvatar, PetCard)
├── screens/        # PetListScreen, PetFormScreen, PetDetailScreen
└── hooks/          # Custom hooks (reserved for future use)
```

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native + Expo | Cross-platform mobile framework |
| TypeScript | Type safety |
| React Navigation | Native stack navigation with typed routes |
| React Context API | State management |
| AsyncStorage | Local data persistence |
| EAS Update | Over-the-air preview distribution |

## Design Decisions

1. **Context API over Redux** - Simple state needs; no global cross-cutting concerns
2. **AsyncStorage persistence** - Data survives app restarts
3. **Species picker with breed suggestions** - Quick data entry, less typing
4. **Reusable UI library** - Consistent look across all screens
5. **Custom headers** - Full control over navigation appearance

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

### Installation

```bash
git clone <repo-url>
cd pet-profile-manager
npm install
```

### Running

```bash
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan QR with Expo Go.

## Screens

- **Pet List** - Main screen with FlatList of pet cards, add button, delete confirmation
- **Add/Edit Pet** - Reusable form with species picker, breed suggestions, validation
- **Pet Detail** - Full pet info with hero avatar, details card, notes, dates, edit/delete actions

## Live Preview

You can try the app without installing it from the stores:

1. Install **[Expo Go](https://expo.dev/go)** on your phone (free on the App Store and Google Play)
2. Open the [EAS Dashboard](https://expo.dev/accounts/charlez/projects/pet-profile-manager/updates/4487e9b1-c6c2-4a8f-a843-7f25a334484d) link
3. Scan the QR code shown on the dashboard with your phone camera
4. The app will open directly in Expo Go — no build or download required

## Bonus Features

- [x] Pet avatar placeholder (emoji-based with colored background)
- [x] Confirmation before deleting a pet
- [x] Empty state when no pets exist
- [x] Data persistence with AsyncStorage
- [x] Species-based breed suggestions
- [x] Form validation with error messages
