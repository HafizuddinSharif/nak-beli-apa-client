import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { dummyMeals } from "@/dummy_data";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import PageTitle from "@/components/common/PageTitle";
import TabOption from "@/components/view-meal-page/TabOption";
import MealDetails from "@/components/view-meal-page/MealDetails";
import MealIngredients from "@/components/view-meal-page/MealIngredients";
import MealSteps from "@/components/view-meal-page/MealSteps";
import { useState } from "react";
import { OPTION } from "@/constants/add-new-meal";
import useMealListStore from "@/hooks/useMealListStore";

export default function ViewMealPage(): any {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { mealList } = useMealListStore();

  const [meal, setMeal] = useState(
    mealList.find((item) => item.id === params.id)
  );

  // set states
  const [optionInFocus, setOptionInFocus] = useState(OPTION.INGREDIENTS);

  const changeTab = (clickedOption: string): void =>
    setOptionInFocus(clickedOption);

  const goToEditMealPage = () => {
    console.log("Go to edit meal page: TO BE BUILT");

    router.push(`/edit-meal/${params.id}`);
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
          headerBackTitle: "Lihat semula menu",
          headerRight: () => (
            <TouchableOpacity onPress={goToEditMealPage}>
              <Ionicons name="create-outline" size={30} color={COLORS.black} />
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
        {/* Page title, should be dynamic based on the selected meal */}
        <PageTitle title={meal?.meal_name} textAlign="center" />

        {/* Tab option */}
        <TabOption optionInFocus={optionInFocus} onTabChange={changeTab} />

        {/* Tab details */}
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          {optionInFocus == OPTION.DETAILS && (
            <MealDetails details={meal?.description} />
          )}

          {optionInFocus == OPTION.INGREDIENTS && (
            <MealIngredients item_list={meal?.item_list} />
          )}
          {optionInFocus == OPTION.STEPS && (
            <MealSteps cooking_guide={meal?.cooking_guide} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
