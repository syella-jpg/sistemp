import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Plus, Pencil, Trash2 } from 'lucide-react-native';

export default function ManageDiseasesScreen() {
  const { diseases, addDisease, updateDisease, deleteDisease } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDiseaseName, setNewDiseaseName] = useState('');
  const [editDiseaseName, setEditDiseaseName] = useState('');

  const handleAdd = async () => {
    if (!newDiseaseName.trim()) {
      Alert.alert('Error', 'Nama penyakit tidak boleh kosong');
      return;
    }
    await addDisease(newDiseaseName.trim());
    setNewDiseaseName('');
    setIsAdding(false);
    Alert.alert('Berhasil', 'Penyakit berhasil ditambahkan');
  };

  const handleUpdate = async (id: string) => {
    if (!editDiseaseName.trim()) {
      Alert.alert('Error', 'Nama penyakit tidak boleh kosong');
      return;
    }
    await updateDisease(id, editDiseaseName.trim());
    setEditingId(null);
    setEditDiseaseName('');
    Alert.alert('Berhasil', 'Penyakit berhasil diupdate');
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Hapus Penyakit', `Apakah Anda yakin ingin menghapus "${name}"?`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          await deleteDisease(id);
          Alert.alert('Berhasil', 'Penyakit berhasil dihapus');
        },
      },
    ]);
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditDiseaseName(name);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Kelola Penyakit',
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(!isAdding)}
          activeOpacity={0.8}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>Tambah Penyakit Baru</Text>
        </TouchableOpacity>

        {isAdding && (
          <View style={styles.addForm}>
            <TextInput
              style={styles.addInput}
              placeholder="Nama penyakit..."
              value={newDiseaseName}
              onChangeText={setNewDiseaseName}
              placeholderTextColor="#94a3b8"
            />
            <View style={styles.addActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAdding(false)}>
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
                <Text style={styles.saveButtonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.diseasesList}>
          {diseases.map((disease) => (
            <View key={disease.id} style={styles.diseaseCard}>
              {editingId === disease.id ? (
                <View style={styles.editForm}>
                  <TextInput
                    style={styles.editInput}
                    value={editDiseaseName}
                    onChangeText={setEditDiseaseName}
                    placeholderTextColor="#94a3b8"
                  />
                  <View style={styles.editActions}>
                    <TouchableOpacity
                      style={styles.cancelEditButton}
                      onPress={() => setEditingId(null)}
                    >
                      <Text style={styles.cancelEditButtonText}>Batal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.saveEditButton}
                      onPress={() => handleUpdate(disease.id)}
                    >
                      <Text style={styles.saveEditButtonText}>Simpan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <Text style={styles.diseaseName}>{disease.name}</Text>
                  <View style={styles.diseaseActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => startEdit(disease.id, disease.name)}
                    >
                      <Pencil size={18} color="#0891b2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(disease.id, disease.name)}
                    >
                      <Trash2 size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0891b2',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginBottom: 20,
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#fff',
  },
  addForm: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 12,
  },
  addActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#64748b',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#0891b2',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#fff',
  },
  diseasesList: {
    gap: 12,
  },
  diseaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  diseaseName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1e293b',
  },
  diseaseActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editForm: {
    flex: 1,
  },
  editInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 12,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelEditButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  cancelEditButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#64748b',
  },
  saveEditButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0891b2',
  },
  saveEditButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#fff',
  },
});
