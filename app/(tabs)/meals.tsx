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

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    setSearchInput(e);
  };

  const goToViewMealPage = (mealId: string) =>
    router.push(`/view-meal/${mealId}`);

  const goToAddNewMealPage = () => router.push(`/edit-meal/new`);

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

      {mealList.length == 0 && (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            paddingBottom: 100,
          }}
        >
          <Text
            style={{ textAlign: "center", color: COLORS.gray2, fontSize: 16 }}
          >
            Senarai masakan kosong. Boleh tambah baru
          </Text>
        </View>
      )}

      {/* Search bar */}
      {mealList.length > 0 && (
        <SearchBar value={searchInput} handleChange={handleChange} />
      )}

      {/* List of meals */}
      {mealList.length > 0 && (
        <FlatList
          data={mealList}
          renderItem={({ index, item }) => {
            return <MealItem handlePress={goToViewMealPage} item={item} />;
          }}
          numColumns={2}
          columnWrapperStyle={{ columnGap: 10 }}
          keyExtractor={({ id }: MealSelection) => id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        />
      )}
    </SafeAreaView>
  );
}
