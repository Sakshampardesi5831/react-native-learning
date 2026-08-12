import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { createUser } from "@/database/crud";
// import { createUser } from "@/database/crud";

const InsertUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleInsertUser = async () => {
    // TODO: Write code to insert the user into the database
    try {
      if (!name || !email) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      const id = await createUser(name, email);
      Alert.alert("Success", `User created successfully with ID: ${id}`);
      setName("");
      setEmail("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add New User</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Pressable
          onPress={handleInsertUser}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Save User</Text>
        </Pressable>

        <Link href="/user-list" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.linkButtonText}>➔ Back to User List</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default InsertUser;

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
});
