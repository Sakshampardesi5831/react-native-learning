import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { createTables } from "@/database/create-table";
import { Link } from "expo-router";

const OfflineApps = () => {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Offline Apps</Text>

        <Link href={"/user-list"} asChild>
          <Pressable style={({ pressed }) => [styles.linkButton, pressed && styles.buttonPressed]}>
            <Text style={styles.linkButtonText}>View User List ➔</Text>
          </Pressable>
        </Link>

        <Link href="/" asChild>
          <Pressable style={({ pressed }) => [styles.linkButton, styles.backButton, pressed && styles.buttonPressed]}>
            <Text style={[styles.linkButtonText, styles.backButtonText]}>➔ Back to Home</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default OfflineApps;

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
    marginBottom: 24,
    textAlign: "center",
  },
  linkButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#0071e3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 12,
  },
  linkButtonText: {
    color: "#0071e3",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  backButton: {
    borderColor: "#86868b",
  },
  backButtonText: {
    color: "#86868b",
  },
});
