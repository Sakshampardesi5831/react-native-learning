import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemonList, PokemonDetails, PokemonRef } from "../api/pokemon";
import AppHeader from "../components/AppHeader";
import PokemonCard from "../components/PokemonCard";
import { COLORS } from "../constants/colors";
import { PokemonListScreenNavigationProp } from "../navigation/types";

const SkeletonCard = () => (
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

const PokemonListScreen = () => {
  const navigation = useNavigation<PokemonListScreenNavigationProp>();
  const flatListRef = useRef<FlatList<PokemonRef>>(null);

  const [list, setList] = useState<PokemonRef[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getPokemonList(20, offset);
      setList((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + 20);
      if (!data.next) setHasMore(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon. Please try again.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handlePress = (pokemon: PokemonDetails) => {
    navigation.navigate("PokemonDetailScreen", { pokemon });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 400) {
      if (!showBackToTop) setShowBackToTop(true);
    } else {
      if (showBackToTop) setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderFooter = () => {
    if (!loading || initialLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.footerText}>Loading more Pokémon...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (initialLoading) {
      return (
        <View style={styles.skeletonList}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      );
    }

    if (error && list.length === 0) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={COLORS.textMuted} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadMore}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader title="Pokédex" showLogo />

      {/* Stats Counter Row */}
      {!initialLoading && list.length > 0 && (
        <View style={styles.infoRow}>
          <Text style={styles.subtitle}>Browse the complete Pokémon collection</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{list.length} Loaded</Text>
          </View>
        </View>
      )}

      {initialLoading ? (
        renderEmpty()
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={list}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <PokemonCard
                name={item.name}
                url={item.url}
                onPress={handlePress}
              />
            )}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />

          {showBackToTop && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backToTopButton}
              onPress={scrollToTop}
            >
              <Ionicons name="arrow-up" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default PokemonListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  badge: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + "40",
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Make sure last card is fully visible above tab bar
  },
  footerLoader: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  backToTopButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  // Skeletons styles
  skeletonList: {
    padding: 16,
  },
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
  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    marginTop: 100,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  retryButtonText: {
    color: COLORS.background,
    fontWeight: "700",
    fontSize: 15,
  },
});
