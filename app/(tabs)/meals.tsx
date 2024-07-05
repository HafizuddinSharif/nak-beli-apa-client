import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import MealItem from "@/components/meals-page/MealItem";
import { COLORS, SIZES } from "@/constants";
import useMealListStore from "@/hooks/useMealListStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Meals() {
  const { mealList, addNewMeal } = useMealListStore();

  const router = useRouter();

  // const [mealList, setMealList] = useState(dummyMeals);

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    setSearchInput(e);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 30,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFF" },
          headerShadowVisible: false,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push(`/add-new-meal`)}>
              <Ionicons
                size={35}
                name="add"
                color={COLORS.primary}
                style={{ paddingRight: 25 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* Page title */}
      <PageTitle title="Lihat menu" />

      {/* Search bar */}
      <SearchBar value={searchInput} handleChange={handleChange} />

      {/* List of meals */}
      <FlatList
        data={mealList}
        renderItem={({ item }) => (
          <MealItem title={item} handlePress={addNewMeal} />
        )}
        numColumns={2}
        columnWrapperStyle={{ columnGap: 10 }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
      />
    </SafeAreaView>
  );
}
