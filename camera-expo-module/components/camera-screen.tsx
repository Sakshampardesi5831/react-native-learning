import React, { useState, useRef } from "react";
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

interface CameraScreenProps {
  onClose?: () => void;
}

const CameraScreen = ({ onClose }: CameraScreenProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const presets = [
    { label: "1x", value: 0.0 },
    { label: "2x", value: 0.25 },
    { label: "5x", value: 1.0 },
  ];

  // 1. Show message while camera permissions are loading
  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.infoText}>Loading camera...</Text>
      </View>
    );
  }

  // 2. Show request permissions screen if access is not granted
  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons
          name="camera-outline"
          size={64}
          color="#666666"
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.infoText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Helper toggles for camera parameters
  const toggleFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  };

  async function takePhoto() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
        });
        if (photo && photo.uri) {
          setPhotoUri(photo.uri);
          console.log("Photo taken:", photo.uri);
        }
      } catch (error) {
        console.error("Failed to take photo:", error);
      }
    }
  }

  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.previewImage} />

        {/* Top Control Bar for Preview */}
        <View style={styles.previewTopBar}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => setPhotoUri(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.previewTitle}>Photo Preview</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Bottom Actions for Preview */}
        <View style={styles.previewBottomBar}>
          <TouchableOpacity
            style={styles.previewButtonSecondary}
            onPress={() => setPhotoUri(null)}
          >
            <Text style={styles.previewButtonTextSecondary}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.previewButtonPrimary}
            onPress={() => {
              console.log("Photo accepted:", photoUri);
              if (onClose) onClose();
            }}
          >
            <Text style={styles.previewButtonTextPrimary}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flash}
        zoom={zoom}
        ref={cameraRef}
      >
        {/* Top Control Bar (Close and Flash Settings) */}
        <View style={styles.topBar}>
          {/* Close Camera Button */}
          <TouchableOpacity style={styles.circleButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Flash Button */}
          <TouchableOpacity style={styles.circleButton} onPress={toggleFlash}>
            <Ionicons
              name={flash === "on" ? "flash" : "flash-off"}
              size={22}
              color={flash === "on" ? "#FFC107" : "#ffffff"}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Container holding Zoom Control and Bottom Bar */}
        <View style={styles.bottomControlsContainer}>
          {/* Zoom Controller */}
          <View style={styles.zoomContainer}>
            {/* Preset Pills */}
            <View style={styles.presetsRow}>
              {presets.map((preset) => {
                const isActive = Math.abs(zoom - preset.value) < 0.05;
                return (
                  <TouchableOpacity
                    key={preset.label}
                    style={[
                      styles.presetPill,
                      isActive && styles.presetPillActive,
                    ]}
                    onPress={() => setZoom(preset.value)}
                  >
                    <Text
                      style={[
                        styles.presetText,
                        isActive && styles.presetTextActive,
                      ]}
                    >
                      {preset.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Slider */}
            <View style={styles.sliderRow}>
              <Ionicons name="remove" size={20} color="#ffffff" />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={zoom}
                onValueChange={setZoom}
                minimumTrackTintColor="#ffffff"
                maximumTrackTintColor="rgba(255, 255, 255, 0.4)"
                thumbTintColor="#ffffff"
              />
              <Ionicons name="add" size={20} color="#ffffff" />
            </View>
          </View>

          {/* Bottom Control Bar (Thumbnail, Shutter, Flip Camera) */}
          <View style={styles.bottomBar}>
            {/* Gallery / Recent Photo Placeholder */}
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.thumbnail} />
            ) : (
              <View style={styles.thumbnail} />
            )}

            {/* Shutter Capture Button */}
            <TouchableOpacity
              style={styles.shutterButton}
              activeOpacity={0.8}
              onPress={takePhoto}
            >
              <View style={styles.shutterInner} />
            </TouchableOpacity>

            {/* Flip Camera Type Button */}
            <TouchableOpacity
              style={styles.circleButton}
              onPress={toggleFacing}
            >
              <Ionicons
                name="camera-reverse-outline"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 24,
  },
  infoText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between", // Pushes Top Bar and Bottom Bar to top & bottom edges
  },
  topBar: {
    paddingTop: 50, // Space for status bar / notch
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between", // Close button on left, Flash button on right
  },
  bottomControlsContainer: {
    width: "100%",
    paddingBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // slight backdrop shadow for readability
  },
  zoomContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  presetsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 12,
  },
  presetPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  presetPillActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  presetText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  presetTextActive: {
    color: "#000000",
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    gap: 10,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 40, // Space for home indicator bar
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333333",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ffffff",
  },
  previewImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  previewTopBar: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 10,
  },
  previewTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  previewBottomBar: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 40,
    zIndex: 10,
  },
  previewButtonPrimary: {
    flex: 1,
    height: 52,
    backgroundColor: "#ffffff",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  previewButtonTextPrimary: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewButtonSecondary: {
    flex: 1,
    height: 52,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewButtonTextSecondary: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
