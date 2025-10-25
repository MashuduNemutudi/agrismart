import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
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
      {/* Header with Profile Icon */}
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderTitle}>Farmer Dashboard</Text>
        <TouchableOpacity 
          style={styles.profileIcon}
          onPress={() => router.push('/src/Farmer/farmerProfile')}
        >
          <Ionicons name="person" size={24} color="#2e7d32" />
        </TouchableOpacity>
      </View>

      {/* Header Banner */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1609157591988-94bb87df0ff1?auto=format&fit=crop&w=1050&q=80',
          }}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerText}>🚜 Farmer Dashboard</Text>
          <Text style={styles.headerSubtext}>Manage your farm operations efficiently</Text>
        </View>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={[styles.metricCard, { backgroundColor: '#a5d6a7' }]}>
          <Ionicons name="leaf" size={28} color="#2e7d32" />
          <Text style={styles.metricValue}>12</Text>
          <Text style={styles.metricLabel}>Weekly Stock</Text>
          <Text style={styles.metricChange}>↑ 5% this week</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: '#ffe082' }]}>
          <Ionicons name="people" size={28} color="#ff8f00" />
          <Text style={styles.metricValue}>38</Text>
          <Text style={styles.metricLabel}>New Applicants</Text>
          <Text style={styles.metricChange}>↑ 15% this week</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        <View style={styles.actionsGrid}>
          

          

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#2196f3' }]}
            onPress={() => router.push('/src/Farmer/hiringPipeline')}
          >
            <Ionicons name="people-outline" size={24} color="#fff" />
            <Text style={styles.actionText}>Hiring Pipeline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#9c27b0' }]}
            onPress={() => router.push('/src/Farmer/candidateMatches')}
          >
            <Ionicons name="checkmark-done-outline" size={24} color="#fff" />
            <Text style={styles.actionText}>Candidates</Text>
          </TouchableOpacity>

          {/* Resources Button */}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#607d8b' }]}
            onPress={() => router.push('/src/Farmer/resourceAndFundingPortal')}
          >
            <Ionicons name="document-text-outline" size={24} color="#fff" />
            <Text style={styles.actionText}>Resources</Text>
          </TouchableOpacity>

          {/* Weather Button */}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#00bcd4' }]}
            onPress={() => router.push('/src/Farmer/WeatherUpdates')}
          >
            <Ionicons name="partly-sunny-outline" size={24} color="#fff" />
            <Text style={styles.actionText}>Weather</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Farm Highlights Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌱 Farm Highlights</Text>
        <View style={styles.imageGrid}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1617687613548-22e9039db897?auto=format&fit=crop&w=1000&q=80',
            }}
            style={styles.farmImage}
          />
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607879644932-6645a9e7e3a2?auto=format&fit=crop&w=1000&q=80',
            }}
            style={styles.farmImage}
          />
        </View>
      </View>

      {/* Latest Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📰 Latest Updates</Text>
        <View
          style={[styles.updateCard, { borderLeftColor: '#4caf50', borderLeftWidth: 5 }]}
        >
          <Text style={styles.updateTitle}>Irrigation Schedule Optimized</Text>
          <Text style={styles.updateDescription}>
            Your AI advisor recommends adjusting your irrigation schedule for maize.
          </Text>
          <Text style={styles.updateTime}>2 hours ago</Text>
        </View>

        <View
          style={[styles.updateCard, { borderLeftColor: '#ff9800', borderLeftWidth: 5 }]}
        >
          <Text style={styles.updateTitle}>New Crop Recovery Guide Available</Text>
          <Text style={styles.updateDescription}>
            Check out the latest guide on recovering from fungal infections.
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
    backgroundColor: '#e8f5e9',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#e8f5e9',
  },
  topHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  profileIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f8e9',
  },
  headerContainer: {
    height: 180,
    position: 'relative',
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 125, 50, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  headerSubtext: {
    color: '#f1f8e9',
    fontSize: 14,
    marginTop: 6,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  metricCard: {
    padding: 16,
    borderRadius: 16,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#388e3c',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
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
    padding: 16,
    borderRadius: 12,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 6,
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  farmImage: {
    width: '48%',
    height: 120,
    borderRadius: 12,
  },
  updateCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  updateDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  updateTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
