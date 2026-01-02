import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Calendar, Clock, User, Phone, AlertCircle, X } from 'lucide-react-native';

export default function HistoryScreen() {
  const { bookings, cancelBooking } = useData();

  const activeBookings = bookings.filter((b) => b.status === 'active');

  const handleCancelBooking = async (bookingId: string) => {
    Alert.alert(
      'Batalkan Booking',
      'Apakah Anda yakin ingin membatalkan booking ini? Pembatalan hanya bisa dilakukan minimal 1 jam sebelum jadwal.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya, Batalkan',
          style: 'destructive',
          onPress: async () => {
            const success = await cancelBooking(bookingId);
            if (success) {
              Alert.alert('Berhasil', 'Booking berhasil dibatalkan');
            } else {
              Alert.alert(
                'Gagal',
                'Pembatalan tidak dapat dilakukan. Pastikan waktu booking masih lebih dari 1 jam dari sekarang.'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Booking</Text>
        <Text style={styles.headerSubtitle}>Kelola jadwal akupunktur Anda</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AlertCircle size={64} color="#cbd5e1" />
            <Text style={styles.emptyText}>Belum ada booking</Text>
            <Text style={styles.emptySubtext}>Pilih penyakit dan buat booking pertama Anda</Text>
          </View>
        ) : (
          activeBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.diseaseTag}>
                  <Text style={styles.diseaseTagText}>{booking.diseaseName}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleCancelBooking(booking.id)}
                  style={styles.cancelButton}
                  activeOpacity={0.7}
                >
                  <X size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>

              <View style={styles.bookingInfo}>
                <View style={styles.infoRow}>
                  <User size={18} color="#64748b" />
                  <Text style={styles.infoLabel}>Nama:</Text>
                  <Text style={styles.infoValue}>{booking.customerName}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Phone size={18} color="#64748b" />
                  <Text style={styles.infoLabel}>No. Telp:</Text>
                  <Text style={styles.infoValue}>{booking.phoneNumber}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Calendar size={18} color="#64748b" />
                  <Text style={styles.infoLabel}>Tanggal:</Text>
                  <Text style={styles.infoValue}>{booking.bookingDate}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Clock size={18} color="#64748b" />
                  <Text style={styles.infoLabel}>Jam:</Text>
                  <Text style={styles.infoValue}>{booking.bookingTime}</Text>
                </View>
              </View>

              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Detail Penyakit:</Text>
                <Text style={styles.detailText}>{booking.diseaseDetail}</Text>
              </View>

              <View style={styles.patientsContainer}>
                <Text style={styles.patientsText}>
                  Jumlah Pasien: <Text style={styles.patientsBold}>{booking.numberOfPatients}</Text>
                </Text>
              </View>
            </View>
          ))
        )}
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#64748b',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  diseaseTag: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  diseaseTagText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#0891b2',
  },
  cancelButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingInfo: {
    gap: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    width: 80,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1e293b',
  },
  detailContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#64748b',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  patientsContainer: {
    backgroundColor: '#dcfce7',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  patientsText: {
    fontSize: 14,
    color: '#166534',
  },
  patientsBold: {
    fontWeight: '700' as const,
    fontSize: 16,
  },
});
