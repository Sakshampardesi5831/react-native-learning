import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Magnetometer } from "expo-sensors";

const MagnetometerComponent = () => {
  const [direction, setDirection] = useState("Unknown");

  useEffect(() => {
    Magnetometer.setUpdateInterval(100);

    const sub = Magnetometer.addListener(({ x, y }) => {
      // Calculate heading angle in degrees from x and y coordinates (0 to 360)
      let heading = Math.atan2(y, x) * (180 / Math.PI);
      if (heading < 0) {
        heading += 360;
      }

      // Map heading to cardinal directions
      let cardDir = "Unknown";
      if (heading >= 315 || heading < 45) {
        cardDir = `North (${heading.toFixed(0)}°)`;
      } else if (heading >= 45 && heading < 135) {
        cardDir = `East (${heading.toFixed(0)}°)`;
      } else if (heading >= 135 && heading < 225) {
        cardDir = `South (${heading.toFixed(0)}°)`;
      } else if (heading >= 225 && heading < 315) {
        cardDir = `West (${heading.toFixed(0)}°)`;
      }

      setDirection(cardDir);
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Magnetometer Compass</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Facing Direction:</Text>
        <Text style={styles.statusValue}>{direction}</Text>
      </View>
    </View>
  );
};

export default MagnetometerComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    width: 290,
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
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 6,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF9500", // System orange color
    textAlign: "center",
  },
});
