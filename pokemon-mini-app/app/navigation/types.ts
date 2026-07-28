import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  PokemonListScreen: undefined;
  PokemonDetailScreen: { pokemon: any }; // fix this later
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;
export type PokemonListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PokemonListScreen"
>;
export type PokemonDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "PokemonDetailScreen"
>;

