import PageTitle from "@/components/common/PageTitle";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import MealItem from "@/components/meals-page/MealItem";
import { COLORS } from "@/constants";
import useBasketStore from "@/hooks/useBasketStore";
import useMealListStore from "@/hooks/useMealListStore";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
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
        <PageTitle title="Pastikan pilihan masakan" />

        {/* List of meals */}
        <FlatList
          data={selectedMeals}
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
        <PrimaryBtn title={"Pilih ini"} handlePress={() => null} />
      </View>
    </SafeAreaView>
  );
}
