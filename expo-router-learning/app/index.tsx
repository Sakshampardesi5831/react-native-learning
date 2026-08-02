import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/feed"}>Feed</Link>
      <Link href={"/post/1223484154851"}>Post Id Page</Link>
      <Link href={"/admin/user/logs"}>GO TO LOGS</Link>
    </View>
  );
}
