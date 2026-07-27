import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
const Home = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Text>Home</Text>
      {/* <Link screen={"details"}>go to details</Link> */}
      <Pressable
        onPress={() =>
          navigation.navigate("details", {
            itemId: 42,
            otherParams: "Heloo from saksham",
          })
        }
      >
        <Text>Go to Details</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
