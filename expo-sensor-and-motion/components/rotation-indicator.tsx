import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Gyroscope } from "expo-sensors";

const RotationIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Rotate your device!");

  useEffect(() => {
    // Gyroscope updates every 100ms (0.1 seconds)
    Gyroscope.setUpdateInterval(100);

    const sub = Gyroscope.addListener(({ x, y, z }) => {
      const rotationAmount = Math.abs(z) * 2;
      setProgress((prev) => {
        const next = prev + rotationAmount;
        return next > 100 ? 100 : next;
      });

      // Calculate rotation rate magnitude in 3D space (radians per second)
      //   const rotationSpeed = Math.sqrt(x * x + y * y + z * z);

      //   // Only count rotation if it exceeds a small threshold to ignore noise
      //   if (rotationSpeed > 0.5) {
      //     setMessage("Rotating...");

      //     setProgress((prevProgress) => {
      //       // 0.1 seconds time step
      //       // Let's say a total accumulated rotation of 10 radians fills the progress bar (100%)
      //       const targetRotation = 10;
      //       const increment = (rotationSpeed * 0.1 / targetRotation) * 100;

      //       const nextProgress = prevProgress + increment;
      //       if (nextProgress >= 100) {
      //         setMessage("Completed! 🎉");
      //         return 100;
      //       }
      //       return nextProgress;
      //     });
      //   } else {
      //     if (progress < 100) {
      //       setMessage("Rotate your device!");
      //     }
      //   }
    });

    return () => sub.remove();
  }, [progress]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Rotation Progress</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>{message}</Text>

        {/* Progress Bar Track */}
        <View style={styles.progressBarTrack}>
          {/* Progress Bar Fill */}
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.progressValue}>{progress.toFixed(0)}%</Text>
      </View>

      {/* Reset Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setProgress(0);
          setMessage("Rotate your device!");
        }}
      >
        <Text style={styles.buttonText}>Reset Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RotationIndicator;

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
    marginBottom: 20,
  },
  statusContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
    marginBottom: 12,
  },
  progressBarTrack: {
    width: "100%",
    height: 12,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#34C759", // Green progress fill
    borderRadius: 6,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
