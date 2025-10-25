import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FarmerDashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmer Dashboard</Text>
      
      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>12</Text>
          <Text style={styles.metricLabel}>Active Jobs</Text>
          <Text style={styles.metricChange}>↑ 5% this week</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>38</Text>
          <Text style={styles.metricLabel}>New Applicants</Text>
          <Text style={styles.metricChange}>↑ 15% this week</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/src/Farmer/create-harvest-job')}
          >
            <Text style={styles.actionText}>Create Job</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/src/Farmer/cropRecovery')}
          >
            <Text style={styles.actionText}>Crop Recovery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/src/Farmer/hiringPipeline')}
          >
            <Text style={styles.actionText}>Hiring Pipeline</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/src/Farmer/candidateMatches')}
          >
            <Text style={styles.actionText}>Candidates</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Latest Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <View style={styles.updateCard}>
          <Text style={styles.updateTitle}>Irrigation Schedule Optimized</Text>
          <Text style={styles.updateDescription}>
            Your AI advisor recommends adjusting your irrigation schedule for maize
          </Text>
          <Text style={styles.updateTime}>2 hours ago</Text>
        </View>
        
        <View style={styles.updateCard}>
          <Text style={styles.updateTitle}>New Crop Recovery Guide Available</Text>
          <Text style={styles.updateDescription}>
            Check out the latest guide on recovering from fungal infections
          </Text>
          <Text style={styles.updateTime}>Yesterday</Text>
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
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#4caf50',
    marginTop: 2,
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  updateCard: {
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
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  updateDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  updateTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});