import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ExpoSecureStore from "expo-secure-store";
import { Link } from "expo-router";

const SecureStore = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [output, setOutput] = useState("");

  const log = (msg: string) =>
    setOutput((prev) => (prev ? prev + "\n" + msg : msg));
  const clear = () => setOutput("");

  const handleSubmit = async () => {
    clear();
    // TODO: Save userName and password to SecureStore using setItemAsync
    try {
      const canuseBiometric = ExpoSecureStore.canUseBiometricAuthentication();
      if (canuseBiometric) {
        await ExpoSecureStore.setItemAsync("username", userName, {
          requireAuthentication: true,
          authenticationPrompt: "Authentication to access your secret",
        });
        await ExpoSecureStore.setItemAsync("password", password, {
          requireAuthentication: true,
          authenticationPrompt: "Authentication to access your secret",
        });
      } else {
        await ExpoSecureStore.setItemAsync("username", userName);
        await ExpoSecureStore.setItemAsync("password", password);
      }

      Alert.alert("success", "credentials save securely");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLoad = async () => {
    clear();
    try {
      const savedusername = await ExpoSecureStore.getItemAsync("username");
      const savedPassword = await ExpoSecureStore.getItemAsync("password");
      log(`${savedusername} | ${savedPassword}`);
      Alert.alert("success", "loaded successdfully");
    } catch (error) {
      console.log("error", error);
    }
    // TODO: Get userName and password from SecureStore using getItemAsync and log them
  };

  const handleDelete = async () => {
    clear();
    try {
      const deleteUserName = await ExpoSecureStore.deleteItemAsync("username");
      const deletePassword = await ExpoSecureStore.deleteItemAsync("password");
      log("deleted sucessfully");
      Alert.alert("success", "removed successfully");
    } catch (error) {
      console.log("error", error);
    }
    // TODO: Delete userName and password from SecureStore using deleteItemAsync
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Secure Store Demo</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#888"
          value={userName}
          onChangeText={setuserName}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setpassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Submit / Save</Text>
        </Pressable>

        <Pressable
          onPress={handleLoad}
          style={({ pressed }) => [
            styles.button,
            styles.loadButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Load Credentials</Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.button,
            styles.removeButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Delete Credentials</Text>
        </Pressable>

        <View style={styles.outputContainer}>
          <Text style={styles.outputLabel}>Stored State:</Text>
          <Text style={styles.outputText}>
            {output || "No data loaded yet"}
          </Text>
        </View>

        <Link href="/" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.linkButtonText}>➔ Back to AsyncStorage</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default SecureStore;

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
    borderColor: "#86868b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  linkButtonText: {
    color: "#86868b",
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
