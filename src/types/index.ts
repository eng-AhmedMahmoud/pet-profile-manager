export type Species =
  | 'dog'
  | 'cat'
  | 'bird'
  | 'rabbit'
  | 'fish'
  | 'reptile'
  | 'other';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: number;
  notes?: string;
  avatarColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface PetFormData {
  name: string;
  species: Species;
  breed: string;
  age: number;
  notes?: string;
}
