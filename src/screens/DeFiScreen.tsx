import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const DeFiScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">DeFi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default DeFiScreen; 