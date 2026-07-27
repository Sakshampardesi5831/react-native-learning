export const COLORS = {
  // Pokémon Type Colors
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  dark: "#705848",

  // Theme / UI Colors
  background: "#18181b",
  card: "#27272a",
  text: "#ffffff",
  textMuted: "#a1a1aa",
  primary: "#34d399",
  border: "#3f3f3f",
} as const;

export type ColorPalette = typeof COLORS;
export type ColorPattle = typeof COLORS; // Typo alias for compatibility
export type colorsKey = keyof ColorPalette;
