import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, useTheme, Portal, Modal, TextInput, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  address: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

const WalletCard = () => {
  const theme = useTheme();
  const [balance, setBalance] = useState(1.2345); // Initial balance
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
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
    },
    {
      id: '3',
      type: 'receive',
      amount: 0.02,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      timestamp: new Date('2024-03-17T09:15:00'),
      status: 'completed'
    }
  ]);

  const handleSend = () => {
    const sendAmount = parseFloat(amount);
    if (isNaN(sendAmount) || sendAmount <= 0 || sendAmount > balance) {
      // TODO: Show error message
      return;
    }

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
  };

  const handleReceive = () => {
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
  };

  const renderTransactionHistory = () => (
    <View style={styles.transactionHistory}>
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
    </View>
  );

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.balanceContainer}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Wallet Balance</Text>
          <Text variant="headlineMedium" style={styles.balance}>
            {balance.toFixed(8)} BTC
          </Text>
          <Text variant="bodyMedium" style={styles.usdValue}>
            ≈ ${(balance * 65000).toLocaleString()}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            style={[styles.actionButton, { backgroundColor: '#F7931A' }]}
            onPress={() => setShowSendModal(true)}
            icon="arrow-up"
          >
            Send
          </Button>
          <Button
            mode="contained"
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => setShowReceiveModal(true)}
            icon="arrow-down"
          >
            Receive
          </Button>
        </View>

        {renderTransactionHistory()}
      </Card.Content>

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
          <View style={styles.receiveActions}>
            <Button
              mode="contained"
              onPress={handleReceive}
              style={[styles.receiveButton, { backgroundColor: '#4CAF50' }]}
              icon="plus"
            >
              Receive 0.5 BTC
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
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    color: '#2D1B69',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  balance: {
    color: '#2D1B69',
    fontWeight: 'bold',
  },
  usdValue: {
    color: '#666',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  transactionHistory: {
    marginTop: 16,
  },
  transactionList: {
    maxHeight: 300,
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
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  addressText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  receiveActions: {
    marginTop: 16,
    gap: 8,
  },
  receiveButton: {
    marginBottom: 8,
  },
});

export default WalletCard; 