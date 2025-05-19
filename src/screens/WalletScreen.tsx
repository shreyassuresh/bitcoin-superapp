import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Portal, Modal, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WalletCard from '../components/WalletCard';

const WalletScreen = () => {
  const theme = useTheme();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    // TODO: Implement send functionality
    setShowSendModal(false);
    setRecipientAddress('');
    setAmount('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="bitcoin" size={48} color="#F7931A" style={styles.headerIcon} />
        <Text variant="headlineMedium" style={styles.headerTitle}>Bitcoin Wallet</Text>
        <Text variant="bodyLarge" style={[styles.totalBalance, { color: theme.colors.primary }]}>
          Total Balance: 1.2345 BTC
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.walletHeader}>
            <MaterialCommunityIcons name="bitcoin" size={28} color={theme.colors.primary} style={{ marginRight: 8 }} />
            <Text variant="titleMedium">Main Wallet</Text>
          </View>
          <View style={styles.addressRow}>
            <MaterialCommunityIcons name="qrcode" size={20} color="#888" style={{ marginRight: 6 }} />
            <Text variant="bodyLarge" style={styles.address}>
              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
            </Text>
          </View>
          <Text variant="displaySmall" style={styles.balanceBig}>
            <MaterialCommunityIcons name="bitcoin" size={24} color="#F7931A" /> 1.2345 <Text style={{ color: '#F7931A', fontWeight: 'bold' }}>BTC</Text>
          </Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={() => setShowSendModal(true)}
            style={styles.roundedButton}
            contentStyle={styles.buttonContent}
            buttonColor="#F7931A"
            textColor="#fff"
            icon="arrow-up-bold"
          >
            Send
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowReceiveModal(true)}
            style={styles.roundedButton}
            contentStyle={styles.buttonContent}
            buttonColor="#fff"
            textColor="#F7931A"
            icon="arrow-down-bold"
          >
            Receive
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Recent Transactions</Text>
          <View style={styles.transactionList}>
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <MaterialCommunityIcons name="arrow-down" size={24} color="#4CAF50" />
              </View>
              <View style={styles.transactionInfo}>
                <Text variant="bodyMedium">Received 0.01 BTC</Text>
                <Text variant="bodySmall" style={styles.transactionAddress}>
                  bc1q...0wlh
                </Text>
                <Text variant="bodySmall" style={styles.transactionTime}>
                  Today, 10:30 AM
                </Text>
              </View>
              <Text variant="bodySmall" style={[styles.transactionStatus, { color: '#4CAF50' }]}>
                Completed
              </Text>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <MaterialCommunityIcons name="arrow-up" size={24} color="#F44336" />
              </View>
              <View style={styles.transactionInfo}>
                <Text variant="bodyMedium">Sent 0.005 BTC</Text>
                <Text variant="bodySmall" style={styles.transactionAddress}>
                  bc1q...0wlh
                </Text>
                <Text variant="bodySmall" style={styles.transactionTime}>
                  Yesterday, 3:45 PM
                </Text>
              </View>
              <Text variant="bodySmall" style={[styles.transactionStatus, { color: '#4CAF50' }]}>
                Completed
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Send Modal */}
      <Portal>
        <Modal
          visible={showSendModal}
          onDismiss={() => setShowSendModal(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>Send Bitcoin</Text>
          <TextInput
            label="Recipient Address"
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Amount (BTC)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={styles.input}
            mode="outlined"
          />
          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setShowSendModal(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSend}
              style={[styles.modalButton, { backgroundColor: '#F7931A' }]}
            >
              Send
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Receive Modal */}
      <Portal>
        <Modal
          visible={showReceiveModal}
          onDismiss={() => setShowReceiveModal(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>Receive Bitcoin</Text>
          <View style={styles.qrContainer}>
            <MaterialCommunityIcons name="qrcode" size={200} color="#000" />
          </View>
          <Text style={styles.addressText}>
            bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowReceiveModal(false)}
            style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}
          >
            Close
          </Button>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexGrow: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 8,
  },
  headerTitle: {
    marginBottom: 4,
  },
  totalBalance: {
    marginTop: 8,
  },
  card: {
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    overflow: 'hidden',
    backgroundColor: '#FFF6E5',
  },
  cardContent: {
    paddingBottom: 0,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    opacity: 0.7,
  },
  address: {
    marginVertical: 8,
    opacity: 0.7,
  },
  balanceBig: {
    fontSize: 32,
    color: '#F7931A',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 12,
    paddingTop: 4,
  },
  roundedButton: {
    borderRadius: 30,
    marginHorizontal: 4,
    minWidth: 120,
    elevation: 2,
  },
  buttonContent: {
    height: 44,
  },
  transactionList: {
    marginTop: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionAddress: {
    color: '#666',
    marginTop: 2,
  },
  transactionTime: {
    color: '#999',
    marginTop: 2,
  },
  transactionStatus: {
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  addressText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
});

export default WalletScreen; 