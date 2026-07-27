import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
});
