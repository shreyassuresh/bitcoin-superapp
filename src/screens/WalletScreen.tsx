import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, useTheme, Portal, Modal, TextInput, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  address: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

const WalletScreen = () => {
  const theme = useTheme();
  const [balance, setBalance] = useState(1.2345);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'receive',
      amount: 0.01,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      timestamp: new Date('2024-03-19T10:30:00'),
      status: 'completed'
    },
    {
      id: '2',
      type: 'send',
      amount: 0.005,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      timestamp: new Date('2024-03-18T15:45:00'),
      status: 'completed'
    }
  ]);

  const handleSend = () => {
    const sendAmount = parseFloat(amount);
    if (isNaN(sendAmount) || sendAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (sendAmount > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }
    if (!recipientAddress) {
      Alert.alert('Error', 'Please enter a recipient address');
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      // Update balance
      setBalance(prevBalance => prevBalance - sendAmount);

      // Add new transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'send',
        amount: sendAmount,
        address: recipientAddress,
        timestamp: new Date(),
        status: 'completed'
      };

      setTransactions(prev => [newTransaction, ...prev]);
      setShowSendModal(false);
      setRecipientAddress('');
      setAmount('');
      setIsLoading(false);
      Alert.alert('Success', `${sendAmount} BTC sent successfully!`);
    }, 1000);
  };

  const handleReceive = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const receiveAmount = 0.5; // Default receive amount

      // Update balance
      setBalance(prevBalance => prevBalance + receiveAmount);

      // Add new transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'receive',
        amount: receiveAmount,
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        timestamp: new Date(),
        status: 'completed'
      };

      setTransactions(prev => [newTransaction, ...prev]);
      setShowReceiveModal(false);
      setIsLoading(false);
      Alert.alert('Success', `Received ${receiveAmount} BTC!`);
    }, 1000);
  };

  const renderTransactionHistory = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>Recent Transactions</Text>
        <ScrollView style={styles.transactionList}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <MaterialCommunityIcons
                  name={tx.type === 'send' ? 'arrow-up' : 'arrow-down'}
                  size={24}
                  color={tx.type === 'send' ? '#F44336' : '#4CAF50'}
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text variant="bodyMedium">
                  {tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount} BTC
                </Text>
                <Text variant="bodySmall" style={styles.address}>
                  {tx.address.slice(0, 6)}...{tx.address.slice(-4)}
                </Text>
                <Text variant="bodySmall" style={styles.timestamp}>
                  {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.transactionStatus}>
                <Text
                  variant="bodySmall"
                  style={[
                    styles.status,
                    { color: tx.status === 'completed' ? '#4CAF50' : '#F44336' }
                  ]}
                >
                  {tx.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="bitcoin" size={48} color="#F7931A" style={styles.headerIcon} />
        <Text variant="headlineMedium" style={styles.headerTitle}>Bitcoin Wallet</Text>
        <Text variant="headlineLarge" style={[styles.balance, { color: '#F7931A' }]}>
          {balance.toFixed(8)} BTC
        </Text>
        <Text variant="bodyLarge" style={styles.usdValue}>
          ≈ ${(balance * 65000).toLocaleString()}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={() => setShowSendModal(true)}
          style={[styles.actionButton, { backgroundColor: '#2D1B69' }]}
          icon="arrow-up"
        >
          Send
        </Button>
        <Button
          mode="contained"
          onPress={() => setShowReceiveModal(true)}
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          icon="arrow-down"
        >
          Receive
        </Button>
      </View>

      {renderTransactionHistory()}

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
              loading={isLoading}
              disabled={isLoading}
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
            <View style={styles.qrWrapper}>
              <MaterialCommunityIcons name="qrcode" size={200} color="#000" />
              <View style={styles.qrCorner} />
              <View style={[styles.qrCorner, styles.qrCornerTopRight]} />
              <View style={[styles.qrCorner, styles.qrCornerBottomLeft]} />
              <View style={[styles.qrCorner, styles.qrCornerBottomRight]} />
            </View>
            <Text style={styles.qrLabel}>Scan to receive Bitcoin</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Your Bitcoin Address</Text>
            <Text style={styles.addressText}>
              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
            </Text>
            <Button
              mode="outlined"
              onPress={() => {
                // TODO: Implement copy to clipboard
                Alert.alert('Copied', 'Address copied to clipboard');
              }}
              style={styles.copyButton}
              icon="content-copy"
            >
              Copy Address
            </Button>
          </View>
          <View style={styles.receiveActions}>
            <Button
              mode="contained"
              onPress={handleReceive}
              style={[styles.receiveButton, { backgroundColor: '#4CAF50' }]}
              loading={isLoading}
              disabled={isLoading}
            >
              Receive
            </Button>
            <Button
              mode="outlined"
              onPress={() => setShowReceiveModal(false)}
              style={styles.modalButton}
            >
              Close
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
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerIcon: {
    marginBottom: 8,
  },
  headerTitle: {
    marginBottom: 8,
  },
  balance: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  usdValue: {
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  actionButton: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#2D1B69',
  },
  transactionList: {
    maxHeight: 400,
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
  address: {
    color: '#666',
    marginTop: 2,
  },
  timestamp: {
    color: '#999',
    marginTop: 2,
  },
  transactionStatus: {
    marginLeft: 12,
  },
  status: {
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
  },
  qrWrapper: {
    position: 'relative',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#4CAF50',
    borderWidth: 3,
    top: 0,
    left: 0,
  },
  qrCornerTopRight: {
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  qrCornerBottomLeft: {
    top: 'auto',
    bottom: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  qrCornerBottomRight: {
    top: 'auto',
    right: 0,
    left: 'auto',
    bottom: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  qrLabel: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  addressContainer: {
    alignItems: 'center',
    marginTop: 8,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: '100%',
  },
  addressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  copyButton: {
    borderColor: '#4CAF50',
  },
  receiveActions: {
    marginTop: 16,
    gap: 8,
  },
  receiveButton: {
    marginBottom: 8,
  },
});

export default WalletScreen; 