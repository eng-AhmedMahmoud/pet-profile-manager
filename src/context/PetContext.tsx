import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Pet, PetFormData } from '../types';
import { MOCK_PETS, AVATAR_COLORS } from '../constants';

const STORAGE_KEY = 'pets';

const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
};

interface PetContextType {
  pets: Pet[];
  isLoading: boolean;
  addPet: (data: PetFormData) => void;
  updatePet: (id: string, data: PetFormData) => void;
  deletePet: (id: string) => void;
  getPetById: (id: string) => Pet | undefined;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

const savePetsToStorage = async (pets: Pet[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Failed to save pets to storage:', error);
  }
};

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setPets(JSON.parse(stored));
        } else {
          setPets(MOCK_PETS);
          await savePetsToStorage(MOCK_PETS);
        }
      } catch (error) {
        console.error('Failed to load pets from storage:', error);
        setPets(MOCK_PETS);
      } finally {
        setIsLoading(false);
      }
    };

    loadPets();
  }, []);

  const addPet = useCallback(
    (data: PetFormData) => {
      const now = new Date().toISOString();
      const randomColor =
        AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

      const newPet: Pet = {
        id: generateId(),
        name: data.name,
        species: data.species,
        breed: data.breed,
        age: data.age,
        notes: data.notes,
        avatarColor: randomColor,
        createdAt: now,
        updatedAt: now,
      };

      setPets(prev => {
        const updatedPets = [newPet, ...prev];
        savePetsToStorage(updatedPets);
        return updatedPets;
      });
    },
    [],
  );

  const updatePet = useCallback(
    (id: string, data: PetFormData) => {
      setPets(prev => {
        const updatedPets = prev.map(pet =>
          pet.id === id
            ? {
                ...pet,
                name: data.name,
                species: data.species,
                breed: data.breed,
                age: data.age,
                notes: data.notes,
                updatedAt: new Date().toISOString(),
              }
            : pet,
        );
        savePetsToStorage(updatedPets);
        return updatedPets;
      });
    },
    [],
  );

  const deletePet = useCallback(
    (id: string) => {
      setPets(prev => {
        const updatedPets = prev.filter(pet => pet.id !== id);
        savePetsToStorage(updatedPets);
        return updatedPets;
      });
    },
    [],
  );

  const getPetById = useCallback(
    (id: string): Pet | undefined => {
      return pets.find(pet => pet.id === id);
    },
    [pets],
  );

  const value: PetContextType = {
    pets,
    isLoading,
    addPet,
    updatePet,
    deletePet,
    getPetById,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

export const usePets = (): PetContextType => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};
