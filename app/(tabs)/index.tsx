import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Search, Activity, Lock } from 'lucide-react-native';

export default function DiseaseListScreen() {
  const { diseases } = useData();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Activity size={32} color="#fff" />
            <Text style={styles.headerTitle}>Akupunktur</Text>
          </View>
          <Text style={styles.headerSubtitle}>Pusat Kesehatan Alternatif</Text>
        </View>
        <TouchableOpacity
          style={styles.ownerButton}
          onPress={() => router.push('/owner/login')}
          activeOpacity={0.7}
        >
          <Lock size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari penyakit..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.sectionTitle}>Pilih Penyakit</Text>

        <ScrollView 
          style={styles.diseaseList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.diseaseListContent}
        >
          {filteredDiseases.map((disease) => (
            <TouchableOpacity
              key={disease.id}
              style={styles.diseaseCard}
              onPress={() => router.push(`/booking/${disease.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.diseaseIconContainer}>
                <Activity size={24} color="#0891b2" />
              </View>
              <Text style={styles.diseaseName}>{disease.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
    gap: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#e0f2fe',
    marginLeft: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1e293b',
    marginBottom: 16,
  },
  diseaseList: {
    flex: 1,
  },
  diseaseListContent: {
    paddingBottom: 24,
  },
  diseaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  diseaseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diseaseName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1e293b',
  },
  ownerButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
