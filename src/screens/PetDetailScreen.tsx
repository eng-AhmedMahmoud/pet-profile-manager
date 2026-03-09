import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePets } from '../context/PetContext';
import { PetAvatar } from '../components/pet';
import { Button, ConfirmModal } from '../components/ui';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Species } from '../types';

type RootStackParamList = {
  PetList: undefined;
  PetForm: { petId?: string } | undefined;
  PetDetail: { petId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PetDetail'>;

const SPECIES_EMOJI: Record<Species, string> = {
  dog: '\u{1F415}',
  cat: '\u{1F408}',
  bird: '\u{1F426}',
  rabbit: '\u{1F407}',
  fish: '\u{1F420}',
  reptile: '\u{1F98E}',
  other: '\u{1F43E}',
};

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const PetDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { getPetById, deletePet } = usePets();
  const pet = getPetById(route.params.petId);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!pet) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Pet not found</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="secondary"
          />
        </View>
      </SafeAreaView>
    );
  }

  const speciesLabel =
    pet.species.charAt(0).toUpperCase() + pet.species.slice(1);
  const emoji = SPECIES_EMOJI[pet.species] ?? SPECIES_EMOJI.other;

  const handleDelete = () => {
    deletePet(pet.id);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>{'\u2190'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero section */}
        <View style={styles.heroSection}>
          <PetAvatar
            name={pet.name}
            species={pet.species}
            color={pet.avatarColor}
            size="lg"
          />
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petSpeciesBreed}>
            {speciesLabel} {pet.breed ? `\u00B7 ${pet.breed}` : ''}
          </Text>
        </View>

        {/* Info cards section */}
        <View style={styles.cardsSection}>
          {/* Details card */}
          <View style={styles.card}>
            {/* Species row */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Species</Text>
              <Text style={styles.infoValue}>
                {emoji} {speciesLabel}
              </Text>
            </View>

            <View style={styles.separator} />

            {/* Breed row */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Breed</Text>
              <Text style={styles.infoValue}>{pet.breed || 'Unknown'}</Text>
            </View>

            <View style={styles.separator} />

            {/* Age row */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>
                {pet.age} year{pet.age !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          {/* Notes card */}
          {pet.notes ? (
            <View style={styles.card}>
              <Text style={styles.notesTitle}>Notes</Text>
              <Text style={styles.notesText}>{pet.notes}</Text>
            </View>
          ) : null}

          {/* Added date card */}
          <View style={styles.dateCard}>
            <Text style={styles.dateText}>
              Added on {formatDate(pet.createdAt)}
            </Text>
            <Text style={styles.dateText}>
              Last updated {formatDate(pet.updatedAt)}
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsSection}>
          <Button
            title="Edit Pet"
            onPress={() => navigation.navigate('PetForm', { petId: pet.id })}
            variant="primary"
            fullWidth
          />
          <View style={styles.deleteButtonSpacer} />
          <Button
            title="Delete Pet"
            onPress={() => setShowDeleteConfirm(true)}
            variant="danger"
            fullWidth
          />
        </View>
      </ScrollView>

      {/* Delete confirmation modal */}
      <ConfirmModal
        visible={showDeleteConfirm}
        title={`Delete ${pet.name}?`}
        message={`This will permanently remove ${pet.name} from your pets list.`}
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 24,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  petName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
  },
  petSpeciesBreed: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  cardsSection: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 15,
    color: '#6B7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  notesText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginTop: 8,
  },
  dateCard: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    marginTop: 24,
  },
  deleteButtonSpacer: {
    height: 12,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
  },
});

export default PetDetailScreen;
