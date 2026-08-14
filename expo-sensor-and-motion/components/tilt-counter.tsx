import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";

const TiltCounter = () => {
  const [tilt, setTilt] = useState("Stable");

  useEffect(() => {
    const sub = Accelerometer.addListener(({ x, y }) => {
      if (Math.abs(x) > 0.4) {
        setTilt(x > 0 ? "Tilt Right" : "Tilt Left");
      } else if (Math.abs(y) > 0.4) {
        setTilt(y > 0 ? "Tilt Forward" : "Tilt Backward");
      } else {
        setTilt("Stable");
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tilt Counter</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Current State:</Text>
        <Text style={styles.statusValue}>{tilt}</Text>
      </View>
    </View>
  );
};

export default TiltCounter;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    width: 280,
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 16,
    color: "#666666",
    marginRight: 8,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF", // System blue color
  },
});
