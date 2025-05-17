import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Card, Button, TextInput, useTheme, Snackbar, IconButton, Portal, Modal, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BitName } from '../types';

const BitNamesScreen = () => {
  const theme = useTheme();
  const [newName, setNewName] = React.useState('');
  const [bitNames, setBitNames] = React.useState<BitName[]>([
    {
      name: 'shreyas.btc',
      address: 'bc1q...',
      expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
    },
  ]);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [selectedBitName, setSelectedBitName] = React.useState<BitName | null>(null);

  // Transfer Modal States
  const [transferModalVisible, setTransferModalVisible] = React.useState(false);
  const [transferAmount, setTransferAmount] = React.useState('');
  const [recipientAddress, setRecipientAddress] = React.useState('');
  const [transferNote, setTransferNote] = React.useState('');
  const [transferType, setTransferType] = React.useState('btc');

  // Renew Modal States
  const [renewModalVisible, setRenewModalVisible] = React.useState(false);
  const [renewalPeriod, setRenewalPeriod] = React.useState('1');

  const formatExpiryDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const handleRegister = () => {
    if (!newName.trim()) return;

    const newBitName: BitName = {
      name: `${newName.trim()}.btc`,
      address: 'bc1q...', // This would be generated in a real app
      expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
    };

    setBitNames(prev => [...prev, newBitName]);
    setNewName('');
    setSnackbarMessage('BitName registered successfully!');
    setSnackbarVisible(true);
  };

  const handleTransfer = (bitName: BitName) => {
    setSelectedBitName(bitName);
    setTransferModalVisible(true);
  };

  const handleTransferSubmit = () => {
    // Here you would implement the actual transfer logic
    setSnackbarMessage('Transfer initiated successfully!');
    setSnackbarVisible(true);
    setTransferModalVisible(false);
    // Reset form
    setTransferAmount('');
    setRecipientAddress('');
    setTransferNote('');
  };

  const handleRenew = (bitName: BitName) => {
    setSelectedBitName(bitName);
    setRenewModalVisible(true);
  };

  const handleRenewSubmit = () => {
    if (selectedBitName) {
      const years = parseInt(renewalPeriod);
      const newExpiryDate = new Date();
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + years);
      
      setBitNames(prev => prev.map(bn => 
        bn.name === selectedBitName.name 
          ? { ...bn, expiryDate: newExpiryDate.getTime() }
          : bn
      ));
      setSnackbarMessage('BitName renewed successfully!');
      setSnackbarVisible(true);
      setRenewModalVisible(false);
    }
  };

  const handleDelete = (bitName: BitName) => {
    setBitNames(prev => prev.filter(bn => bn.name !== bitName.name));
    setSnackbarMessage('BitName deleted successfully!');
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons
              name="bitcoin"
              size={32}
              color="#F7931A"
              style={styles.bitcoinIcon}
            />
            <Text variant="headlineMedium">BitNames</Text>
          </View>
          <Text variant="bodyLarge" style={{ color: '#F7931A' }}>
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
            <Button 
              mode="contained" 
              style={styles.button} 
              buttonColor="#F7931A"
              onPress={handleRegister}
              disabled={!newName.trim()}
            >
              Register
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>Your BitNames</Text>
            {bitNames.map((bitName, index) => (
              <View key={index} style={styles.bitNameItem}>
                <View style={styles.bitNameHeader}>
                  <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color="#F7931A"
                  />
                  <Text variant="titleMedium" style={[styles.bitNameText, { color: '#F7931A' }]}>
                    {bitName.name}
                  </Text>
                  <IconButton
                    icon="delete"
                    size={20}
                    iconColor="#F7931A"
                    onPress={() => handleDelete(bitName)}
                    style={styles.deleteButton}
                  />
                </View>
                <Text variant="bodyMedium" style={styles.address}>
                  {bitName.address}
                </Text>
                <Text variant="bodySmall" style={styles.expiry}>
                  Expires: {formatExpiryDate(bitName.expiryDate)}
                </Text>
                <View style={styles.actions}>
                  <Button 
                    mode="outlined" 
                    style={styles.actionButton} 
                    textColor="#F7931A"
                    onPress={() => handleTransfer(bitName)}
                  >
                    Transfer
                  </Button>
                  <Button 
                    mode="outlined" 
                    style={styles.actionButton} 
                    textColor="#F7931A"
                    onPress={() => handleRenew(bitName)}
                  >
                    Renew
                  </Button>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Transfer Modal */}
      <Portal>
        <Modal
          visible={transferModalVisible}
          onDismiss={() => setTransferModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>Transfer BitName</Text>
          
          <SegmentedButtons
            value={transferType}
            onValueChange={setTransferType}
            buttons={[
              { value: 'btc', label: 'BTC' },
              { value: 'sats', label: 'Sats' },
            ]}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Amount"
            value={transferAmount}
            onChangeText={setTransferAmount}
            keyboardType="numeric"
            style={styles.modalInput}
            right={<TextInput.Affix text={transferType === 'btc' ? 'BTC' : 'sats'} />}
          />

          <TextInput
            label="Recipient Address"
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            style={styles.modalInput}
          />

          <TextInput
            label="Note (Optional)"
            value={transferNote}
            onChangeText={setTransferNote}
            multiline
            numberOfLines={3}
            style={styles.modalInput}
          />

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setTransferModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleTransferSubmit}
              style={[styles.modalButton, { backgroundColor: '#F7931A' }]}
              disabled={!transferAmount || !recipientAddress}
            >
              Transfer
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Renew Modal */}
      <Portal>
        <Modal
          visible={renewModalVisible}
          onDismiss={() => setRenewModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>Renew BitName</Text>

          <SegmentedButtons
            value={renewalPeriod}
            onValueChange={setRenewalPeriod}
            buttons={[
              { value: '1', label: '1 Year' },
              { value: '2', label: '2 Years' },
              { value: '3', label: '3 Years' },
            ]}
            style={styles.segmentedButtons}
          />

          <Text variant="bodyMedium" style={styles.renewalInfo}>
            New expiry date will be: {formatExpiryDate(
              Date.now() + parseInt(renewalPeriod) * 365 * 24 * 60 * 60 * 1000
            )}
          </Text>

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setRenewModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleRenewSubmit}
              style={[styles.modalButton, { backgroundColor: '#F7931A' }]}
            >
              Renew
            </Button>
          </View>
        </Modal>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
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
  input: {
    marginTop: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  bitNameItem: {
    marginTop: 16,
    padding: 20,
    backgroundColor: '#FFF6E5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(247, 147, 26, 0.1)',
  },
  bitNameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bitNameText: {
    marginLeft: 12,
    fontWeight: '600',
    flex: 1,
  },
  deleteButton: {
    margin: 0,
    marginLeft: 'auto',
  },
  address: {
    marginTop: 8,
    opacity: 0.7,
    color: '#2D1B69',
  },
  expiry: {
    marginTop: 8,
    opacity: 0.6,
    color: '#2D1B69',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderColor: '#F7931A',
    borderRadius: 8,
  },
  snackbar: {
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    zIndex: 1000,
    borderRadius: 8,
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
  segmentedButtons: {
    marginBottom: 16,
  },
  renewalInfo: {
    marginTop: 16,
    color: '#2D1B69',
    textAlign: 'center',
  },
});

export default BitNamesScreen; 