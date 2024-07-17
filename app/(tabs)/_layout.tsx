import { COLORS } from "@/constants";
import { initializeDb } from "@/db/db";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function TabLayout() {
  return (
    <SQLiteProvider databaseName="nakbeliapa2.db" onInit={initializeDb}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.white,
          tabBarStyle: { backgroundColor: COLORS.primary },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="meals"
          options={{
            title: "Meals",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="list" color={color} />
            ),
          }}
        />
      </Tabs>
    </SQLiteProvider>
  );
}
