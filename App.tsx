import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import HomeScreen from "./screens/HomeScreen"
import SettingsScreen from "./screens/SettingsScreen"
import ContactsScreen from "./screens/ContactsScreen"
import MonitoringScreen from "./screens/MonitoringScreen"
import { ThemeProvider } from './context/ThemeContext';
 
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="Monitoring" component={MonitoringScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ThemeProvider>
        <Toaster />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});