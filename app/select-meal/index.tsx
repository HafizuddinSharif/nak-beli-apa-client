import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import MealItem from "@/components/meals-page/MealItem";
import { COLORS } from "@/constants";
import useBasketStore from "@/hooks/useBasketStore";
import useMealListStore from "@/hooks/useMealListStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";

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

  const goToConfirmMealPage = () => {
    if (selectedMeals.length > 0) {
      router.navigate("/select-meal/confirm-meal");
    }
  };

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
            <TouchableOpacity onPress={goToConfirmMealPage}>
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
            return (
              <MealItem
                handlePress={goToViewMealPage}
                item={item}
                selectedMeals={selectedMeals}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                isFor={"select"}
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
