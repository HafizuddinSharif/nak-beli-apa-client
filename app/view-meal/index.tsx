import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import PageTitle from "@/components/common/PageTitle";
import TabOption from "@/components/view-meal-page/TabOption";
import MealDetails from "@/components/view-meal-page/MealDetails";
import MealIngredients from "@/components/view-meal-page/MealIngredients";
import MealSteps from "@/components/view-meal-page/MealSteps";
import { useState } from "react";
import { OPTION } from "@/constants/add-new-meal";

export default function Index(): any {
  // set states
  const [optionInFocus, setOptionInFocus] = useState(OPTION.INGREDIENTS);

  const changeTab = (clickedOption: string): void =>
    setOptionInFocus(clickedOption);

  const goToEditMealPage = () =>
    console.log("Go to edit meal page: TO BE BUILT");
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
        <PageTitle title="Meal name" textAlign="center" />

        {/* Tab option */}
        <TabOption optionInFocus={optionInFocus} onTabChange={changeTab} />

        {/* Tab details */}
        {optionInFocus == OPTION.DETAILS && <MealDetails />}
        {optionInFocus == OPTION.INGREDIENTS && <MealIngredients />}
        {optionInFocus == OPTION.STEPS && <MealSteps />}
      </View>
    </SafeAreaView>
  );
}
