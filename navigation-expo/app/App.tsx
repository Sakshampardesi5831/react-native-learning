import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Details from "./screens/details";
import Home from "./screens/home";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home}></Tab.Screen>
      <Tab.Screen name="details" component={Details}></Tab.Screen>
    </Tab.Navigator>
  );
}
export default function App() {
  return <TabNavigator />;
}
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Details from "./screens/details";
// import Home from "./screens/home";

// const Stack = createNativeStackNavigator();

// function RootStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="home" component={Home} />
//       <Stack.Screen name="details" component={Details} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return <RootStack />;
// }
