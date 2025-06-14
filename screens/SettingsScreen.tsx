import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [autoRecord, setAutoRecord] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sensitivityLevel, setSensitivityLevel] = useState('medium');

  const handleSensitivityChange = (level) => {
    setSensitivityLevel(level);
    toast.success(`Detection sensitivity set to ${level}`);
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear App Data",
      "Are you sure you want to clear all app data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear", 
          onPress: () => toast.info("All app data cleared"),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>General</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="notifications" size={22} color="#4CAF50" />
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: "#a5d6a7" }}
            thumbColor={notificationsEnabled ? "#4CAF50" : "#f4f3f4"}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            value={notificationsEnabled}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="fingerprint" size={22} color="#2196F3" />
            <Text style={styles.settingLabel}>Biometric Authentication</Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: "#bbdefb" }}
            thumbColor={biometricAuth ? "#2196F3" : "#f4f3f4"}
            onValueChange={() => setBiometricAuth(!biometricAuth)}
            value={biometricAuth}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="brightness-4" size={22} color="#9E9E9E" />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: "#e0e0e0" }}
            thumbColor={darkMode ? "#9E9E9E" : "#f4f3f4"}
            onValueChange={() => setDarkMode(!darkMode)}
            value={darkMode}
          />
        </View>

        <Text style={styles.sectionTitle}>Safety Features</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="videocam" size={22} color="#F44336" />
            <Text style={styles.settingLabel}>Auto Record in Emergency</Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: "#ffcdd2" }}
            thumbColor={autoRecord ? "#F44336" : "#f4f3f4"}
            onValueChange={() => setAutoRecord(!autoRecord)}
            value={autoRecord}
          />
        </View>
        
        <Text style={[styles.sectionTitle, {marginTop: 20}]}>Detection Sensitivity</Text>
        
        <View style={styles.sensitivityContainer}>
          <TouchableOpacity 
            style={[
              styles.sensitivityButton, 
              sensitivityLevel === 'low' && styles.sensitivityActive
            ]}
            onPress={() => handleSensitivityChange('low')}
          >
            <Text style={[
              styles.sensitivityText,
              sensitivityLevel === 'low' && styles.sensitivityTextActive
            ]}>Low</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.sensitivityButton, 
              sensitivityLevel === 'medium' && styles.sensitivityActive
            ]}
            onPress={() => handleSensitivityChange('medium')}
          >
            <Text style={[
              styles.sensitivityText,
              sensitivityLevel === 'medium' && styles.sensitivityTextActive
            ]}>Medium</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.sensitivityButton, 
              sensitivityLevel === 'high' && styles.sensitivityActive
            ]}
            onPress={() => handleSensitivityChange('high')}
          >
            <Text style={[
              styles.sensitivityText,
              sensitivityLevel === 'high' && styles.sensitivityTextActive
            ]}>High</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sensitivityDescription}>
          Higher sensitivity may increase false alarms but ensures better detection of potential threats.
        </Text>
        
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="person" size={22} color="#333" />
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EmergencyContacts')}>
          <MaterialIcons name="people" size={22} color="#333" />
          <Text style={styles.menuItemText}>Emergency Contacts</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <MaterialIcons name="security" size={22} color="#333" />
          <Text style={styles.menuItemText}>Privacy Policy</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
          <MaterialIcons name="help" size={22} color="#333" />
          <Text style={styles.menuItemText}>Help & Support</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.clearDataButton} onPress={handleClearData}>
          <Text style={styles.clearDataText}>Clear App Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Guardian v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 24,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  sensitivityContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
  },
  sensitivityButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  sensitivityActive: {
    backgroundColor: '#4CAF50',
  },
  sensitivityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  sensitivityTextActive: {
    color: '#fff',
  },
  sensitivityDescription: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 18,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  clearDataButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  clearDataText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
});