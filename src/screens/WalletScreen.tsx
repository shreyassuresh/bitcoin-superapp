import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Wallet } from '../types';

const WalletScreen = () => {
  const theme = useTheme();
  const [wallets] = React.useState<Wallet[]>([
    {
      address: 'bc1qexampleaddress',
      balance: 1.2345,
      chain: 'mainnet',
    },
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="bitcoin" size={48} color="#F7931A" style={styles.headerIcon} />
        <Text variant="headlineMedium" style={styles.headerTitle}>Bitcoin Wallet</Text>
        <Text variant="bodyLarge" style={[styles.totalBalance, { color: theme.colors.primary }]}>
          Total Balance: {wallets.reduce((sum: number, w: Wallet) => sum + w.balance, 0)} BTC
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
              {wallets[0].address}
            </Text>
          </View>
          <Text variant="displaySmall" style={styles.balanceBig}>
            <MaterialCommunityIcons name="bitcoin" size={24} color="#F7931A" /> {wallets[0].balance} <Text style={{ color: '#F7931A', fontWeight: 'bold' }}>BTC</Text>
          </Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={() => {}}
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
            onPress={() => {}}
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
          <Text variant="bodyMedium" style={styles.emptyText}>
            No recent transactions
          </Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexGrow: 1,
  },
  header: {
    padding: 16,
    paddingTop: 40,
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
  balance: {
    marginTop: 8,
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
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.5,
  },
});

export default WalletScreen; 