import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SkillBuilder() {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Sustainable Farming',
      description: 'Learn the basics of eco-friendly agricultural practices, soil health, and sustainable methods',
      progress: 75,
      duration: '4 weeks',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Digital Marketing for Agri-Businesses',
      description: 'Master online strategies to promote agricultural products and reach new markets',
      progress: 0,
      duration: '6 weeks',
      level: 'Intermediate',
    },
    {
      id: 3,
      title: 'Farm Management & Business Planning',
      description: 'Develop essential skills for financial management and operational planning',
      progress: 40,
      duration: '8 weeks',
      level: 'Advanced',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Skill Builder</Text>
      
      {/* Progress Overview */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Learning Progress</Text>
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>2</Text>
            <Text style={styles.progressLabel}>Courses</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>12</Text>
            <Text style={styles.progressLabel}>Hours</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>3</Text>
            <Text style={styles.progressLabel}>Skills</Text>
          </View>
        </View>
      </View>

      {/* My Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Courses</Text>
        
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <View style={[
                styles.levelBadge,
                course.level === 'Beginner' && styles.beginnerBadge,
                course.level === 'Intermediate' && styles.intermediateBadge,
                course.level === 'Advanced' && styles.advancedBadge,
              ]}>
                <Text style={styles.levelText}>{course.level}</Text>
              </View>
            </View>
            
            <Text style={styles.courseDescription}>{course.description}</Text>
            
            <View style={styles.courseDetails}>
              <Text style={styles.duration}>⏱️ {course.duration}</Text>
              <Text style={styles.progressText}>
                {course.progress > 0 ? `${course.progress}% complete` : 'Not started'}
              </Text>
            </View>
            
            {course.progress > 0 && (
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${course.progress}%` }
                  ]} 
                />
              </View>
            )}
            
            <TouchableOpacity style={styles.courseButton}>
              <Text style={styles.courseButtonText}>
                {course.progress > 0 ? 'Continue Course' : 'Start Course'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
  progressCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStat: {
    alignItems: 'center',
    flex: 1,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
  courseCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  beginnerBadge: {
    backgroundColor: '#e8f5e8',
  },
  intermediateBadge: {
    backgroundColor: '#c8e6c9',
  },
  advancedBadge: {
    backgroundColor: '#a5d6a7',
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  progressText: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2e7d32',
    borderRadius: 3,
  },
  courseButton: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  courseButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});