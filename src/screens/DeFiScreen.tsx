import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const API_KEY = '92a0c25c-edbb-49b3-a65a-4b6f781c2199';

interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const DeFiScreen = () => {
  const theme = useTheme();
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await axios.get<MarketData>('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
        params: {
          vs_currency: 'usd',
          days: '7',
          interval: 'daily',
        },
      });
      setMarketData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market data:', error);
      setLoading(false);
    }
  };

  const renderMarketOverview = () => {
    if (!marketData) return null;
    
    const latestPrice = marketData.prices[marketData.prices.length - 1][1];
    const priceChange = ((latestPrice - marketData.prices[0][1]) / marketData.prices[0][1]) * 100;
    
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Market Overview</Text>
          <View style={styles.priceContainer}>
            <Text variant="headlineMedium" style={styles.price}>${latestPrice.toLocaleString()}</Text>
            <Text 
              variant="bodyLarge" 
              style={[styles.priceChange, { color: priceChange >= 0 ? '#4CAF50' : '#F44336' }]}
            >
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </Text>
          </View>
          <View style={styles.marketStats}>
            <View style={styles.statItem}>
              <Text variant="bodySmall">24h Volume</Text>
              <Text variant="bodyMedium">${marketData.total_volumes[marketData.total_volumes.length - 1][1].toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="bodySmall">Market Cap</Text>
              <Text variant="bodyMedium">${marketData.market_caps[marketData.market_caps.length - 1][1].toLocaleString()}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderYieldOpportunities = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>Yield Opportunities</Text>
        <View style={styles.yieldContainer}>
          <View style={styles.yieldItem}>
            <MaterialCommunityIcons name="bank" size={24} color="#F7931A" />
            <View style={styles.yieldInfo}>
              <Text variant="titleSmall">Lending Pool</Text>
              <Text variant="bodySmall">Earn up to 5% APY</Text>
            </View>
            <Button mode="contained" style={styles.actionButton}>
              Deposit
            </Button>
          </View>
          <View style={styles.yieldItem}>
            <MaterialCommunityIcons name="swap-horizontal" size={24} color="#F7931A" />
            <View style={styles.yieldInfo}>
              <Text variant="titleSmall">Liquidity Pool</Text>
              <Text variant="bodySmall">Earn up to 8% APY</Text>
            </View>
            <Button mode="contained" style={styles.actionButton}>
              Provide
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderProtocolIntegrations = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>Protocol Integrations</Text>
        <View style={styles.protocolContainer}>
          <View style={styles.protocolItem}>
            <MaterialCommunityIcons name="shield-check" size={24} color="#F7931A" />
            <View style={styles.protocolInfo}>
              <Text variant="titleSmall">exSat</Text>
              <Text variant="bodySmall">Bitcoin's metadata consensus with Hybrid Mechanism</Text>
            </View>
            <Button mode="outlined" style={styles.actionButton}>
              Connect
            </Button>
          </View>
          <View style={styles.protocolItem}>
            <MaterialCommunityIcons name="swap-horizontal" size={24} color="#F7931A" />
            <View style={styles.protocolInfo}>
              <Text variant="titleSmall">sBTC</Text>
              <Text variant="bodySmall">1:1 Bitcoin-backed asset for DeFi</Text>
            </View>
            <Button mode="outlined" style={styles.actionButton}>
              Connect
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F7931A" />
      </View>
    );
  }

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
          <Text variant="headlineMedium">DeFi Hub</Text>
        </View>
        <Text variant="bodyLarge" style={{ color: '#F7931A' }}>
          Market Data & Opportunities
        </Text>
      </View>

      {renderMarketOverview()}
      {renderYieldOpportunities()}
      {renderProtocolIntegrations()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  price: {
    color: '#2D1B69',
    marginRight: 8,
  },
  priceChange: {
    fontWeight: 'bold',
  },
  marketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    flex: 1,
  },
  yieldContainer: {
    marginTop: 8,
  },
  yieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF6E5',
    borderRadius: 8,
    marginBottom: 8,
  },
  yieldInfo: {
    flex: 1,
    marginLeft: 12,
  },
  protocolContainer: {
    marginTop: 8,
  },
  protocolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF6E5',
    borderRadius: 8,
    marginBottom: 8,
  },
  protocolInfo: {
    flex: 1,
    marginLeft: 12,
  },
  actionButton: {
    marginLeft: 8,
  },
});

export default DeFiScreen; 