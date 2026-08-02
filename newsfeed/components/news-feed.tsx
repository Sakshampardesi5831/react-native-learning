import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { NewsArticle } from "@/types/news";
import { fetchTopHeadLines } from "@/services/newsApi";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "general", label: "General" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
];

const COUNTRIES = [
  { code: "us", label: "🇺🇸 US" },
  { code: "gb", label: "🇬🇧 UK" },
  { code: "in", label: "🇮🇳 IN" },
  { code: "ca", label: "🇨🇦 CA" },
  { code: "au", label: "🇦🇺 AU" },
];

const ArticleCard = ({ item }: { item: NewsArticle }) => {
  const handlePress = () => {
    if (item.url) {
      Linking.openURL(item.url).catch((err) =>
        console.error("Failed to open article URL:", err)
      );
    }
  };

  const formattedDate = new Date(item.publishedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>📰 No Image Available</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.sourceTag}>{item.source.name}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={3}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        {item.author && (
          <Text style={styles.authorText} numberOfLines={1}>
            By {item.author}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const NewsFeed = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("all");
  const [country, setCountry] = useState("us");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshMore, setRefreshMore] = useState(false);

  const loadNews = useCallback(
    async (pageNum: number = 1, reset: boolean = false) => {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        const response = await fetchTopHeadLines({
          page: pageNum,
          pageSize: 10,
          category: category === "all" ? undefined : category,
          country,
        });

        if (response.status === "error") {
          throw new Error((response as any).message || "API Error");
        }

        const cleanArticles = response.articles
          ? response.articles.filter(
              (art) =>
                art.title &&
                art.title !== "[Removed]" &&
                art.title.trim() !== ""
            )
          : [];

        if (reset) {
          setArticles(cleanArticles);
        } else {
          setArticles((prev) => [...prev, ...cleanArticles]);
        }

        const total = response.totalResults || 0;
        setHasMore(cleanArticles.length > 0 && pageNum * 10 < total);
        setPage(pageNum);
      } catch (err: any) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
        setRefreshMore(false);
        setLoadingMore(false);
      }
    },
    [category, country]
  );

  useEffect(() => {
    loadNews(1, true);
  }, [category, country]);

  const handleRefresh = useCallback(() => {
    setRefreshMore(true);
    setPage(1);
    setHasMore(true);
    loadNews(1, true);
  }, [loadNews]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      loadNews(page + 1, false);
    }
  }, [loadingMore, hasMore, loading, page, loadNews]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
    setHasMore(true);
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    setPage(1);
    setHasMore(true);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.FooterLoader}>
        <ActivityIndicator size={"small"} color={"#6366F1"} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Daily Pulse</Text>
          <Text style={styles.headerSubtitle}>
            Your daily dose of global headlines
          </Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleRefresh}
          disabled={loading || refreshMore}
          activeOpacity={0.7}
          accessibilityLabel="Refresh news feed"
          accessibilityRole="button"
        >
          {loading || refreshMore ? (
            <ActivityIndicator size="small" color="#6366F1" />
          ) : (
            <Ionicons name="refresh" size={22} color="#4B5563" />
          )}
        </TouchableOpacity>
      </View>

      {/* Country Selector */}
      <View style={styles.selectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorScroll}
        >
          {COUNTRIES.map((item) => (
            <TouchableOpacity
              key={item.code}
              style={[
                styles.countryChip,
                country === item.code && styles.activeCountryChip,
              ]}
              onPress={() => handleCountryChange(item.code)}
            >
              <Text
                style={[
                  styles.countryText,
                  country === item.code && styles.activeCountryText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Category Selector */}
      <View style={styles.selectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorScroll}
        >
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryChip,
                category === item.id && styles.activeCategoryChip,
              ]}
              onPress={() => handleCategoryChange(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item.id && styles.activeCategoryText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      {loading && articles.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
        </View>
      ) : error && articles.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${item.url || index}-${index}`}
          renderItem={({ item }) => <ArticleCard item={item} />}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshMore}
              onRefresh={handleRefresh}
              colors={["#6366F1"]}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No articles found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  selectorContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  selectorScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  activeCategoryChip: {
    backgroundColor: "#6366F1",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  countryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeCountryChip: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  countryText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4B5563",
  },
  activeCountryText: {
    color: "#FFFFFF",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  placeholderImage: {
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "500",
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sourceTag: {
    backgroundColor: "#EEF2F6",
    color: "#4F46E5",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 22,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
    marginBottom: 8,
  },
  authorText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
    color: "#6B7280",
  },
  FooterLoader: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
