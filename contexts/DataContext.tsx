import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { Disease, Booking } from '@/types';
import { DEFAULT_DISEASES } from '@/constants/diseases';

export const [DataContext, useData] = createContextHook(() => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedDiseases = await AsyncStorage.getItem('diseases');
      const storedBookings = await AsyncStorage.getItem('bookings');

      if (storedDiseases) {
        setDiseases(JSON.parse(storedDiseases));
      } else {
        const initialDiseases: Disease[] = DEFAULT_DISEASES.map((name, index) => ({
          id: `disease_${index}_${Date.now()}`,
          name,
          createdAt: Date.now(),
        }));
        setDiseases(initialDiseases);
        await AsyncStorage.setItem('diseases', JSON.stringify(initialDiseases));
      }

      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDisease = async (name: string) => {
    const newDisease: Disease = {
      id: `disease_${Date.now()}`,
      name,
      createdAt: Date.now(),
    };
    const updated = [...diseases, newDisease];
    setDiseases(updated);
    await AsyncStorage.setItem('diseases', JSON.stringify(updated));
  };

  const updateDisease = async (id: string, name: string) => {
    const updated = diseases.map((d) => (d.id === id ? { ...d, name } : d));
    setDiseases(updated);
    await AsyncStorage.setItem('diseases', JSON.stringify(updated));
  };

  const deleteDisease = async (id: string) => {
    const updated = diseases.filter((d) => d.id !== id);
    setDiseases(updated);
    await AsyncStorage.setItem('diseases', JSON.stringify(updated));
  };

  const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking_${Date.now()}`,
      createdAt: Date.now(),
      status: 'active',
    };
    const updated = [...bookings, newBooking];
    setBookings(updated);
    await AsyncStorage.setItem('bookings', JSON.stringify(updated));
  };

  const cancelBooking = async (id: string): Promise<boolean> => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return false;

    const bookingDateTime = new Date(`${booking.bookingDate} ${booking.bookingTime}`);
    const now = new Date();
    const hoursDiff = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDiff < 1) {
      return false;
    }

    const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
    setBookings(updated);
    await AsyncStorage.setItem('bookings', JSON.stringify(updated));
    return true;
  };

  return {
    diseases,
    bookings,
    isLoading,
    addDisease,
    updateDisease,
    deleteDisease,
    addBooking,
    cancelBooking,
  };
});
