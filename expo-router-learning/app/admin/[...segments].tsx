import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Segments = () => {
  const { segments } = useLocalSearchParams<{ segments: string[] }>();
  const pathDisplay = segments.join("/");
  return (
    <View>
      <Text>Admin Path</Text>
      <Text>{pathDisplay || "admin"}</Text>
    </View>
  );
};

export default Segments;

const styles = StyleSheet.create({});
