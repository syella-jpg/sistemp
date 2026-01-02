import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Calendar, Clock, User, Phone, FileText } from 'lucide-react-native';

export default function OwnerBookingsScreen() {
  const { bookings } = useData();

  const activeBookings = bookings.filter((b) => b.status === 'active');

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Daftar Booking',
          headerStyle: { backgroundColor: '#0891b2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' as const },
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada booking</Text>
          </View>
        ) : (
          activeBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.diseaseHeader}>
                <Text style={styles.diseaseTag}>{booking.diseaseName}</Text>
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
                <View style={styles.detailHeader}>
                  <FileText size={16} color="#64748b" />
                  <Text style={styles.detailLabel}>Detail Penyakit:</Text>
                </View>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
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
  diseaseHeader: {
    marginBottom: 16,
  },
  diseaseTag: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#0891b2',
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
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#64748b',
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
