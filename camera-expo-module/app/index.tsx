import React, { useState } from "react";
import CameraScreen from "@/components/camera-screen";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [isCameraOpen, setIsCameraOpen] = useState(true);

  if (isCameraOpen) {
    return <CameraScreen onClose={() => setIsCameraOpen(false)} />;
  }

  return (
    <View style={styles.container}>
      <Ionicons name="camera-outline" size={80} color="#2196F3" style={styles.icon} />
      <Text style={styles.title}>Welcome to Camera App</Text>
      <Text style={styles.subtitle}>Click the button below to start taking photos</Text>
      <TouchableOpacity style={styles.button} onPress={() => setIsCameraOpen(true)}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 24,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#888888",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

