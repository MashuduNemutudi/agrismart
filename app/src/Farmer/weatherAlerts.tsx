import axios from 'axios';
import { AlertTriangle, ChevronDown, ChevronUp, Cloud, CloudRain, CloudSnow, RefreshCw, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Get your free API key from https://openweathermap.org/api
const API_KEY = '97e840e94159cc603a0d507116abba14';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Farming regions in South Africa
const FARMING_REGIONS = [
  { 
    name: 'Mpumalanga Highlands', 
    lat: -25.5653, 
    lon: 30.5359,
    mainCrops: ['Maize', 'Soybeans', 'Citrus', 'Sugarcane']
  },
  { 
    name: 'Eastern Farmlands', 
    lat: -32.6755, 
    lon: 27.0933,
    mainCrops: ['Wheat', 'Vegetables', 'Potatoes', 'Sunflower']
  },
  { 
    name: 'Northern Plains', 
    lat: -24.6541, 
    lon: 28.3956,
    mainCrops: ['Livestock', 'Maize', 'Sorghum', 'Cotton']
  },
  { 
    name: 'Western Cape Valleys', 
    lat: -33.9249, 
    lon: 18.4241,
    mainCrops: ['Grapes', 'Wine', 'Fruit', 'Olives']
  }
];

export default function WeatherUpdates() {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const weatherPromises = FARMING_REGIONS.map(async (region) => {
        try {
          const response = await axios.get(
            `${BASE_URL}/weather?lat=${region.lat}&lon=${region.lon}&appid=${API_KEY}&units=metric`
          );
          
          return {
            id: region.name,
            location: region.name,
            temperature: Math.round(response.data.main.temp),
            condition: response.data.weather[0].main,
            humidity: response.data.main.humidity + '%',
            windSpeed: (response.data.wind.speed * 3.6).toFixed(1) + ' km/h', // Convert m/s to km/h
            rawData: response.data,
            mainCrops: region.mainCrops
          };
        } catch (err) {
          console.error(`Error fetching data for ${region.name}:`, err);
          return null;
        }
      });

      const results = await Promise.all(weatherPromises);
      const validResults = results.filter(result => result !== null);
      setWeatherData(validResults);

    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const isExpanded = (cardId: string) => expandedCards.includes(cardId);

  const getTemperatureColor = (temp: number) => {
    if (temp <= 10) return '#1e90ff'; // Blue for cold
    if (temp <= 20) return '#32cd32'; // Green for cool
    if (temp <= 30) return '#ffa500'; // Orange for warm
    return '#ff4500'; // Red for hot
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear')) return <Sun size={24} color="#ffa500" />;
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) 
      return <CloudRain size={24} color="#4169e1" />;
    if (conditionLower.includes('snow')) return <CloudSnow size={24} color="#1e90ff" />;
    if (conditionLower.includes('cloud')) return <Cloud size={24} color="#708090" />;
    
    return <Sun size={24} color="#ffa500" />;
  };

  const getTemperatureDescription = (temp: number) => {
    if (temp <= 10) return 'Very Cold';
    if (temp <= 15) return 'Cold';
    if (temp <= 20) return 'Cool';
    if (temp <= 25) return 'Mild';
    if (temp <= 30) return 'Warm';
    return 'Hot';
  };

  const generateFarmingAdvice = (weather: any) => {
    const temp = weather.temperature;
    const condition = weather.condition.toLowerCase();
    const humidity = parseInt(weather.humidity);
    const windSpeed = parseFloat(weather.windSpeed);

    const advice = [];
    const warnings = [];
    const cropRecommendations = [];

    // Temperature-based advice
    if (temp <= 5) {
      advice.push('Protect sensitive crops from frost damage');
      advice.push('Provide shelter and warmth for livestock');
      warnings.push('Frost warning - protect vulnerable crops');
    } else if (temp <= 15) {
      advice.push('Good conditions for cool-season crops');
      advice.push('Monitor soil temperature for planting');
    } else if (temp <= 25) {
      advice.push('Ideal conditions for most farming activities');
      advice.push('Good day for planting and field work');
    } else if (temp > 30) {
      advice.push('Water crops in early morning or late evening');
      advice.push('Provide shade and water for livestock');
      warnings.push('Heat stress risk for animals and plants');
    }

    // Condition-based advice
    if (condition.includes('rain')) {
      advice.push('Postpone harvesting and spraying operations');
      advice.push('Good day for fertilizer application');
      cropRecommendations.push('Excellent for crop growth and soil moisture');
    } else if (condition.includes('clear')) {
      advice.push('Ideal for drying crops and harvesting');
      if (temp > 25) {
        warnings.push('High evaporation rates - increase irrigation');
      }
    } else if (condition.includes('wind')) {
      advice.push('Avoid pesticide spraying due to drift');
      warnings.push('Wind may affect spraying operations');
    }

    // Humidity-based advice
    if (humidity > 80) {
      advice.push('Monitor for fungal diseases in high humidity');
      cropRecommendations.push('Good conditions for disease development');
    } else if (humidity < 40) {
      advice.push('High evaporation - consider more frequent irrigation');
    }

    // Crop-specific recommendations based on region's main crops
    weather.mainCrops.forEach((crop: string) => {
      if (crop === 'Maize' && temp >= 20 && temp <= 30) {
        cropRecommendations.push(`${crop}: Ideal growing conditions`);
      } else if (crop === 'Wheat' && temp >= 15 && temp <= 25) {
        cropRecommendations.push(`${crop}: Good development weather`);
      } else if (crop === 'Grapes' && temp >= 20 && temp <= 28) {
        cropRecommendations.push(`${crop}: Excellent ripening conditions`);
      } else if (crop === 'Livestock') {
        if (temp > 28) {
          cropRecommendations.push(`${crop}: Provide shade and ample water`);
        } else if (temp < 10) {
          cropRecommendations.push(`${crop}: Ensure adequate shelter and feed`);
        }
      }
    });

    return {
      farmingAdvice: advice,
      cropRecommendations: cropRecommendations.length > 0 ? cropRecommendations : ['Normal care recommended for all crops'],
      warnings
    };
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.loadingText}>Loading farm weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchWeatherData}>
          <RefreshCw size={16} color="#fff" />
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Farm Weather Updates</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchWeatherData}>
          <RefreshCw size={16} color="#2e7d32" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Real-time weather for farming decisions</Text>
      
      {weatherData.map((weather) => {
        const farmingInfo = generateFarmingAdvice(weather);
        
        return (
          <View key={weather.id} style={styles.weatherCard}>
            {/* Header Section */}
            <View style={styles.cardHeader}>
              <View style={styles.locationSection}>
                <Text style={styles.location}>{weather.location}</Text>
                <Text style={styles.date}>Live • Updated just now</Text>
              </View>
              <View style={styles.weatherIcon}>
                {getWeatherIcon(weather.condition)}
              </View>
            </View>

            {/* Temperature Section */}
            <View style={styles.temperatureSection}>
              <Text style={[
                styles.temperature,
                { color: getTemperatureColor(weather.temperature) }
              ]}>
                {weather.temperature}°C
              </Text>
              <Text style={styles.condition}>{weather.condition}</Text>
              <Text style={styles.tempDescription}>
                {getTemperatureDescription(weather.temperature)}
              </Text>
            </View>

            {/* Basic Weather Info */}
            <View style={styles.basicInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Humidity</Text>
                <Text style={styles.infoValue}>{weather.humidity}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Wind</Text>
                <Text style={styles.infoValue}>{weather.windSpeed}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Main Crops</Text>
                <Text style={styles.infoValue}>
                  {weather.mainCrops.slice(0, 2).join(', ')}
                </Text>
              </View>
            </View>

            {/* Expanded Details Section */}
            {isExpanded(weather.id) && (
              <View style={styles.detailsSection}>
                {/* Farming Advice */}
                <View style={styles.detailCategory}>
                  <Text style={styles.categoryTitle}>🧑‍🌾 Farming Advice</Text>
                  {farmingInfo.farmingAdvice.map((advice, index) => (
                    <Text key={index} style={styles.detailItem}>• {advice}</Text>
                  ))}
                </View>

                {/* Crop Recommendations */}
                <View style={styles.detailCategory}>
                  <Text style={styles.categoryTitle}>🌱 Crop Recommendations</Text>
                  {farmingInfo.cropRecommendations.map((crop, index) => (
                    <Text key={index} style={styles.detailItem}>• {crop}</Text>
                  ))}
                </View>

                {/* Warnings */}
                {farmingInfo.warnings.length > 0 && (
                  <View style={styles.warningSection}>
                    <View style={styles.warningHeader}>
                      <AlertTriangle size={16} color="#ff6b35" />
                      <Text style={styles.warningTitle}>Important Warnings</Text>
                    </View>
                    {farmingInfo.warnings.map((warning, index) => (
                      <Text key={index} style={styles.warningItem}>⚠️ {warning}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Expand/Collapse Button */}
            <TouchableOpacity 
              style={[
                styles.detailsButton,
                isExpanded(weather.id) && styles.detailsButtonExpanded
              ]}
              onPress={() => toggleCard(weather.id)}
            >
              <Text style={styles.detailsButtonText}>
                {isExpanded(weather.id) ? 'Hide Farming Details' : 'Show Farming Details'}
              </Text>
              {isExpanded(weather.id) ? (
                <ChevronUp size={16} color="#fff" />
              ) : (
                <ChevronDown size={16} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: '#2e7d32',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  weatherCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  locationSection: {
    flex: 1,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  weatherIcon: {
    padding: 8,
  },
  temperatureSection: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  condition: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  tempDescription: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  detailsSection: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailCategory: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
    lineHeight: 16,
  },
  warningSection: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#856404',
    marginLeft: 6,
  },
  warningItem: {
    fontSize: 11,
    color: '#856404',
    marginBottom: 4,
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
