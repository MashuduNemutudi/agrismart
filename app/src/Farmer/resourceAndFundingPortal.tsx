import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: 'CASP Irrigation Grant for Small Farmers',
      description: 'Funding for small-scale farmers to implement efficient irrigation systems',
      eligibility: 'Small-scale farmers in Mpumalanga with land-use rights',
    },
    {
      id: 2,
      title: 'High-Yield Seed Subsidy Initiative',
      description: 'Subsidized distribution of high-quality, drought-resistant seed varieties',
      eligibility: 'Registered farmers needing support for initial crop cycles',
    },
    {
      id: 3,
      title: 'Farm Equipment Modernization Loan',
      description: 'Low-interest loans for purchasing modern farm machinery',
      eligibility: 'Established farmers with minimum 3 years experience',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resource & Funding Portal</Text>
      
      {resources.map((resource) => (
        <View key={resource.id} style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
          <Text style={styles.eligibility}>
            <Text style={styles.eligibilityLabel}>Eligibility: </Text>
            {resource.eligibility}
          </Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
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
  resourceCard: {
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
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  eligibility: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  eligibilityLabel: {
    fontWeight: '600',
  },
  detailsButton: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});