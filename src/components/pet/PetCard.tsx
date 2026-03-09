import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Pet, Species } from '../../types';
import PetAvatar from './PetAvatar';

const SPECIES_EMOJI: Record<Species, string> = {
  dog: '\u{1F415}',
  cat: '\u{1F408}',
  bird: '\u{1F426}',
  rabbit: '\u{1F407}',
  fish: '\u{1F420}',
  reptile: '\u{1F98E}',
  other: '\u{1F43E}',
};

interface PetCardProps {
  pet: Pet;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onPress, onEdit, onDelete }) => {
  const speciesEmoji = SPECIES_EMOJI[pet.species] ?? SPECIES_EMOJI.other;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.card}
      accessibilityLabel={`${pet.name} card`}
    >
      <View style={styles.row}>
        {/* Left: Avatar */}
        <PetAvatar
          name={pet.name}
          species={pet.species}
          color={pet.avatarColor}
          size="md"
        />

        {/* Center: Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {pet.name}
          </Text>
          <View style={styles.breedRow}>
            <Text style={styles.breedText}>
              {speciesEmoji} {pet.breed}
            </Text>
          </View>
          <Text style={styles.age}>
            Age: {pet.age} {pet.age === 1 ? 'year' : 'years'}
          </Text>
        </View>

        {/* Right: Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onEdit}
            style={styles.actionButton}
            accessibilityLabel={`Edit ${pet.name}`}
          >
            <Text style={styles.actionIcon}>{'\u270F\uFE0F'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            style={styles.actionButton}
            accessibilityLabel={`Delete ${pet.name}`}
          >
            <Text style={styles.actionIcon}>{'\u{1F5D1}\uFE0F'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  breedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  breedText: {
    fontSize: 14,
    color: '#6B7280',
  },
  age: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
  actionIcon: {
    fontSize: 16,
  },
});

export default PetCard;
