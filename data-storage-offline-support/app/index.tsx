import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Link } from "expo-router";

export default function Index() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const log = (msg: string) =>
    setOutput((prev) => (prev ? prev + "\n" + msg : msg));
  const clear = () => setOutput("");

  const example1 = async () => {
    clear();
    // TODO: Save input value to AsyncStorage with key "username"
  };

  const example2 = async () => {
    clear();
    // TODO: Retrieve value from AsyncStorage with key "username" and log it
  };

  // remove item
  const example3 = async () => {
    clear();
    // TODO: Remove value from AsyncStorage with key "username" and log completion
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Offline Storage Demo</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter text here..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />

        <Pressable
          onPress={example1}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Save Value</Text>
        </Pressable>

        <Pressable
          onPress={example2}
          style={({ pressed }) => [
            styles.button,
            styles.loadButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Load Value</Text>
        </Pressable>

        <Pressable
          onPress={example3}
          style={({ pressed }) => [
            styles.button,
            styles.removeButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Remove Value</Text>
        </Pressable>

        <View style={styles.outputContainer}>
          <Text style={styles.outputLabel}>Stored State:</Text>
          <Text style={styles.outputText}>
            {output || "No data stored yet"}
          </Text>
        </View>
        <Link href={"/secure-store"} asChild>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.linkButtonText}>Secure Store Demo ➔</Text>
          </Pressable>
        </Link>
        <Link href={"/offline-apps"} asChild>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.linkButtonText}>Offline Store Demo ➔</Text>
          </Pressable>
        </Link>
        <Link href={"/file-system"} asChild>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.linkButtonText}>File System Demo ➔</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1d1d1f",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e5e5ea",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1d1d1f",
    backgroundColor: "#fafafa",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#0071e3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  loadButton: {
    backgroundColor: "#34c759",
  },
  removeButton: {
    backgroundColor: "#ff3b30",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
    height: 48,
    borderWidth: 1,
    borderColor: "#0071e3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  linkButtonText: {
    color: "#0071e3",
    fontSize: 16,
    fontWeight: "600",
  },
  outputContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f2f2f7",
  },
  outputLabel: {
    fontSize: 14,
    color: "#86868b",
    marginBottom: 6,
    fontWeight: "500",
  },
  outputText: {
    fontSize: 16,
    color: "#1d1d1f",
    fontWeight: "600",
    backgroundColor: "#f5f5f7",
    padding: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
});
