import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { useTheme, theme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

// Simulated AI detection data
const initialDetectionData = {
  audioAnalysis: {
    status: 'monitoring',
    confidence: 0,
    lastUpdate: new Date(),
    detectedEmotions: []
  },
  gestureDetection: {
    status: 'monitoring',
    confidence: 0,
    lastUpdate: new Date(),
    detectedGestures: []
  },
  motionAnalysis: {
    status: 'monitoring',
    confidence: 0,
    lastUpdate: new Date(),
    detectedPatterns: []
  },
  locationRisk: {
    status: 'monitoring',
    riskLevel: 'low',
    lastUpdate: new Date(),
    nearbyIncidents: 0
  }
};

export default function MonitoringScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const [detectionData, setDetectionData] = useState(initialDetectionData);
  const [overallThreatLevel, setOverallThreatLevel] = useState('low');
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Simulate AI detection updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random data changes
      const audioConfidence = Math.random() * 100;
      const gestureConfidence = Math.random() * 100;
      const motionConfidence = Math.random() * 100;
      
      // Update detection data
      setDetectionData(prev => ({
        audioAnalysis: {
          ...prev.audioAnalysis,
          confidence: audioConfidence,
          status: audioConfidence > 70 ? 'alert' : 'monitoring',
          lastUpdate: new Date(),
          detectedEmotions: audioConfidence > 70 ? ['fear', 'distress'] : []
        },
        gestureDetection: {
          ...prev.gestureDetection,
          confidence: gestureConfidence,
          status: gestureConfidence > 70 ? 'alert' : 'monitoring',
          lastUpdate: new Date(),
          detectedGestures: gestureConfidence > 70 ? ['hands up', 'defensive posture'] : []
        },
        motionAnalysis: {
          ...prev.motionAnalysis,
          confidence: motionConfidence,
          status: motionConfidence > 70 ? 'alert' : 'monitoring',
          lastUpdate: new Date(),
          detectedPatterns: motionConfidence > 70 ? ['sudden movement', 'fall detected'] : []
        },
        locationRisk: {
          ...prev.locationRisk,
          riskLevel: Math.random() > 0.7 ? 'medium' : 'low',
          lastUpdate: new Date(),
          nearbyIncidents: Math.floor(Math.random() * 5)
        }
      }));
      
      // Simulate threat level calculation
      const threatChance = Math.random();
      if (threatChance > 0.95) {
        setOverallThreatLevel('high');
        toast.error('High threat level detected!', {
          description: 'Emergency protocols activated',
        });
      } else if (threatChance > 0.8) {
        setOverallThreatLevel('medium');
        toast.warning('Elevated risk detected', {
          description: 'Monitoring closely',
        });
      } else {
        setOverallThreatLevel('low');
      }
      
      setIsAnalyzing(false);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'alert':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      default:
        return '#4CAF50';
    }
  };
  
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      default:
        return '#4CAF50';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { 
        backgroundColor: currentTheme.surface,
        borderBottomColor: currentTheme.border 
      }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Safety Monitoring</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Overall Threat Level */}
        <View style={[styles.threatCard, { 
          backgroundColor: currentTheme.surface,
        }]}>
          <Text style={[styles.threatTitle, { color: currentTheme.text }]}>Overall Threat Assessment</Text>
          
          {isAnalyzing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={currentTheme.accent} />
              <Text style={[styles.loadingText, { color: currentTheme.textSecondary }]}>
                Analyzing environment...
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.threatLevelContainer}>
                <View style={[styles.threatIndicator, { backgroundColor: getRiskColor(overallThreatLevel) }]} />
                <Text style={[styles.threatLevel, { color: currentTheme.text }]}>
                  {overallThreatLevel.toUpperCase()} RISK
                </Text>
              </View>
              <Text style={[styles.threatDescription, { color: currentTheme.textSecondary }]}>
                AI-powered analysis of your environment indicates {overallThreatLevel} risk level.
                {overallThreatLevel !== 'low' && ' Maintaining heightened awareness is recommended.'}
              </Text>
            </>
          )}
        </View>

        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Detection Modules</Text>

        {/* Audio Analysis Module */}
        <View style={[styles.moduleCard, { backgroundColor: currentTheme.surface }]}>
          <View style={styles.moduleHeader}>
            <View style={[styles.moduleIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
              <MaterialIcons name="mic" size={20} color={currentTheme.text} />
            </View>
            <Text style={[styles.moduleTitle, { color: currentTheme.text }]}>Audio Analysis</Text>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(detectionData.audioAnalysis.status) }]} />
          </View>
          
          <View style={styles.moduleContent}>
            <View style={styles.confidenceBar}>
              <View 
                style={[
                  styles.confidenceFill,
                  { 
                    backgroundColor: currentTheme.accent,
                    width: `${detectionData.audioAnalysis.confidence}%`
                  }
                ]} 
              />
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Status</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {detectionData.audioAnalysis.status.toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Last Update</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {formatTime(detectionData.audioAnalysis.lastUpdate)}
              </Text>
            </View>
            
            {detectionData.audioAnalysis.detectedEmotions.length > 0 && (
              <View style={styles.detectedItemsContainer}>
                <Text style={[styles.detectedItemsLabel, { color: currentTheme.textSecondary }]}>
                  Detected Emotions
                </Text>
                <View style={styles.detectedItems}>
                  {detectionData.audioAnalysis.detectedEmotions.map((emotion, index) => (
                    <View 
                      key={index} 
                      style={[styles.detectedItem, { backgroundColor: currentTheme.errorLight }]}
                    >
                      <Text style={[styles.detectedItemText, { color: currentTheme.error }]}>
                        {emotion}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
        
        {/* Gesture Detection Module */}
        <View style={[styles.moduleCard, { backgroundColor: currentTheme.surface }]}>
          <View style={styles.moduleHeader}>
            <View style={[styles.moduleIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
              <MaterialIcons name="gesture" size={20} color={currentTheme.text} />
            </View>
            <Text style={[styles.moduleTitle, { color: currentTheme.text }]}>Gesture Detection</Text>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(detectionData.gestureDetection.status) }]} />
          </View>
          
          <View style={styles.moduleContent}>
            <View style={styles.confidenceBar}>
              <View 
                style={[
                  styles.confidenceFill,
                  { 
                    backgroundColor: currentTheme.accent,
                    width: `${detectionData.gestureDetection.confidence}%`
                  }
                ]} 
              />
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Status</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {detectionData.gestureDetection.status.toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Last Update</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {formatTime(detectionData.gestureDetection.lastUpdate)}
              </Text>
            </View>
            
            {detectionData.gestureDetection.detectedGestures.length > 0 && (
              <View style={styles.detectedItemsContainer}>
                <Text style={[styles.detectedItemsLabel, { color: currentTheme.textSecondary }]}>
                  Detected Gestures
                </Text>
                <View style={styles.detectedItems}>
                  {detectionData.gestureDetection.detectedGestures.map((gesture, index) => (
                    <View 
                      key={index} 
                      style={[styles.detectedItem, { backgroundColor: currentTheme.errorLight }]}
                    >
                      <Text style={[styles.detectedItemText, { color: currentTheme.error }]}>
                        {gesture}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
        
        {/* Motion Analysis Module */}
        <View style={[styles.moduleCard, { backgroundColor: currentTheme.surface }]}>
          <View style={styles.moduleHeader}>
            <View style={[styles.moduleIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
              <MaterialIcons name="directions-run" size={20} color={currentTheme.text} />
            </View>
            <Text style={[styles.moduleTitle, { color: currentTheme.text }]}>Motion Analysis</Text>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(detectionData.motionAnalysis.status) }]} />
          </View>
          
          <View style={styles.moduleContent}>
            <View style={styles.confidenceBar}>
              <View 
                style={[
                  styles.confidenceFill,
                  { 
                    backgroundColor: currentTheme.accent,
                    width: `${detectionData.motionAnalysis.confidence}%`
                  }
                ]} 
              />
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Status</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {detectionData.motionAnalysis.status.toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Last Update</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {formatTime(detectionData.motionAnalysis.lastUpdate)}
              </Text>
            </View>
            
            {detectionData.motionAnalysis.detectedPatterns.length > 0 && (
              <View style={styles.detectedItemsContainer}>
                <Text style={[styles.detectedItemsLabel, { color: currentTheme.textSecondary }]}>
                  Detected Patterns
                </Text>
                <View style={styles.detectedItems}>
                  {detectionData.motionAnalysis.detectedPatterns.map((pattern, index) => (
                    <View 
                      key={index} 
                      style={[styles.detectedItem, { backgroundColor: currentTheme.errorLight }]}
                    >
                      <Text style={[styles.detectedItemText, { color: currentTheme.error }]}>
                        {pattern}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
        
        {/* Location Risk Module */}
        <View style={[styles.moduleCard, { backgroundColor: currentTheme.surface }]}>
          <View style={styles.moduleHeader}>
            <View style={[styles.moduleIconContainer, { backgroundColor: currentTheme.surfaceSecondary }]}>
              <MaterialIcons name="location-on" size={20} color={currentTheme.text} />
            </View>
            <Text style={[styles.moduleTitle, { color: currentTheme.text }]}>Location Risk Assessment</Text>
            <View style={[styles.statusDot, { backgroundColor: getRiskColor(detectionData.locationRisk.riskLevel) }]} />
          </View>
          
          <View style={styles.moduleContent}>
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Risk Level</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {detectionData.locationRisk.riskLevel.toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Nearby Incidents</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {detectionData.locationRisk.nearbyIncidents}
              </Text>
            </View>
            
            <View style={styles.moduleDetails}>
              <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>Last Update</Text>
              <Text style={[styles.detailValue, { color: currentTheme.text }]}>
                {formatTime(detectionData.locationRisk.lastUpdate)}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.emergencyButton, { backgroundColor: currentTheme.error }]}
          onPress={() => {
            toast.error('Emergency services contacted');
          }}
        >
          <Text style={styles.emergencyButtonText}>Contact Emergency Services</Text>
        </TouchableOpacity>
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
    padding: 16,
  },
  threatCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  threatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  threatLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  threatIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  threatLevel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  threatDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moduleIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moduleTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  moduleContent: {
    paddingTop: 8,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
  },
  moduleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detectedItemsContainer: {
    marginTop: 12,
  },
  detectedItemsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detectedItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detectedItem: {
    backgroundColor: '#ffebee',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  detectedItemText: {
    fontSize: 12,
    color: '#F44336',
    fontWeight: '500',
  },
  emergencyButton: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  emergencyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});