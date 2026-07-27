import { COLORS, colorsKey } from "./colors";

export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "steel",
  "fairy",
  "dark",
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

export const getTypeColor = (type: string): string => {
  const normalizedType = type.toLowerCase();

  if (normalizedType in COLORS) {
    return COLORS[normalizedType as colorsKey];
  }
  return COLORS.normal;
};
