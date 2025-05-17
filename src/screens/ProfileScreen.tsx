import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Switch, List, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

const ProfileScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [biometricAuth, setBiometricAuth] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Profile</Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
          Settings & Preferences
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <MaterialCommunityIcons
              name="account-circle"
              size={64}
              color={theme.colors.primary}
            />
            <View style={styles.profileInfo}>
              <Text variant="titleLarge">User Name</Text>
              <Text variant="bodyMedium" style={styles.email}>
                {user?.username}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Security
          </Text>
          <List.Item
            title="Biometric Authentication"
            description="Use fingerprint or face ID to unlock the app"
            left={(props) => (
              <List.Icon {...props} icon="fingerprint" color={theme.colors.primary} />
            )}
            right={() => (
              <Switch
                value={biometricAuth}
                onValueChange={setBiometricAuth}
                color={theme.colors.primary}
              />
            )}
          />
          <List.Item
            title="Change Password"
            left={(props) => (
              <List.Icon {...props} icon="lock" color={theme.colors.primary} />
            )}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Preferences
          </Text>
          <List.Item
            title="Notifications"
            description="Receive alerts for transactions and updates"
            left={(props) => (
              <List.Icon {...props} icon="bell" color={theme.colors.primary} />
            )}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.colors.primary}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            left={(props) => (
              <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />
            )}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={theme.colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Support
          </Text>
          <List.Item
            title="Help Center"
            left={(props) => (
              <List.Icon {...props} icon="help-circle" color={theme.colors.primary} />
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Contact Support"
            left={(props) => (
              <List.Icon {...props} icon="email" color={theme.colors.primary} />
            )}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#F7931A"
        textColor="#fff"
      >
        Logout
      </Button>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
  },
  email: {
    opacity: 0.7,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  logoutButton: {
    margin: 16,
    borderRadius: 30,
    minWidth: 160,
  },
});

export default ProfileScreen; 