import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function YouthDashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back</Text>
        <Text style={styles.name}>John Crack</Text>
        <Text style={styles.subtitle}>Ready to find your next opportunity?</Text>
      </View>

      {/* Job Highlights */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Job Highlights</Text>
          <TouchableOpacity onPress={() => router.push('./(tabs)/youth/jobs')}>
            <Text style={styles.viewAll}>View All Jobs</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>Farm Operations Manager</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>New</Text>
            </View>
          </View>
          <Text style={styles.company}>GreenHarvest Co.</Text>
          <Text style={styles.location}>Rural Area, CA</Text>
          <Text style={styles.salary}>R65k/year</Text>
          <TouchableOpacity style={styles.quickApply}>
            <Text style={styles.quickApplyText}>Quick Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Applications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Applications</Text>
        <View style={styles.applicationsGrid}>
          <View style={styles.applicationStat}>
            <Text style={styles.applicationNumber}>8</Text>
            <Text style={styles.applicationLabel}>Applied</Text>
          </View>
          <View style={styles.applicationStat}>
            <Text style={styles.applicationNumber}>2</Text>
            <Text style={styles.applicationLabel}>Interviewing</Text>
          </View>
          <View style={styles.applicationStat}>
            <Text style={styles.applicationNumber}>1</Text>
            <Text style={styles.applicationLabel}>Hired</Text>
          </View>
        </View>
      </View>

      {/* Featured Training */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Training</Text>
          <TouchableOpacity onPress={() => router.push('./(tabs)/youth/skills')}>
            <Text style={styles.viewAll}>Explore Courses</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.trainingCard}>
          <Text style={styles.trainingTitle}>Sustainable Soil Health</Text>
          <Text style={styles.trainingDescription}>
            Learn advanced techniques for maintaining soil health and fertility
          </Text>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue Course</Text>
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
  header: {
    marginBottom: 24,
  },
  welcome: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  viewAll: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  newBadge: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  salary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
  },
  quickApply: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickApplyText: {
    color: '#fff',
    fontWeight: '600',
  },
  applicationsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applicationStat: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flex: 0.3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applicationNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  applicationLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  trainingCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trainingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  trainingDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  continueButton: {
    backgroundColor: '#66bb6a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});