import { Tabs } from "expo-router";
import FontAwsome from "@expo/vector-icons/FontAwesome"
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon:()=><FontAwsome
            name="home"
            size={24}
          />
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: "Feed",
          tabBarIcon:()=><FontAwsome
            name="user"
            size={24}
          />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon:()=><FontAwsome
            name="list"
            size={24}
          />
        }}
      />
    </Tabs>
  );
}
