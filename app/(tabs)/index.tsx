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
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";
import { DB } from "@/db/db";
import useMealListStore from "@/hooks/useMealListStore";

export default function Index() {
  const {
    fetchItemOptions,
    fetchUnitOptions,
    fetchUnitList,
    fetchItemList,
    itemList,
  } = useContentStore();
  const { fetchSelectedMeals } = useBasketStore();
  const { checklist } = useChecklistStore();
  const { fetchMealList } = useMealListStore();
  const db = useSQLiteContext();

  // Get all the needed contents
  useEffect(() => {
    fetchSelectedMeals();

    DB.getAllUnitTables(db).then((item) => {
      fetchUnitList(item);
      fetchUnitOptions(item);

      DB.getAllItemSelectionTable(db).then((itemSelections) => {
        fetchItemList(itemSelections);
        fetchItemOptions(itemSelections);

        DB.getAllMealSelectionTable(db, itemList).then((mealSelections) => {
          fetchMealList(mealSelections);
        });
      });
    });
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

  const runScript = () => {
    // DB.runDBScript(db);
    // DB.getAllMealSelectionTable(db, itemList);
    // DB.getAllUnitTables(db).then((item) => {
    //   fetchUnitList(item);
    //   fetchUnitOptions(item);
    // });
    // DB.getAllItemSelectionTable(db).then((item) => {
    //   fetchItemList(item);
    // });
  };

  const EmptyChecklistRender = () => {
    return (
      <View style={{ margin: "auto" }}>
        <Ionicons
          name="alert-circle-outline"
          size={40}
          style={{ margin: "auto" }}
          color={COLORS.gray2}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: COLORS.gray2,
            marginTop: 15,
          }}
        >
          {
            "Nampaknya senarai awak kosong, boleh klik butang di hujung kanan untuk buat senarai baru"
          }
        </Text>
      </View>
    );
  };

  const ExistChecklistRender = () => {
    return (
      <View>
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
      </View>
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

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.green,
          padding: 10,
          shadowOffset: { width: 2, height: 2 },
        }}
        onPress={runScript}
      >
        <Text style={{ color: COLORS.white }}>Run SQL Script</Text>
      </TouchableOpacity>

      {groceryList.length == 0 && <EmptyChecklistRender />}
      {groceryList.length > 0 && <ExistChecklistRender />}
    </SafeAreaView>
  );
}
