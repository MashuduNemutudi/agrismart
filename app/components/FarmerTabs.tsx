import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Import your farmer screens
import FarmerDashboard from '../src/Farmer/farmerDashboard';
//import HarvestCalendar from '../src/Farmer/harvestCalander';
import WeatherAlerts from '../src/Farmer/weatherAlerts';

const Tab = createBottomTabNavigator();

// Full-screen ChatBot screen
function FarmerChatBotModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.fullScreen}>
        <View style={styles.header}>
          <Text style={styles.title}>AgriSmart ChatBot</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.chatContent}>
          <Text>Welcome to the ChatBot! Ask me anything about farming.</Text>
        </View>
      </View>
    </Modal>
  );
}

export default function FarmerTabs() {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2e7d32',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: { backgroundColor: '#fff' },
          headerStyle: { backgroundColor: '#2e7d32' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={FarmerDashboard}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherAlerts}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="cloud" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="Calendar"
          component={WeatherAlerts}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} /> }}
        />
        
      </Tab.Navigator>

      {/* Floating ChatBot Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setChatVisible(true)}
      >
        <Ionicons name="chatbubbles" size={28} color="#fff" />
      </TouchableOpacity>

      {/* ChatBot Modal */}
      <FarmerChatBotModal visible={chatVisible} onClose={() => setChatVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2e7d32',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fullScreen: { flex: 1, backgroundColor: '#f5fff7', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2e7d32' },
  chatContent: { flex: 1, marginTop: 20 },
});