import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokemonDetails } from "../api/pokemon";
import { COLORS } from "../constants/colors";
import { getTypeColor } from "../constants/types";
import { PokemonDetailScreenRouteProp } from "../navigation/types";

const STAT_MAP: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

const PokemonDetailScreen = () => {
  const route = useRoute<PokemonDetailScreenRouteProp>();
  const navigation = useNavigation();
  const pokemon: PokemonDetails = route.params.pokemon;

  if (!pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No Pokémon data available.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const typeColor = getTypeColor(primaryType);
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  // Format ID to 3 digits (e.g. #001)
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  // Convert dimensions (height in decimeters, weight in hectograms)
  const heightInMeters = (pokemon.height / 10).toFixed(1) + " m";
  const weightInKg = (pokemon.weight / 10).toFixed(1) + " kg";

  return (
    <View style={[styles.container, { backgroundColor: typeColor }]}>
      <StatusBar barStyle="light-content" />

      {/* Header Bar */}
      <SafeAreaView edges={["top"]} style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerId}>{formattedId}</Text>
      </SafeAreaView>

      {/* Hero Header (Name & Types) */}
      <View style={styles.heroSection}>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        <View style={styles.typeBadgeRow}>
          {pokemon.types.map((t) => {
            const badgeColor = getTypeColor(t.type.name);
            return (
              <View
                key={t.type.name}
                style={[styles.typeBadge, { backgroundColor: badgeColor }]}
              >
                <Text style={styles.typeText}>{t.type.name}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Floating Image Container */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.pokemonImage}
          contentFit="contain"
          transition={300}
        />
      </View>

      {/* Details Card */}
      <View style={styles.detailsCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Info Section (Height, Weight, Abilities) */}
          <View style={styles.infoRow}>
            <View style={styles.infoCol}>
              <View style={styles.infoIconLabel}>
                <Ionicons
                  name="resize-outline"
                  size={16}
                  color={COLORS.textMuted}
                />
                <Text style={styles.infoLabel}>Height</Text>
              </View>
              <Text style={styles.infoValue}>{heightInMeters}</Text>
            </View>

            <View style={[styles.infoCol, styles.infoColDivider]} />

            <View style={styles.infoCol}>
              <View style={styles.infoIconLabel}>
                <Ionicons
                  name="scale-outline"
                  size={16}
                  color={COLORS.textMuted}
                />
                <Text style={styles.infoLabel}>Weight</Text>
              </View>
              <Text style={styles.infoValue}>{weightInKg}</Text>
            </View>

            <View style={[styles.infoCol, styles.infoColDivider]} />

            <View style={styles.infoCol}>
              <View style={styles.infoIconLabel}>
                <Ionicons
                  name="flash-outline"
                  size={16}
                  color={COLORS.textMuted}
                />
                <Text style={styles.infoLabel}>Abilities</Text>
              </View>
              <Text style={styles.infoValue} numberOfLines={1}>
                {pokemon.abilities[0]?.ability.name || "None"}
              </Text>
            </View>
          </View>

          {/* Base Stats Section */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Base Stats</Text>

            {pokemon.stats.map((s) => {
              const statLabel = STAT_MAP[s.stat.name] || s.stat.name;
              const baseStat = s.base_stat;
              // Max stat for visual representation
              const maxStatValue = 180;
              const fillPercentage = Math.min(
                (baseStat / maxStatValue) * 100,
                100,
              );

              return (
                <View key={s.stat.name} style={styles.statRow}>
                  <Text style={styles.statLabelText}>{statLabel}</Text>
                  <Text style={styles.statValueText}>{baseStat}</Text>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${fillPercentage}%`,
                          backgroundColor: typeColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PokemonDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  headerId: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    opacity: 0.9,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    zIndex: 5,
  },
  pokemonName: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ffffff",
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
  typeBadgeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    position: "absolute",
    top: 150,
    left: 0,
    right: 0,
  },
  pokemonImage: {
    width: 220,
    height: 220,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: 180, // Space for the floating image overlap
    paddingTop: 100, // Offset so scrollable content starts below image
    overflow: "hidden",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  infoRow: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
  },
  infoCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoColDivider: {
    flex: 0,
    width: 1,
    height: "80%",
    backgroundColor: COLORS.border,
  },
  infoIconLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "capitalize",
  },
  statsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statLabelText: {
    width: 50,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
  statValueText: {
    width: 40,
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "right",
    marginRight: 15,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.card,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: COLORS.border,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  // Error state styles
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  backButtonText: {
    color: COLORS.background,
    fontWeight: "700",
    fontSize: 15,
  },
});
