import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function YouthProfile() {
  const router = useRouter();
  const feedbackInputRef = useRef<TextInput>(null); // 👈 Added ref

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            router.replace('/src/auth/login');
          }
        }
      ]
    );
  };

  const handleHelpPress = () => { // 👈 Added function
    if (feedbackInputRef.current) {
      feedbackInputRef.current.focus();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Youth Profile</Text>
      
      <View style={styles.profileCard}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#2e7d32" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Aisha Hassan</Text>
            <Text style={styles.email}>aisha.hassan@agriconnect.org</Text>
            <Text style={styles.phone}>+1 (555) 123-4567</Text>
          </View>
        </View>
        <Text style={styles.location}>📍 Nairobi, Kenya</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.educationCard}>
          <Ionicons name="school-outline" size={20} color="#2e7d32" />
          <View style={styles.educationInfo}>
            <Text style={styles.educationTitle}>B.Sc. in Agricultural Economics</Text>
            <Text style={styles.educationInstitution}>Greenland University</Text>
            <Text style={styles.educationPeriod}>2019 - 2023</Text>
          </View>
        </View>
        
        <View style={styles.educationCard}>
          <Ionicons name="ribbon-outline" size={20} color="#2e7d32" />
          <View style={styles.educationInfo}>
            <Text style={styles.educationTitle}>Diploma in Sustainable Farming</Text>
            <Text style={styles.educationInstitution}>Rural AgTech Institute</Text>
            <Text style={styles.educationPeriod}>2018 - 2019</Text>
          </View>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color="#2e7d32" />
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          <Text style={styles.skillTag}>Digital Marketing</Text>
          <Text style={styles.skillTag}>Farm Management Software</Text>
          <Text style={styles.skillTag}>Crop Yield Analysis</Text>
          <Text style={styles.skillTag}>Data Entry</Text>
          <Text style={styles.skillTag}>Microsoft Excel</Text>
          <Text style={styles.skillTag}>Communication</Text>
          <Text style={styles.skillTag}>Problem Solving</Text>
          <Text style={styles.skillTag}>Teamwork</Text>
        </View>
      </View>

      {/* Work Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Preferences</Text>
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceItem}>
            <Ionicons name="briefcase-outline" size={16} color="#666" />
            <Text style={styles.preferenceLabel}>Roles:</Text>
            <Text style={styles.preferenceValue}>Farm Operations, Agricultural Consultant</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Ionicons name="business-outline" size={16} color="#666" />
            <Text style={styles.preferenceLabel}>Industry:</Text>
            <Text style={styles.preferenceValue}>Sustainable Agriculture, Agribusiness</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.preferenceLabel}>Salary:</Text>
            <Text style={styles.preferenceValue}>$40,000 - $55,000 / year</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.preferenceLabel}>Availability:</Text>
            <Text style={styles.preferenceValue}>Full-time, Monday - Friday</Text>
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="create-outline" size={20} color="#333" />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="school-outline" size={20} color="#333" />
          <Text style={styles.menuText}>Add Education</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="ribbon-outline" size={20} color="#333" />
          <Text style={styles.menuText}>Add Certificate</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* 👇 Help & Feedback Button (updated) */}
        <TouchableOpacity style={styles.menuItem} onPress={handleHelpPress}>
          <Ionicons name="help-circle" size={20} color="#333" />
          <Text style={styles.menuText}>Help & Feedback</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Your Feedback</Text>
          <TextInput
            ref={feedbackInputRef} // 👈 Added ref here
            style={styles.feedbackInput}
            placeholder="Type your message here..."
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutButton]} 
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#f44336" />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 👇 (your styles stay 100% unchanged)
  container: {
    flex: 1,
    backgroundColor: '#f5fff7',
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginBottom: 20 },
  profileCard: {
    backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
    shadowRadius: 4, elevation: 3,
  },
  avatarSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#e8f5e8',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  profileInfo: { flex: 1 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  email: { fontSize: 14, color: '#666', marginBottom: 2 },
  phone: { fontSize: 14, color: '#666' },
  location: { fontSize: 14, color: '#666' },
  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32' },
  educationCard: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff',
    padding: 16, borderRadius: 8, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  educationInfo: { marginLeft: 12, flex: 1 },
  educationTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  educationInstitution: { fontSize: 14, color: '#666', marginBottom: 2 },
  educationPeriod: { fontSize: 12, color: '#999' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillTag: {
    backgroundColor: '#e8f5e8', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 16, fontSize: 12, color: '#2e7d32', fontWeight: '500',
  },
  preferenceCard: {
    backgroundColor: '#fff', padding: 16, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  preferenceItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  preferenceLabel: { fontSize: 14, fontWeight: '600', color: '#333', width: 80, marginLeft: 8 },
  preferenceValue: { fontSize: 14, color: '#666', flex: 1 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 16, borderRadius: 8, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  menuText: { fontSize: 16, color: '#333', marginLeft: 12, flex: 1 },
  logoutButton: { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e0e0e0' },
  logoutText: { color: '#f44336', fontWeight: '600' },
  feedbackContainer: {
    backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  feedbackLabel: { fontSize: 16, fontWeight: '600', color: '#2e7d32', marginBottom: 8 },
  feedbackInput: {
    height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
    padding: 10, textAlignVertical: 'top', marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#2e7d32', paddingVertical: 10, borderRadius: 8, alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});