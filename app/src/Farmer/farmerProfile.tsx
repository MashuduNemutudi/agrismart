import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FarmerProfile() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              
            } catch (error) {
              console.log("Error clearing auth data:", error);
            }
            router.replace('/src/auth/login');
          }
        }
      ]
    );
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmer Profile</Text>
      
      <View style={styles.profileCard}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#2e7d32" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>John Farmer</Text>
            <Text style={styles.email}>john.farmer@agrismart.com</Text>
            <Text style={styles.phone}>+27 69 4025689</Text>
          </View>
        </View>
        <Text style={styles.location}>📍 Mpumalanga, South Africa</Text>
      </View>

      {/* Farm Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Details</Text>
        <View style={styles.detailItem}>
          <Ionicons name="business-outline" size={20} color="#666" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Farm Name</Text>
            <Text style={styles.detailValue}>Green Valley Farms</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="resize-outline" size={20} color="#666" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Farm Size</Text>
            <Text style={styles.detailValue}>50 hectares</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="leaf-outline" size={20} color="#666" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Main Crops</Text>
            <Text style={styles.detailValue}>Maize, Wheat, Soybeans</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Experience</Text>
            <Text style={styles.detailValue}>15 years</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="create-outline" size={20} color="#333" />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={20} color="#333" />
          <Text style={styles.menuText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
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
  profileCard: {
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
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  location: {
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  detailText: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logoutText: {
    color: '#f44336',
    fontWeight: '600',
  },
});