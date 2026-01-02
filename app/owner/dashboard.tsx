import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import {
  ClipboardList,
  FileEdit,
  LogOut,
  Users,
  TrendingUp,
} from 'lucide-react-native';

export default function OwnerDashboardScreen() {
  const { logout } = useAuth();
  const { bookings, diseases } = useData();
  const router = useRouter();

  const activeBookings = bookings.filter((b) => b.status === 'active');

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Dashboard Owner</Text>
          <Text style={styles.headerSubtitle}>Kelola klinik akupunktur Anda</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
          <LogOut size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <ClipboardList size={24} color="#0891b2" />
            </View>
            <Text style={styles.statValue}>{activeBookings.length}</Text>
            <Text style={styles.statLabel}>Booking Aktif</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <FileEdit size={24} color="#059669" />
            </View>
            <Text style={styles.statValue}>{diseases.length}</Text>
            <Text style={styles.statLabel}>Total Penyakit</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/owner/diseases')}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <FileEdit size={28} color="#0891b2" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Kelola Penyakit</Text>
              <Text style={styles.menuSubtitle}>Tambah, edit, atau hapus menu penyakit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/owner/bookings')}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <Users size={28} color="#059669" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Lihat Booking</Text>
              <Text style={styles.menuSubtitle}>Daftar booking dari semua customer</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <TrendingUp size={20} color="#0891b2" />
            <Text style={styles.recentTitle}>Booking Terbaru</Text>
          </View>

          {activeBookings.slice(0, 3).map((booking) => (
            <View key={booking.id} style={styles.recentCard}>
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{booking.customerName}</Text>
                <Text style={styles.recentDisease}>{booking.diseaseName}</Text>
              </View>
              <View style={styles.recentTime}>
                <Text style={styles.recentTimeText}>{booking.bookingTime}</Text>
                <Text style={styles.recentDateText}>{booking.bookingDate}</Text>
              </View>
            </View>
          ))}

          {activeBookings.length === 0 && (
            <View style={styles.emptyRecent}>
              <Text style={styles.emptyRecentText}>Belum ada booking</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#0891b2',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#e0f2fe',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
  menuContainer: {
    gap: 12,
    marginBottom: 24,
  },
  menuCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: '#1e293b',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  recentSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#1e293b',
  },
  recentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1e293b',
    marginBottom: 2,
  },
  recentDisease: {
    fontSize: 13,
    color: '#64748b',
  },
  recentTime: {
    alignItems: 'flex-end',
  },
  recentTimeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#0891b2',
    marginBottom: 2,
  },
  recentDateText: {
    fontSize: 12,
    color: '#64748b',
  },
  emptyRecent: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyRecentText: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
