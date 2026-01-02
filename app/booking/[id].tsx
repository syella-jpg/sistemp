import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Calendar, Clock, User, Phone, FileText, Users } from 'lucide-react-native';
import { TIME_SLOTS } from '@/constants/diseases';

export default function BookingFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { diseases, addBooking } = useData();
  const router = useRouter();

  const disease = diseases.find((d) => d.id === id);

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberOfPatients, setNumberOfPatients] = useState('1');
  const [diseaseDetail, setDiseaseDetail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = async () => {
    if (!customerName || !phoneNumber || !diseaseDetail || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Mohon lengkapi semua field');
      return;
    }

    if (!disease) {
      Alert.alert('Error', 'Penyakit tidak ditemukan');
      return;
    }

    await addBooking({
      customerName,
      phoneNumber,
      diseaseId: disease.id,
      diseaseName: disease.name,
      diseaseDetail,
      numberOfPatients: parseInt(numberOfPatients) || 1,
      bookingTime: selectedTime,
      bookingDate: selectedDate,
    });

    Alert.alert('Berhasil', 'Booking berhasil dibuat!', [
      {
        text: 'OK',
        onPress: () => router.push('/history'),
      },
    ]);
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!disease) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Booking' }} />
        <Text>Penyakit tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Form Booking',
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
        <View style={styles.diseaseHeader}>
          <Text style={styles.diseaseHeaderLabel}>Penyakit Dipilih</Text>
          <Text style={styles.diseaseHeaderTitle}>{disease.name}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <User size={20} color="#0891b2" />
              <Text style={styles.label}>Nama Lengkap</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkap"
              value={customerName}
              onChangeText={setCustomerName}
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Phone size={20} color="#0891b2" />
              <Text style={styles.label}>No. Telepon</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="08xx xxxx xxxx"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Users size={20} color="#0891b2" />
              <Text style={styles.label}>Jumlah Pasien</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="1"
              value={numberOfPatients}
              onChangeText={setNumberOfPatients}
              keyboardType="number-pad"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <FileText size={20} color="#0891b2" />
              <Text style={styles.label}>Detail Penyakit</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Jelaskan detail keluhan atau gejala..."
              value={diseaseDetail}
              onChangeText={setDiseaseDetail}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Calendar size={20} color="#0891b2" />
              <Text style={styles.label}>Tanggal</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={selectedDate}
              onChangeText={setSelectedDate}
              placeholderTextColor="#94a3b8"
            />
            <Text style={styles.hint}>Format: {getMinDate()}</Text>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Clock size={20} color="#0891b2" />
              <Text style={styles.label}>Pilih Jam</Text>
            </View>
            <View style={styles.timeSlots}>
              {TIME_SLOTS.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeSlot, selectedTime === time && styles.timeSlotActive]}
                  onPress={() => setSelectedTime(time)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.timeSlotText, selectedTime === time && styles.timeSlotTextActive]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Buat Booking</Text>
        </TouchableOpacity>
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
  diseaseHeader: {
    backgroundColor: '#e0f2fe',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#0891b2',
  },
  diseaseHeaderLabel: {
    fontSize: 13,
    color: '#0369a1',
    marginBottom: 4,
    fontWeight: '600' as const,
  },
  diseaseHeaderTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#0c4a6e',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#334155',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 16,
  },
  hint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeSlotActive: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#64748b',
  },
  timeSlotTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: '#fff',
  },
});
