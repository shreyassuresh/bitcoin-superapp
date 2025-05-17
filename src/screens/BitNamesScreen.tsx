import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, TextInput, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BitName } from '../types';

const BitNamesScreen = () => {
  const theme = useTheme();
  const [newName, setNewName] = React.useState('');
  const [bitNames, setBitNames] = React.useState<BitName[]>([
    {
      name: 'satoshi.btc',
      address: 'bc1q...',
      expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
    },
  ]);

  const formatExpiryDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">BitNames</Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
          Your Digital Identity
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Register New BitName</Text>
          <TextInput
            label="BitName"
            value={newName}
            onChangeText={setNewName}
            right={<TextInput.Affix text=".btc" />}
            style={styles.input}
          />
          <Button mode="contained" style={styles.button}>
            Register
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Your BitNames</Text>
          {bitNames.map((bitName, index) => (
            <View key={index} style={styles.bitNameItem}>
              <View style={styles.bitNameHeader}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text variant="titleMedium" style={styles.bitNameText}>
                  {bitName.name}
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.address}>
                {bitName.address}
              </Text>
              <Text variant="bodySmall" style={styles.expiry}>
                Expires: {formatExpiryDate(bitName.expiryDate)}
              </Text>
              <View style={styles.actions}>
                <Button mode="outlined" style={styles.actionButton}>
                  Transfer
                </Button>
                <Button mode="outlined" style={styles.actionButton}>
                  Renew
                </Button>
              </View>
            </View>
          ))}
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
  input: {
    marginTop: 16,
  },
  button: {
    marginTop: 16,
  },
  bitNameItem: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  bitNameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bitNameText: {
    marginLeft: 8,
  },
  address: {
    marginTop: 8,
    opacity: 0.7,
  },
  expiry: {
    marginTop: 4,
    opacity: 0.5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default BitNamesScreen; 