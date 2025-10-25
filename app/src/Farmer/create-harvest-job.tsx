import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ==== TYPES ====
interface CropEvent {
  title: string;
  date: string;
  desc: string;
}

interface CropInfo {
  productivity: string;
  alerts: string[];
  events: CropEvent[];
}

type CropName = 'Maize' | 'Wheat' | 'Sunflower';

// ==== MOCK DATA ====
const CROP_DATA: Record<CropName, CropInfo> = {
  Maize: {
    productivity: 'High yield expected this month due to optimal rainfall.',
    alerts: ['Armyworm outbreak risk in some regions.'],
    events: [
      {
        title: 'Harvest Season Peak',
        date: 'October 15, 2025',
        desc: 'Main field harvest scheduled.',
      },
    ],
  },
  Wheat: {
    productivity: 'Medium yield — dry weather may affect germination.',
    alerts: [],
    events: [
      {
        title: 'Planting Period',
        date: 'October 22, 2025',
        desc: 'Start winter wheat planting.',
      },
    ],
  },
  Sunflower: {
    productivity: 'Early growth stage — irrigation needed.',
    alerts: ['Aphid infestation warning.'],
    events: [],
  },
};

// ==== HELPER FUNCTIONS ====
const getMonthName = (month: number): string =>
  new Date(2025, month).toLocaleString('default', { month: 'long' });

// Parse a date string like 'October 15, 2025' to day number
const getDayFromDateString = (dateStr: string): number => {
  const date = new Date(dateStr);
  return date.getDate();
};

// ==== COMPONENT ====
export default function HarvestCalendar() {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedCrop, setSelectedCrop] = useState<CropName>('Maize');
  const [calendarDays, setCalendarDays] = useState<string[][]>([]);

  // Generate calendar grid
  useEffect(() => {
    const firstDay: number = new Date(year, month, 1).getDay();
    const daysInMonth: number = new Date(year, month + 1, 0).getDate();
    const daysArray: string[][] = [];
    let week: string[] = [];

    // Fill blanks before 1st day
    for (let i = 0; i < firstDay; i++) week.push('');

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day.toString());
      if (week.length === 7) {
        daysArray.push(week);
        week = [];
      }
    }

    if (week.length > 0) daysArray.push(week);
    setCalendarDays(daysArray);
  }, [month, year]);

  const nextMonth = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const prevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  // Show alerts if any
  useEffect(() => {
    const alerts = CROP_DATA[selectedCrop]?.alerts;
    if (alerts && alerts.length > 0) {
      Alert.alert(`⚠️ Alert for ${selectedCrop}`, alerts.join('\n'));
    }
  }, [selectedCrop]);

  const { productivity, events } = CROP_DATA[selectedCrop];

  // Prepare event days for the selected month
  const eventDays = events
    .map((e) => new Date(e.date))
    .filter((d) => d.getMonth() === month && d.getFullYear() === year)
    .map((d) => d.getDate());

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌾 {selectedCrop} Calendar</Text>

      {/* Crop Selection */}
      <View style={styles.cropSelection}>
        {Object.keys(CROP_DATA).map((crop) => {
          const typedCrop = crop as CropName;
          return (
            <TouchableOpacity
              key={typedCrop}
              style={[
                styles.cropButton,
                selectedCrop === typedCrop && styles.cropButtonActive,
              ]}
              onPress={() => setSelectedCrop(typedCrop)}
            >
              <Text
                style={[
                  styles.cropButtonText,
                  selectedCrop === typedCrop && styles.cropButtonTextActive,
                ]}
              >
                {typedCrop}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Calendar Header */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {getMonthName(month)} {year}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
          (day: string) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          )
        )}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((week: string[], wIdx: number) => (
          <View key={wIdx} style={styles.weekRow}>
            {week.map((day: string, dIdx: number) => {
              const dayNumber = parseInt(day);
              const isToday =
                day &&
                dayNumber === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();
              const isEventDay = day && eventDays.includes(dayNumber);

              return (
                <View
                  key={dIdx}
                  style={[
                    styles.dayCell,
                    isToday && { backgroundColor: '#2e7d32', borderRadius: 6 },
                    !isToday &&
                      isEventDay && {
                        backgroundColor: '#FFA500',
                        borderRadius: 6,
                      },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isToday && { color: '#fff', fontWeight: 'bold' },
                      !isToday &&
                        isEventDay && { color: '#fff', fontWeight: '600' },
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Productivity Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌱 Productivity Insights</Text>
        <Text style={styles.sectionContent}>{productivity}</Text>
      </View>

      {/* Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Upcoming Events</Text>
        {events.length > 0 ? (
          events.map((event: CropEvent, idx: number) => (
            <View key={idx} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventDescription}>{event.desc}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEventText}>No upcoming events.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get('window').width;

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
    textAlign: 'center',
    marginBottom: 16,
  },
  cropSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  cropButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2e7d32',
    margin: 4,
  },
  cropButtonActive: {
    backgroundColor: '#2e7d32',
  },
  cropButtonText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  cropButtonTextActive: {
    color: '#fff',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  navButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    paddingHorizontal: 10,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#555',
  },
  calendarGrid: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
    elevation: 3,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: screenWidth < 360 ? 12 : 14,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    color: '#444',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#2e7d32',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  noEventText: {
    color: '#777',
    fontStyle: 'italic',
  },
});
