import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ProgressBar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const tutorials = [
  {
    id: '1',
    title: 'Getting Started with Bitcoin',
    description: 'Learn the basics of Bitcoin and how to use this app',
    progress: 0.3,
  },
  {
    id: '2',
    title: 'Understanding sBTC',
    description: 'Discover how sBTC enables DeFi on Bitcoin',
    progress: 0,
  },
  {
    id: '3',
    title: 'BitNames Explained',
    description: 'Learn about decentralized identity on Bitcoin',
    progress: 0,
  },
];

const LearnScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="bitcoin"
            size={32}
            color="#F7931A"
            style={styles.bitcoinIcon}
          />
          <Text variant="headlineMedium">Learn Bitcoin</Text>
        </View>
        <Text variant="bodyLarge" style={{ color: '#F7931A' }}>
          Interactive Tutorials & Quizzes
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressContainer}>
            <Text variant="bodyLarge" style={styles.progressText}>Overall Completion</Text>
            <ProgressBar
              progress={0.1}
              color="#F7931A"
              style={styles.progressBar}
            />
            <Text variant="bodySmall" style={styles.progressText}>10% Complete</Text>
          </View>
        </Card.Content>
      </Card>

      {tutorials.map((tutorial) => (
        <Card key={tutorial.id} style={styles.card}>
          <Card.Content>
            <View style={styles.tutorialHeader}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={24}
                color="#F7931A"
              />
              <Text variant="titleMedium" style={[styles.tutorialTitle, { color: '#F7931A' }]}>
                {tutorial.title}
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.description}>
              {tutorial.description}
            </Text>
            <ProgressBar
              progress={tutorial.progress}
              color="#F7931A"
              style={styles.progressBar}
            />
            <Button
              mode="contained"
              style={[styles.button, { backgroundColor: '#F7931A' }]}
              onPress={() => {}}
            >
              {tutorial.progress > 0 ? 'Continue' : 'Start'}
            </Button>
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Quick Quiz</Text>
          <Text variant="bodyMedium" style={styles.description}>
            Test your knowledge with our daily Bitcoin quiz
          </Text>
          <Button 
            mode="outlined" 
            style={[styles.button, { borderColor: '#F7931A' }]}
            textColor="#F7931A"
          >
            Take Quiz
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(247, 147, 26, 0.1)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bitcoinIcon: {
    marginRight: 12,
  },
  card: {
    margin: 16,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#2D1B69',
  },
  progressContainer: {
    marginTop: 16,
    padding: 20,
    backgroundColor: '#FFF6E5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(247, 147, 26, 0.1)',
  },
  progressText: {
    color: '#2D1B69',
  },
  progressBar: {
    marginVertical: 8,
    height: 8,
    borderRadius: 4,
  },
  tutorialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tutorialTitle: {
    marginLeft: 12,
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    opacity: 0.7,
    color: '#2D1B69',
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
});

export default LearnScreen; 