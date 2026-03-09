import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePets } from '../context/PetContext';
import { PetCard } from '../components/pet';
import { Button, EmptyState, ConfirmModal } from '../components/ui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  PetList: undefined;
  PetForm: { petId?: string } | undefined;
  PetDetail: { petId: string };
};

type PetListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PetList'>;

const PetListScreen: React.FC = () => {
  const { pets, isLoading, deletePet } = usePets();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const navigation = useNavigation<PetListNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Pets</Text>
        <Text style={styles.subtitle}>{pets.length} pet(s)</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PetForm')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      ) : pets.length === 0 ? (
        <EmptyState
          emoji="🐾"
          title="No Pets Yet"
          message="Add your first pet to get started!"
          actionLabel="Add Pet"
          onAction={() => navigation.navigate('PetForm')}
        />
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PetCard
              pet={item}
              onPress={() => navigation.navigate('PetDetail', { petId: item.id })}
              onEdit={() => navigation.navigate('PetForm', { petId: item.id })}
              onDelete={() => setDeleteTarget(item.id)}
            />
          )}
        />
      )}

      <ConfirmModal
        visible={deleteTarget !== null}
        title="Delete Pet"
        message="Are you sure you want to delete this pet? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={() => {
          if (deleteTarget) {
            deletePet(deleteTarget);
          }
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    top: 12,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default PetListScreen;
