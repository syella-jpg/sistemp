import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { User } from '@/types';

const OWNER_CREDENTIALS = {
  username: 'hermanto',
  password: 'akupunktur621069',
};

export const [AuthContext, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === OWNER_CREDENTIALS.username && password === OWNER_CREDENTIALS.password) {
      const ownerUser: User = { username, role: 'owner' };
      await AsyncStorage.setItem('user', JSON.stringify(ownerUser));
      setUser(ownerUser);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const setCustomerMode = () => {
    const customerUser: User = { username: 'customer', role: 'customer' };
    setUser(customerUser);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    setCustomerMode,
    isOwner: user?.role === 'owner',
  };
});
