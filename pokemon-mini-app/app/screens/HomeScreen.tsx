import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getPokemonByType,
  getPokemonList,
  PokemonDetails,
  PokemonRef,
} from "../api/pokemon";
import AppHeader from "../components/AppHeader";
import FilterChips from "../components/FilterChips";
import PokemonCard from "../components/PokemonCard";
import SearchInput from "../components/SearchInput";
import { COLORS } from "../constants/colors";
//import { ActivityIndicator } from "react-native/types_generated/index";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [masterList, setMasterList] = useState<PokemonRef[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const fetchData = async () => {
    console.log("Fetching Pokémon list started...", { selectedType });
    setLoading(true);
    setPage(1);
    try {
      if (selectedType) {
        const list = await getPokemonByType(selectedType);
        console.log(`Fetched ${list.length} Pokémon by type: ${selectedType}`);
        setMasterList(list);
      } else {
        const data = await getPokemonList(1000, 0);
        console.log(`Fetched ${data.results.length} total Pokémon`);
        setMasterList(data.results);
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = useMemo(() => {
    if (!searchText) return masterList;
    return masterList.filter((p) => p.name.includes(searchText.toLowerCase()));
  }, [masterList, searchText]);
  const displayList = useMemo(() => {
    return filteredList.slice(0, page * PAGE_SIZE);
  }, [filteredList, page]);

  const handleCardPress = (pokemon: PokemonDetails) => {
    //@ts-ignore
    navigation.navigate("PokemonDetailScreen", { pokemon });
  };

  const loadMore = () => {
    if (displayList.length < filteredList.length) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <AppHeader title={"PokeDex"} showLogo />
      <View style={styles.content}>
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Pokémon..."
          onClear={() => setSearchText("")}
          style={styles.searchBar}
        />
        <View style={styles.filterContainer}>
          <FilterChips
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
          {loading && page === 1 ? (
            <View style={styles.center}>
              <ActivityIndicator size={"large"} color={COLORS.primary} />
            </View>
          ) : (
            <FlatList
              data={displayList}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <PokemonCard
                  name={item.name}
                  url={item.url}
                  onPress={handleCardPress}
                />
              )}
              contentContainerStyle={styles.listContent}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    marginTop: 16,
    marginBottom: 8,
  },
  filterContainer: {
    flex: 1,
    marginHorizontal: -16,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
