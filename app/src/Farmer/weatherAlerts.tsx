import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function WeatherAlerts() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather & Alerts</Text>
      
      {/* Current Weather */}
      <View style={styles.weatherCard}>
        <Text style={styles.location}>Mpumalanga, South Africa</Text>
        <View style={styles.weatherMain}>
          <Text style={styles.temperature}>28°C</Text>
          <Text style={styles.condition}>Sunny</Text>
        </View>
        <View style={styles.weatherDetails}>
          <Text style={styles.detail}>Wind: 12 km/h NE</Text>
          <Text style={styles.detail}>Humidity: 60%</Text>
        </View>
      </View>

      {/* Active Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Alerts</Text>
        
        <View style={[styles.alertCard, styles.criticalAlert]}>
          <Text style={styles.alertType}>Critical</Text>
          <Text style={styles.alertTitle}>
            Temperatures expected to exceed 35°C
          </Text>
          <Text style={styles.alertDescription}>
            High risk of crop stress. Ensure irrigation.
          </Text>
          <Text style={styles.alertDate}>2024-07-25</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details →</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.alertCard, styles.warningAlert]}>
          <Text style={styles.alertType}>Warning</Text>
          <Text style={styles.alertTitle}>Pest Outbreak Alert</Text>
          <Text style={styles.alertDescription}>
            Increased sightings of maize stalk borer. Inspect fields.
          </Text>
          <Text style={styles.alertDate}>2024-07-23</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fff7',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
  },
  weatherCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  condition: {
    fontSize: 18,
    color: '#666',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  criticalAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  warningAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  alertType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  alertDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  detailsButton: {
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
});