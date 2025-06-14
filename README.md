# Guardian Safety App

A React Native mobile application designed for personal safety monitoring and emergency response. Guardian provides real-time safety monitoring, threat detection, and emergency alert capabilities using AI-powered analysis.

## Features

### Core Functionality
- 🚨 SOS Emergency Alert System
- 👥 Emergency Contact Management
- 📍 Real-time Location Sharing
- 🎤 Audio Analysis for Threat Detection
- 🎯 Gesture Recognition
- 📱 Motion Pattern Analysis
- 🗺️ Location-based Risk Assessment

### User Experience
- 🌓 Dark/Light Theme Support
- 🔔 Customizable Notifications
- 🔐 Biometric Authentication
- 📊 Adjustable Sensitivity Controls

## Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation v7
- **State Management:** React Context API
- **Storage:** AsyncStorage
- **UI Components:** Native Base & Custom Components
- **Icons:** Expo Vector Icons
- **Notifications:** Sonner Native

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio (Android)
- Git

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd safeguard_ai_LordsHack
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
# or
yarn start
\`\`\`

4. Run on your preferred platform:
- Press \`i\` to run on iOS simulator
- Press \`a\` to run on Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

\`\`\`
safeguard_ai_LordsHack/
├── App.tsx              # Application entry point
├── screens/             # Application screens
│   ├── HomeScreen.tsx       # Main dashboard
│   ├── SettingsScreen.tsx   # App settings
│   ├── ContactsScreen.tsx   # Emergency contacts
│   └── MonitoringScreen.tsx # Safety monitoring
├── context/             # React Context providers
│   └── ThemeContext.tsx    # Theme management
├── components/          # Reusable components
├── assets/             # Images, fonts, etc.
└── package.json        # Project dependencies
\`\`\`

## Core Components

### Home Screen
- Safety monitoring toggle
- SOS emergency button
- Quick access to safety features
- Real-time status display

### Monitoring Screen
- Real-time threat assessment
- Audio analysis visualization
- Gesture detection status
- Motion pattern analysis
- Location risk evaluation

### Settings Screen
- Theme toggle (Dark/Light mode)
- Notification preferences
- Biometric authentication
- Safety feature configuration
- Detection sensitivity adjustment

### Contacts Screen
- Emergency contact management
- Priority-based contact list
- Quick contact addition/editing
- Contact verification system

## Theme Support

The app includes a comprehensive theming system with both light and dark modes:

\`\`\`typescript
theme = {
  light: {
    background: '#f5f5f7',
    surface: '#ffffff',
    text: '#333333',
    // ...other variables
  },
  dark: {
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    // ...other variables
  }
}
\`\`\`

## Development

### Running in Development Mode

1. Start the Expo development server:
\`\`\`bash
npm start
\`\`\`

2. Choose your platform:
- iOS: \`npm run ios\`
- Android: \`npm run android\`
- Web: \`npm run web\`

### Building for Production

1. For iOS:
\`\`\`bash
expo build:ios
\`\`\`

2. For Android:
\`\`\`bash
expo build:android
\`\`\`

## Troubleshooting

Common issues and solutions:

1. **Metro Bundler Issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Dependencies Issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Android Build Fails**
   - Ensure Android Studio is properly configured
   - Check SDK installation
   - Verify gradle settings

4. **iOS Build Fails**
   - Verify XCode installation
   - Check iOS deployment target
   - Update CocoaPods

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and confidential. All rights reserved.

## Support

For support, please contact the development team or create an issue in the repository.
