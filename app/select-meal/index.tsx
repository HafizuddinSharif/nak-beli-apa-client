import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import MealItem from "@/components/meals-page/MealItem";
import { COLORS, SIZES } from "@/constants";
import useBasketStore from "@/hooks/useBasketStore";
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

export default function Index() {
  const { mealList, addNewMeal } = useMealListStore();
  const { selectedMeals, numOfSelectedMeals, addMeal, removeMeal } =
    useBasketStore();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    setSearchInput(e);
  };

  const goToViewMealPage = (mealId: string) =>
    router.push(`/view-meal/${mealId}`);

  const goToAddNewMealPage = () => console.log("Do nothing");

  const handleAdd = (newMeal: MealSelection) => {
    addMeal(newMeal);
  };

  const handleRemove = (mealId: number) => {
    removeMeal(mealId);
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
            <TouchableOpacity onPress={goToAddNewMealPage}>
              <Ionicons
                size={35}
                name="basket"
                color={COLORS.primary}
                style={{ paddingRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          paddingHorizontal: 30,
        }}
      >
        {/* Page title */}
        <PageTitle title="Pilih masakan" />

        {/* Search bar */}
        <SearchBar value={searchInput} handleChange={handleChange} />

        {/* List of meals */}
        <FlatList
          data={mealList}
          renderItem={({ index, item }) => {
            const { meal_name, id } = item as MealSelection;
            return (
              <MealItem
                id={id}
                title={meal_name}
                handlePress={goToViewMealPage}
                item={item}
                selectedMeals={selectedMeals}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
              />
            );
          }}
          numColumns={2}
          columnWrapperStyle={{ columnGap: 10 }}
          keyExtractor={({ id }: MealSelection) => id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        />
      </View>
    </SafeAreaView>
  );
}