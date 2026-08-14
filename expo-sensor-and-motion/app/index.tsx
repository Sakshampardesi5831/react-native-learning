import MagnetometerComponent from "@/components/maganto-meter";
import { View, StyleSheet, StatusBar } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      {/* <MagnetometerComponent /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
});
