import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ApplicationTracker() {
  const applications = [
    {
      id: 1,
      title: 'Farm Operations Intern',
      company: 'Green Harvest Farms',
      appliedDate: '01 Nov 2024',
      status: 'Interview',
      interviewDate: '15 Dec 2024, 10:00 AM',
      type: 'Zoom Meeting',
    },
    {
      id: 2,
      title: 'Agricultural Data Analyst',
      company: 'AgriTech Solutions',
      appliedDate: '25 Oct 2024',
      status: 'Interview',
      interviewDate: '10 Dec 2024, 02:00 PM',
      type: 'On-site',
    },
    {
      id: 3,
      title: 'Youth Outreach Coordinator',
      company: 'Rural Development Inc.',
      appliedDate: '18 Sep 2024',
      status: 'Hired',
    },
    {
      id: 4,
      title: 'Sustainable Farming Assistant',
      company: 'EcoGrow Collective',
      appliedDate: '05 Aug 2024',
      status: 'Applied',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired': return '#4caf50';
      case 'Interview': return '#2196f3';
      case 'Applied': return '#ff9800';
      case 'Rejected': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Application Tracker</Text>
      
      {applications.map((application) => (
        <View key={application.id} style={styles.applicationCard}>
          <View style={styles.applicationHeader}>
            <Text style={styles.jobTitle}>{application.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(application.status) }]}>
              <Text style={styles.statusText}>{application.status}</Text>
            </View>
          </View>
          
          <Text style={styles.company}>{application.company}</Text>
          <Text style={styles.appliedDate}>Applied On: {application.appliedDate}</Text>
          
          {application.interviewDate && (
            <View style={styles.interviewInfo}>
              <Text style={styles.interviewDate}>{application.interviewDate}</Text>
              <Text style={styles.interviewType}>{application.type}</Text>
              {application.type === 'Zoom Meeting' && (
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join/View</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}
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
  applicationCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  appliedDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  interviewInfo: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  interviewDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  interviewType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: '#2e7d32',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});