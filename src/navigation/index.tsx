import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import WalletScreen from '../screens/WalletScreen';
import DeFiScreen from '../screens/DeFiScreen';
import BitNamesScreen from '../screens/BitNamesScreen';
import LearnScreen from '../screens/LearnScreen';
import ProfileScreen from '../screens/ProfileScreen';
import type { RootStackParamList, AuthStackParamList, MainTabParamList } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#F7931A',
      tabBarInactiveTintColor: '#888',
      tabBarShowLabel: true,
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        switch (route.name) {
          case 'Wallet':
            iconName = 'wallet';
            break;
          case 'DeFi':
            iconName = 'swap-horizontal';
            break;
          case 'BitNames':
            iconName = 'account-key';
            break;
          case 'Learn':
            iconName = 'book-open-variant';
            break;
          case 'Profile':
            iconName = 'account-circle';
            break;
          default:
            iconName = 'circle';
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <MainTab.Screen name="Wallet" component={WalletScreen} />
    <MainTab.Screen name="DeFi" component={DeFiScreen} />
    <MainTab.Screen name="BitNames" component={BitNamesScreen} />
    <MainTab.Screen name="Learn" component={LearnScreen} />
    <MainTab.Screen name="Profile" component={ProfileScreen} />
  </MainTab.Navigator>
);

const Navigation = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 