import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPokemonDetail, PokemonDetails } from "../api/pokemon";
import { COLORS } from "../constants/colors";
import { getTypeColor } from "../constants/types";

interface PokemonCardProps {
  name: string;
  url: string;
  onPress?: (pokemon: PokemonDetails) => void;
}

const PokemonCard = ({ name, onPress }: PokemonCardProps) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getPokemonDetail(name)
      .then((data) => {
        if (active) {
          setDetails(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching details for " + name, err);
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [name]);

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonLeft}>
          <View style={styles.skeletonId} />
          <View style={styles.skeletonName} />
          <View style={styles.skeletonRow}>
            <View style={styles.skeletonBadge} />
            <View style={styles.skeletonBadge} />
          </View>
        </View>
        <View style={styles.skeletonRight}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  if (!details) return null;

  const primaryType = details.types[0]?.type.name || "normal";
  const typeColor = getTypeColor(primaryType);
  const imageUrl =
    details.sprites.other["official-artwork"].front_default ||
    details.sprites.front_default;

  // Format ID to 3 digits (e.g. #001)
  const formattedId = `#${String(details.id).padStart(3, "0")}`;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(details)}
      style={[
        styles.cardContainer,
        {
          borderColor: typeColor + "40", // subtle color border matching the type
        },
      ]}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.idText}>{formattedId}</Text>
        <Text style={styles.nameText}>{details.name}</Text>
        <View style={styles.badgeContainer}>
          {details.types.map((t) => {
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
      <View style={styles.cardRight}>
        <View style={[styles.glowBackground, { backgroundColor: typeColor + "15" }]} />
        <Image
          source={{ uri: imageUrl }}
          style={styles.pokemonImage}
          contentFit="contain"
          transition={300}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    height: 110,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    flex: 1,
    justifyContent: "center",
  },
  idText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    textTransform: "capitalize",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  typeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  cardRight: {
    width: 90,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  glowBackground: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 1,
  },
  pokemonImage: {
    width: 85,
    height: 85,
    zIndex: 2,
  },
  // Skeleton Styles
  skeletonContainer: {
    flexDirection: "row",
    height: 110,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  skeletonLeft: {
    flex: 1,
    justifyContent: "center",
  },
  skeletonId: {
    width: 40,
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonName: {
    width: 120,
    height: 20,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonRow: {
    flexDirection: "row",
    gap: 6,
  },
  skeletonBadge: {
    width: 60,
    height: 20,
    backgroundColor: COLORS.border,
    borderRadius: 8,
  },
  skeletonRight: {
    width: 90,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
