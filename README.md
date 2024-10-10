# G2Lister Test

This app is a simple application built using **React Native**.

## Features

- **Authentication**: User can log in depending on his role.
- **Custom Permissions**: Screens and actions vary depending on the user's role (e.g., `basic_user`, `pro_user`).
- **Navigation**: Seamless navigation between different screens using React Navigation.
- **Responsive UI**: Optimized for both Android and iOS devices.

## Prerequisites

Before you begin, ensure you have the following installed on your development environment:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) (version 6.x or later)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) for iOS and Android development.
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dgutierrezd/g2lister-test.git
   cd g2lister-test

2. Install dependencies:

   ```bash
   yarn install

3. Install iOS dependencies (macOS only):

   ```bash
   cd ios
   pod install
   cd ..

## Usage

When the app starts, you will be prompted to log in. You can select between different user roles (`basic_user` and `pro_user`), each with its own permissions and accessible screens.

## Authentication

The app uses a simple login flow that allows users to choose between `basic_user` and `pro_user`:

- **basic_user**: Limited access to certain screens and features.
- **pro_user**: Full access to all screens and features.

## Folder Structure
.
├── android                     # Android specific code
├── ios                         # iOS specific code
├── src                         # Main source code
│   ├── components              # Reusable UI components
│   ├── context                 # Context providers for state management
│   ├── navigation              # Navigation and routes
│   ├── screens                 # All the screens (Login, Task List, etc.)
│   └── config                  # Configuration files (permissions, roles)
├── App.tsx                     # Entry point of the application
├── README.md                   # This README file
└── package.json                # Node.js dependencies and scripts

## Permissions
The app dynamically adjusts its screen navigation based on the logged-in user's role. For example:

`basic_user`: Can access screens X, Y, and Z.
`pro_user`: Can access screens Y and Z.
You can find the permissions setup in `src/config/permissions.ts`.