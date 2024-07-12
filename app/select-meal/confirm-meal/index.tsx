import PageTitle from "@/components/common/PageTitle";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import MealItem from "@/components/meals-page/MealItem";
import { COLORS } from "@/constants";
import useBasketStore from "@/hooks/useBasketStore";
import useChecklistStore from "@/hooks/useChecklistStore";
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
  const { generateChecklist } = useChecklistStore();
  const { selectedMeals, numOfSelectedMeals, addMeal, removeMeal } =
    useBasketStore();
  const router = useRouter();

  const goToViewMealPage = (mealId: string) =>
    router.push(`/view-meal/${mealId}`);

  const handleAdd = (newMeal: MealSelection) => {
    addMeal(newMeal);
  };

  const handleRemove = (mealId: number) => {
    removeMeal(mealId);
  };

  const handleConfirmSelection = () => {
    console.log("Generating checklist item...");
    generateChecklist(selectedMeals);
    router.push("/");
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
        <PrimaryBtn title={"Pilih ini"} handlePress={handleConfirmSelection} />
      </View>
    </SafeAreaView>
  );
}
