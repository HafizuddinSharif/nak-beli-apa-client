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

export default function Index() {
  const { fetchItemOptions, fetchUnitOptions } = useContentStore();

  // Get all the needed contents
  useEffect(() => {
    fetchItemOptions();
    fetchUnitOptions();
  }, []);

  const router = useRouter();
  const dummyGroceryList: GroceryItem[] = [
    {
      id: 1,
      item_name: "Red Onion",
      quantity: 2,
      unit: "piece(s)",
      hasBought: false,
    },
    {
      id: 2,
      item_name: "Banana",
      quantity: 6,
      unit: "piece(s)",
      hasBought: false,
    },
    {
      id: 3,
      item_name: "Milk",
      quantity: 1,
      unit: "liter(s)",
      hasBought: false,
    },
    { id: 4, item_name: "Bread", quantity: 1, unit: "loaf", hasBought: false },
    {
      id: 5,
      item_name: "Eggs",
      quantity: 12,
      unit: "piece(s)",
      hasBought: true,
    },
    {
      id: 6,
      item_name: "Chicken Breast",
      quantity: 1,
      unit: "kg",
      hasBought: false,
    },
    {
      id: 7,
      item_name: "Tomatoes",
      quantity: 5,
      unit: "piece(s)",
      hasBought: true,
    },
    {
      id: 8,
      item_name: "Cucumber",
      quantity: 2,
      unit: "piece(s)",
      hasBought: false,
    },
    {
      id: 9,
      item_name: "Cheddar Cheese",
      quantity: 200,
      unit: "gram(s)",
      hasBought: true,
    },
    {
      id: 10,
      item_name: "Olive Oil",
      quantity: 500,
      unit: "ml",
      hasBought: false,
    },
  ];

  const [groceryList, setGroceryList] = useState(dummyGroceryList);

  const handlePress = () => {
    router.push(`/select-meal`);
  };

  const handleToggle = (item: GroceryItem, isChecked: boolean) => {
    item.hasBought = isChecked;
    console.log(`Found this guy ${item.id} ${item.item_name}`);
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
        renderItem={({ item }) => (
          <ChecklistItem handleToggle={handleToggle} item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
