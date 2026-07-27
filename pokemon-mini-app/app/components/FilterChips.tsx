import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { getTypeColor, POKEMON_TYPES } from "../constants/types";

interface FilterChipsProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

const FilterChips = ({ selectedType, onSelectType }: FilterChipsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelectType(null)}
        style={[
          styles.chip,
          selectedType === null ? styles.activeChipAll : styles.inactiveChip,
        ]}
      >
        <Text
          style={[
            styles.chipText,
            selectedType === null ? styles.activeChipTextAll : styles.inactiveChipText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      {POKEMON_TYPES.map((type) => {
        const isActive = selectedType === type;
        const typeColor = getTypeColor(type);

        return (
          <TouchableOpacity
            key={type}
            activeOpacity={0.8}
            onPress={() => onSelectType(isActive ? null : type)}
            style={[
              styles.chip,
              isActive
                ? { backgroundColor: typeColor, borderColor: typeColor }
                : styles.inactiveChip,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                isActive ? styles.activeChipText : styles.inactiveChipText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterChips;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveChip: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },
  activeChipAll: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  inactiveChipText: {
    color: COLORS.textMuted,
  },
  activeChipText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  activeChipTextAll: {
    color: COLORS.background,
    fontWeight: "700",
  },
});
