import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Species } from '../../types';

const SPECIES_EMOJI: Record<Species, string> = {
  dog: '\u{1F415}',
  cat: '\u{1F408}',
  bird: '\u{1F426}',
  rabbit: '\u{1F407}',
  fish: '\u{1F420}',
  reptile: '\u{1F98E}',
  other: '\u{1F43E}',
};

const SIZE_MAP = {
  sm: 40,
  md: 56,
  lg: 80,
} as const;

const EMOJI_FONT_SIZE_MAP = {
  sm: 18,
  md: 26,
  lg: 38,
} as const;

interface PetAvatarProps {
  name: string;
  species: Species;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const PetAvatar: React.FC<PetAvatarProps> = ({
  name,
  species,
  color,
  size = 'md',
}) => {
  const dimension = SIZE_MAP[size];
  const emojiFontSize = EMOJI_FONT_SIZE_MAP[size];
  const emoji = SPECIES_EMOJI[species] ?? SPECIES_EMOJI.other;

  return (
    <View
      accessibilityLabel={`${name} avatar`}
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: color,
        },
      ]}
    >
      <Text style={[styles.emoji, { fontSize: emojiFontSize }]}>{emoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    textAlign: 'center',
  },
});

export default PetAvatar;
