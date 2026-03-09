import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { usePets } from '../context/PetContext';
import { Input, Button } from '../components/ui';
import { Species } from '../types';
import { SPECIES_CONFIG } from '../constants';

type RootStackParamList = {
  PetList: undefined;
  PetForm: { petId?: string } | undefined;
  PetDetail: { petId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PetForm'>;

const PetFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { addPet, updatePet, getPetById } = usePets();

  const petId = route.params?.petId;
  const existingPet = petId ? getPetById(petId) : undefined;
  const isEditing = !!existingPet;

  const [name, setName] = useState<string>(existingPet?.name ?? '');
  const [species, setSpecies] = useState<Species>(existingPet?.species ?? 'dog');
  const [breed, setBreed] = useState<string>(existingPet?.breed ?? '');
  const [age, setAge] = useState<string>(
    existingPet ? existingPet.age.toString() : '',
  );
  const [notes, setNotes] = useState<string>(existingPet?.notes ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const speciesKeys = Object.keys(SPECIES_CONFIG) as Species[];
  const breedSuggestions = SPECIES_CONFIG[species].defaultBreeds;

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Pet name is required';
    }

    if (!breed.trim()) {
      newErrors.breed = 'Breed is required';
    }

    if (!age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const parsed = parseFloat(age);
      if (isNaN(parsed) || parsed < 0) {
        newErrors.age = 'Age must be a valid number (0 or greater)';
      }
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = {
      name: name.trim(),
      species,
      breed: breed.trim(),
      age: parseFloat(age),
      notes: notes.trim() || undefined,
    };

    if (isEditing && petId) {
      updatePet(petId, formData);
    } else {
      addPet(formData);
    }

    navigation.goBack();
  };

  const handleSpeciesChange = (newSpecies: Species) => {
    setSpecies(newSpecies);
    setBreed('');
    setErrors(prev => {
      const updated = { ...prev };
      delete updated.breed;
      return updated;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>{'\u2190'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Pet' : 'Add New Pet'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Form */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Pet Name */}
        <Input
          label="Pet Name"
          value={name}
          onChangeText={text => {
            setName(text);
            if (errors.name) {
              setErrors(prev => {
                const updated = { ...prev };
                delete updated.name;
                return updated;
              });
            }
          }}
          placeholder="Enter your pet's name"
          error={errors.name}
        />

        {/* Species Picker */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>Species</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.speciesRow}
          >
            {speciesKeys.map(key => {
              const config = SPECIES_CONFIG[key];
              const isSelected = species === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.speciesPill,
                    isSelected
                      ? styles.speciesPillSelected
                      : styles.speciesPillUnselected,
                  ]}
                  onPress={() => handleSpeciesChange(key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.speciesEmoji}>{config.emoji}</Text>
                  <Text
                    style={[
                      styles.speciesLabel,
                      isSelected && styles.speciesLabelSelected,
                    ]}
                  >
                    {config.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Breed */}
        <Input
          label="Breed"
          value={breed}
          onChangeText={text => {
            setBreed(text);
            if (errors.breed) {
              setErrors(prev => {
                const updated = { ...prev };
                delete updated.breed;
                return updated;
              });
            }
          }}
          placeholder="Enter breed"
          error={errors.breed}
        />

        {/* Breed Suggestions */}
        {breedSuggestions.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.breedSuggestionsRow}
            style={styles.breedSuggestionsContainer}
          >
            {breedSuggestions.map(suggestion => {
              const isActive = breed === suggestion;
              return (
                <TouchableOpacity
                  key={suggestion}
                  style={[
                    styles.breedChip,
                    {
                      backgroundColor: isActive ? '#4F46E5' : '#F3F4F6',
                    },
                  ]}
                  onPress={() => {
                    setBreed(suggestion);
                    if (errors.breed) {
                      setErrors(prev => {
                        const updated = { ...prev };
                        delete updated.breed;
                        return updated;
                      });
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.breedChipText,
                      { color: isActive ? '#FFFFFF' : '#374151' },
                    ]}
                  >
                    {suggestion}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {/* Age */}
        <Input
          label="Age"
          value={age}
          onChangeText={text => {
            setAge(text);
            if (errors.age) {
              setErrors(prev => {
                const updated = { ...prev };
                delete updated.age;
                return updated;
              });
            }
          }}
          placeholder="Enter age in years"
          keyboardType="numeric"
          error={errors.age}
        />

        {/* Notes */}
        <Input
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Any additional notes (optional)"
          multiline
        />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Cancel"
            variant="secondary"
            onPress={() => navigation.goBack()}
            fullWidth
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title={isEditing ? 'Save' : 'Create'}
            variant="primary"
            onPress={handleSubmit}
            fullWidth
          />
        </View>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#374151',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  speciesRow: {
    paddingVertical: 4,
  },
  speciesPill: {
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  speciesPillSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
    borderWidth: 2,
  },
  speciesPillUnselected: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  speciesEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  speciesLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  speciesLabelSelected: {
    color: '#4F46E5',
  },
  breedSuggestionsContainer: {
    marginTop: -8,
    marginBottom: 16,
  },
  breedSuggestionsRow: {
    paddingVertical: 4,
  },
  breedChip: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  breedChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default PetFormScreen;
