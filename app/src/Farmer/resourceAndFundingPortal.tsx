import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Resources() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const resources = [
    {
      id: 1,
      title: 'CASP Irrigation Grant for Small Farmers',
      description: 'Funding for small-scale farmers to implement efficient irrigation systems',
      eligibility: 'Small-scale farmers in Mpumalanga with land-use rights',
      details: {
        amount: 'Up to R50,000',
        deadline: '15 March 2024',
        requirements: [
          'Proof of land ownership or lease agreement',
          'Business plan for irrigation implementation',
          'Quotations for irrigation equipment',
          'Water use license (if applicable)'
        ],
        contact: 'Mpumalanga Dept of Agriculture: 013 766 8000',
        applicationProcess: 'Submit application form with supporting documents to local agricultural office'
      }
    },
    {
      id: 2,
      title: 'High-Yield Seed Subsidy Initiative',
      description: 'Subsidized distribution of high-quality, drought-resistant seed varieties',
      eligibility: 'Registered farmers needing support for initial crop cycles',
      details: {
        amount: '50-70% subsidy on seed costs',
        deadline: 'Ongoing',
        requirements: [
          'Proof of farmer registration',
          'Land preparation evidence',
          'Crop rotation plan',
          'Previous season yield records (if available)'
        ],
        contact: 'National Seed Organization: 012 842 4000',
        applicationProcess: 'Apply through accredited seed distributors with farmer registration documents'
      }
    },
    {
      id: 3,
      title: 'Farm Equipment Modernization Loan',
      description: 'Low-interest loans for purchasing modern farm machinery',
      eligibility: 'Established farmers with minimum 3 years experience',
      details: {
        amount: 'Up to R500,000 at 5% interest',
        deadline: '30 April 2024',
        requirements: [
          'Minimum 3 years farming experience',
          'Financial statements for last 2 years',
          'Quotes for equipment',
          'Collateral security',
          'Business growth plan'
        ],
        contact: 'Land Bank: 0860 552 552',
        applicationProcess: 'Submit loan application through participating financial institutions'
      }
    },
  ];

  const toggleCard = (cardId: number) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const isExpanded = (cardId: number) => expandedCards.includes(cardId);

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
          
          {/* Collapsible Details Section */}
          {isExpanded(resource.id) && (
            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount:</Text>
                <Text style={styles.detailValue}>{resource.details.amount}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Deadline:</Text>
                <Text style={styles.detailValue}>{resource.details.deadline}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Requirements:</Text>
                <View style={styles.requirementsList}>
                  {resource.details.requirements.map((requirement, index) => (
                    <Text key={index} style={styles.requirementItem}>
                      • {requirement}
                    </Text>
                  ))}
                </View>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Contact:</Text>
                <Text style={styles.detailValue}>{resource.details.contact}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Application Process:</Text>
                <Text style={styles.detailValue}>{resource.details.applicationProcess}</Text>
              </View>
            </View>
          )}
          
          <TouchableOpacity 
            style={[
              styles.detailsButton,
              isExpanded(resource.id) && styles.detailsButtonExpanded
            ]}
            onPress={() => toggleCard(resource.id)}
          >
            <Text style={styles.detailsButtonText}>
              {isExpanded(resource.id) ? 'Hide Details' : 'View Details'}
            </Text>
            {isExpanded(resource.id) ? (
              <ChevronUp size={16} color="#fff" />
            ) : (
              <ChevronDown size={16} color="#fff" />
            )}
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
    textAlign: 'center',
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
  detailsSection: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
  requirementsList: {
    marginTop: 4,
  },
  requirementItem: {
    fontSize: 11,
    color: '#555',
    marginBottom: 2,
    lineHeight: 14,
  },
  detailsButton: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  detailsButtonExpanded: {
    backgroundColor: '#1b5e20',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});