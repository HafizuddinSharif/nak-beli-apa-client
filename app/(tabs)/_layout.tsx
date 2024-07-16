import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

const initializeDb = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS units (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unit VARCHAR(15)
      );
    `);
    console.log("Database created");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

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
