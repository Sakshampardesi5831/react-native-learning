import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PokemonDetailScreen from "../screens/PokemonDetailScreen";
import PokemonListScreen from "../screens/PokemonListScreen";
import { RootStackParamList } from "./types";
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStackDisplay = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#18181b" },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="PokemonDetailScreen"
        component={PokemonDetailScreen}
      />
    </Stack.Navigator>
  );
};

const ListStackDisplay = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#18181b" },
      }}
    >
      <Stack.Screen name="PokemonListScreen" component={PokemonListScreen} />
      <Stack.Screen
        name="PokemonDetailScreen"
        component={PokemonDetailScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#27272a",
            borderTopColor: "#3f3f3f",
            paddingTop: 5,
            paddingBottom: 5,
            height: 60,
          },
          tabBarActiveTintColor: "#34d399",
          tabBarInactiveTintColor: "#a1a1aa",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "home";
            if (route.name === "Explore") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Pokedex") {
              iconName = focused ? "list" : "list-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Explore" component={HomeStackDisplay} />
        <Tab.Screen name="Pokedex" component={ListStackDisplay} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
