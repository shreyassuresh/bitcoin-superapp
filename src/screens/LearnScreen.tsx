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
        <Text variant="headlineMedium">Learn Bitcoin</Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
          Interactive Tutorials & Quizzes
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Your Progress</Text>
          <View style={styles.progressContainer}>
            <Text variant="bodyLarge">Overall Completion</Text>
            <ProgressBar
              progress={0.1}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text variant="bodySmall">10% Complete</Text>
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
                color={theme.colors.primary}
              />
              <Text variant="titleMedium" style={styles.tutorialTitle}>
                {tutorial.title}
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.description}>
              {tutorial.description}
            </Text>
            <ProgressBar
              progress={tutorial.progress}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {}}
            >
              {tutorial.progress > 0 ? 'Continue' : 'Start'}
            </Button>
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Quick Quiz</Text>
          <Text variant="bodyMedium" style={styles.description}>
            Test your knowledge with our daily Bitcoin quiz
          </Text>
          <Button mode="outlined" style={styles.button}>
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
    backgroundColor: '#ffffff',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    marginVertical: 8,
    height: 8,
    borderRadius: 4,
  },
  tutorialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tutorialTitle: {
    marginLeft: 8,
  },
  description: {
    marginTop: 8,
    opacity: 0.7,
  },
  button: {
    marginTop: 16,
  },
});

export default LearnScreen; 