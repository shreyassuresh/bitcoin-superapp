import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Button, Switch, List, useTheme, Portal, Modal, TextInput, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import * as ImagePicker from 'expo-image-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

const ProfileScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [biometricAuth, setBiometricAuth] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const { user, signOut } = useAuth();

  // Profile Edit States
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState(user?.username || '');
  const [bio, setBio] = React.useState('Bitcoin enthusiast and early adopter');
  const [location, setLocation] = React.useState('');

  const handleLogout = async () => {
    await signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleEditProfile = () => {
    setEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    // Here you would implement the actual profile update logic
    setEditModalVisible(false);
  };

  const pickImage = async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

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
          <Text variant="headlineMedium">Profile</Text>
        </View>
        <Text variant="bodyLarge" style={{ color: '#F7931A' }}>
          Settings & Preferences
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle"
                  size={80}
                  color="#F7931A"
                />
              )}
              <IconButton
                icon="camera"
                size={20}
                iconColor="#fff"
                style={styles.cameraButton}
                onPress={pickImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text variant="titleLarge" style={{ color: '#2D1B69' }}>{username}</Text>
              <Text variant="bodyMedium" style={styles.bio}>{bio}</Text>
              <Button
                mode="outlined"
                onPress={handleEditProfile}
                style={styles.editButton}
                textColor="#F7931A"
                icon="pencil"
              >
                Edit Profile
              </Button>
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
              <List.Icon {...props} icon="fingerprint" color="#F7931A" />
            )}
            right={() => (
              <Switch
                value={biometricAuth}
                onValueChange={setBiometricAuth}
                color="#F7931A"
              />
            )}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Change Password"
            left={(props) => (
              <List.Icon {...props} icon="lock" color="#F7931A" />
            )}
            onPress={() => {}}
            titleStyle={styles.listItemTitle}
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
              <List.Icon {...props} icon="bell" color="#F7931A" />
            )}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#F7931A"
              />
            )}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Dark Mode"
            description="Switch between light and dark themes"
            left={(props) => (
              <List.Icon {...props} icon="theme-light-dark" color="#F7931A" />
            )}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color="#F7931A"
              />
            )}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
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
              <List.Icon {...props} icon="help-circle" color="#F7931A" />
            )}
            onPress={() => {}}
            titleStyle={styles.listItemTitle}
          />
          <List.Item
            title="Contact Support"
            left={(props) => (
              <List.Icon {...props} icon="email" color="#F7931A" />
            )}
            onPress={() => {}}
            titleStyle={styles.listItemTitle}
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

      {/* Edit Profile Modal */}
      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>Edit Profile</Text>
          
          <View style={styles.modalProfileImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.modalImage} />
            ) : (
              <MaterialCommunityIcons
                name="account-circle"
                size={100}
                color="#F7931A"
              />
            )}
            <Button
              mode="outlined"
              onPress={pickImage}
              style={styles.imageButton}
              textColor="#F7931A"
            >
              Change Photo
            </Button>
          </View>

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.modalInput}
          />

          <TextInput
            label="Bio"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={3}
            style={styles.modalInput}
          />

          <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.modalInput}
          />

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setEditModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSaveProfile}
              style={[styles.modalButton, { backgroundColor: '#F7931A' }]}
            >
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF6E5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(247, 147, 26, 0.1)',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F7931A',
    margin: 0,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  bio: {
    opacity: 0.7,
    color: '#2D1B69',
    marginTop: 4,
  },
  editButton: {
    marginTop: 8,
    borderColor: '#F7931A',
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#2D1B69',
  },
  listItemTitle: {
    color: '#2D1B69',
  },
  listItemDescription: {
    color: '#2D1B69',
    opacity: 0.7,
  },
  logoutButton: {
    margin: 16,
    borderRadius: 8,
    minWidth: 160,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    marginBottom: 20,
    color: '#2D1B69',
  },
  modalProfileImage: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  imageButton: {
    borderColor: '#F7931A',
  },
  modalInput: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    minWidth: 100,
  },
});

export default ProfileScreen; 