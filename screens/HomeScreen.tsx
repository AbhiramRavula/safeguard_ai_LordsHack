import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { useTheme, theme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const [safetyMonitoring, setSafetyMonitoring] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [audioMonitoring, setAudioMonitoring] = useState(false);
  const [gestureDetection, setGestureDetection] = useState(false);
  const [motionDetection, setMotionDetection] = useState(false);

  const toggleSafetyMonitoring = () => {
    const newState = !safetyMonitoring;
    setSafetyMonitoring(newState);
    
    if (newState) {
      toast.success('Safety monitoring activated');
      // Enable all monitoring features when main switch is turned on
      setLocationSharing(true);
      setAudioMonitoring(true);
      setGestureDetection(true);
      setMotionDetection(true);
    } else {
      toast.info('Safety monitoring deactivated');
      // Disable all monitoring features when main switch is turned off
      setLocationSharing(false);
      setAudioMonitoring(false);
      setGestureDetection(false);
      setMotionDetection(false);
    }
  };

  const handleSOSPress = () => {
    toast.error('SOS Alert Triggered!', {
      description: 'Notifying emergency contacts and authorities',
      duration: 5000,
    });
    // In a real app, this would trigger emergency protocols
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { 
        backgroundColor: currentTheme.surface,
        borderBottomColor: currentTheme.border 
      }]}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Guardian</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={currentTheme.text} />
        </TouchableOpacity>
      </View>

      {/* Safety Status Card */}
      <View style={[styles.statusCard, { backgroundColor: currentTheme.surface }]}>
        <View style={styles.statusHeader}>
          <Text style={[styles.statusTitle, { color: currentTheme.text }]}>Safety Status</Text>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, safetyMonitoring ? styles.statusActive : styles.statusInactive]} />
            <Text style={[styles.statusText, { color: currentTheme.text }]}>
              {safetyMonitoring ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
        
        <View style={styles.mainSwitchContainer}>
          <Text style={[styles.switchLabel, { color: currentTheme.text }]}>Enable Safety Monitoring</Text>
          <Switch
            trackColor={{ false: "#d1d1d1", true: currentTheme.accentLight }}
            thumbColor={safetyMonitoring ? currentTheme.accent : "#f4f3f4"}
            onValueChange={toggleSafetyMonitoring}
            value={safetyMonitoring}
          />
        </View>
        
        {safetyMonitoring && (
          <TouchableOpacity 
            style={styles.viewMonitoringButton}
            onPress={() => navigation.navigate('Monitoring')}
          >
            <Text style={[styles.viewMonitoringText, { color: currentTheme.accent }]}>
              View Monitoring Status
            </Text>
            <MaterialIcons name="chevron-right" size={20} color={currentTheme.accent} />
          </TouchableOpacity>
        )}
      </View>

      {/* SOS Button */}
      <TouchableOpacity 
        style={styles.sosButton}
        onPress={handleSOSPress}
        activeOpacity={0.8}
      >
        <View style={[styles.sosInner, { borderColor: currentTheme.error }]}>
          <Text style={[styles.sosText, { color: currentTheme.error }]}>SOS</Text>
        </View>
      </TouchableOpacity>

      {/* Features Section */}
      <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Safety Features</Text>
      
      <ScrollView style={styles.featuresContainer}>
        <View style={[styles.featureCard, { backgroundColor: currentTheme.surface }]}>
          <View style={[styles.featureIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
            <MaterialIcons name="location-on" size={24} color={currentTheme.text} />
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: currentTheme.text }]}>Location Sharing</Text>
            <Text style={[styles.featureDescription, { color: currentTheme.textSecondary }]}>
              Share your real-time location with emergency contacts
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: currentTheme.accentLight }}
            thumbColor={locationSharing ? currentTheme.accent : "#f4f3f4"}
            onValueChange={() => setLocationSharing(!locationSharing)}
            value={locationSharing}
            disabled={!safetyMonitoring}
          />
        </View>

        <View style={[styles.featureCard, { backgroundColor: currentTheme.surface }]}>
          <View style={[styles.featureIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
            <MaterialIcons name="mic" size={24} color={currentTheme.text} />
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: currentTheme.text }]}>Audio Monitoring</Text>
            <Text style={[styles.featureDescription, { color: currentTheme.textSecondary }]}>
              Detects panic or distress in voice patterns
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: currentTheme.accentLight }}
            thumbColor={audioMonitoring ? currentTheme.accent : "#f4f3f4"}
            onValueChange={() => setAudioMonitoring(!audioMonitoring)}
            value={audioMonitoring}
            disabled={!safetyMonitoring}
          />
        </View>

        <View style={[styles.featureCard, { backgroundColor: currentTheme.surface }]}>
          <View style={[styles.featureIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
            <MaterialIcons name="gesture" size={24} color={currentTheme.text} />
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: currentTheme.text }]}>Gesture Detection</Text>
            <Text style={[styles.featureDescription, { color: currentTheme.textSecondary }]}>
              Recognizes distress hand signals and body postures
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: currentTheme.accentLight }}
            thumbColor={gestureDetection ? currentTheme.accent : "#f4f3f4"}
            onValueChange={() => setGestureDetection(!gestureDetection)}
            value={gestureDetection}
            disabled={!safetyMonitoring}
          />
        </View>

        <View style={[styles.featureCard, { backgroundColor: currentTheme.surface }]}>
          <View style={[styles.featureIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
            <MaterialIcons name="run" size={24} color={currentTheme.text} />
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: currentTheme.text }]}>Motion Detection</Text>
            <Text style={[styles.featureDescription, { color: currentTheme.textSecondary }]}>
              Identifies abnormal movement patterns indicating distress
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#d1d1d1", true: currentTheme.accentLight }}
            thumbColor={motionDetection ? currentTheme.accent : "#f4f3f4"}
            onValueChange={() => setMotionDetection(!motionDetection)}
            value={motionDetection}
            disabled={!safetyMonitoring}
          />
        </View>

        <TouchableOpacity 
          style={[styles.contactsButton, { backgroundColor: currentTheme.accent }]}
          onPress={() => navigation.navigate('Contacts')}
        >
          <MaterialIcons name="people" size={24} color="#fff" />
          <Text style={styles.contactsButtonText}>Manage Emergency Contacts</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  statusCard: {
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mainSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  viewMonitoringButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  viewMonitoringText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sosButton: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  sosText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  featuresContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  contactsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  contactsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});