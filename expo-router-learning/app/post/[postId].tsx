import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const PostIdScreen = () => {
  const { postId } = useLocalSearchParams();
  console.log(postId);
  return (
    <View>
      <Text>Post Id :- {postId}</Text>
    </View>
  );
};

export default PostIdScreen;

const styles = StyleSheet.create({});
