import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PageTitle from "@/components/common/PageTitle";
import ChecklistItem from "@/components/checklist-page/ChecklistItem";
import useContentStore from "@/hooks/useContentStore";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import useBasketStore from "@/hooks/useBasketStore";
import useChecklistStore from "@/hooks/useChecklistStore";

export default function Index() {
  const { fetchItemOptions, fetchUnitOptions } = useContentStore();
  const { fetchSelectedMeals } = useBasketStore();
  const { checklist } = useChecklistStore();

  // Get all the needed contents
  useEffect(() => {
    fetchItemOptions();
    fetchUnitOptions();
    fetchSelectedMeals();
  }, []);

  const router = useRouter();

  const [groceryList, setGroceryList] = useState(checklist);

  const handlePress = () => {
    router.push(`/select-meal`);
  };

  const handleToggle = (item: GroceryItem, isChecked: boolean) => {
    item.hasBought = isChecked;
    setGroceryList(
      groceryList.map((g) => {
        if (g.id === item.id) {
          return item;
        } else {
          return g;
        }
      })
    );
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
            <TouchableOpacity
              onPress={handlePress}
              style={{ paddingRight: 20 }}
            >
              <Entypo name="add-to-list" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      {/* Page title */}
      <PageTitle title="Senarai bahan untuk dibeli" />

      {/* List of checklist item */}
      <FlatList
        data={groceryList}
        renderItem={({ item }: { item: GroceryItem }) => (
          <ChecklistItem handleToggle={handleToggle} item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
