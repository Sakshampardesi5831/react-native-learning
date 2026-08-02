import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const handleFetchData = async () => {
    const response = await fetch("/api/hello");
    const data = await response.json();
    console.log("data", data);
    alert(JSON.stringify(data));
  };

  // useEffect(()=>{
  //   handleFetchData();
  // },[])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
