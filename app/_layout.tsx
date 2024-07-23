import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDb } from "@/db/db";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="nakbeliapa2.db" onInit={initializeDb}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
