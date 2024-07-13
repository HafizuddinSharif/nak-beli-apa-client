import AddNewIngredient from "@/components/add-new-meal-page/AddNewIngredient";
import AddNewIngredientBtn from "@/components/add-new-meal-page/AddNewIngredientBtn";
import BackModal from "@/components/common/BackModal";
import PageSubHeading from "@/components/common/PageSubHeading";
import PageTitle from "@/components/common/PageTitle";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { COLORS, TEXT } from "@/constants";
import {
  dummyAddNewItemForMeal,
  dummyAddNewMeal,
  dummyMeals,
} from "@/dummy_data";
import useMealListStore from "@/hooks/useMealListStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function EditMealPage() {
  const params = useLocalSearchParams();
  const { mealList, addNewMeal } = useMealListStore();
  const [meal, setMeal] = useState(
    params.id !== "new"
      ? dummyMeals.find((item) => item.id === params.id)
      : dummyAddNewMeal
  );

  const [currCount, setCurrCount] = useState(meal?.item_list.length);
  const [menuName, setMenuName] = useState(meal?.meal_name);
  const [ingredientList, setIngredientList] = useState(
    meal.item_list.length > 0
      ? meal.item_list
      : [dummyAddNewItemForMeal(meal?.id, currCount)]
  );
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const onAddNew = () => {
    setCurrCount((prev) => prev + 1);
    const newEntry = dummyAddNewItemForMeal(meal.id, currCount + 1);
    setIngredientList((prev) => {
      if (!prev) {
        return [newEntry];
      }
      const newPush = [...prev];
      newPush.push(newEntry);
      return newPush;
    });
  };

  const onEditItem = (editItem: ItemForMeal) => {
    setIngredientList((prev) => {
      const newList = [...prev];
      const toEdit = newList.find((item) => item.id == editItem.id);
      toEdit.item_selection_id = editItem.item_selection_id;
      toEdit.quantity = editItem.quantity;
      toEdit.unit = editItem.unit;
      return newList;
    });
  };

  const onRemoveItem = (id: string) => {
    setIngredientList((prev) => {
      const updatedList = [...prev];
      return updatedList.filter((item) => item.id !== id);
    });
  };

  const onSaveMeal = () => {
    const newMeal = {
      id: `meal-${mealList.length + 1}`,
      meal_name: menuName,
      description: "A new meal description",
      item_list: ingredientList,
      cooking_guide: `This is the guide for ${menuName}`,
    } as MealSelection;

    addNewMeal(newMeal);
    router.push(`/meals`);
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
          headerBackTitle: "Balik ke menu",
          headerLeft: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                name="arrow-back"
                size={30}
                color="black"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={onSaveMeal}>
              <Ionicons
                name="save-outline"
                size={30}
                color={COLORS.primary}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <BackModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        router={router}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          paddingHorizontal: 30,
        }}
      >
        {/* Page title */}
        <PageTitle title={TEXT.ADD_NEW_MEAL.TITLE.BM} />

        {/* Menu name input */}
        <TextInput
          value={menuName}
          onChangeText={(text) => setMenuName(text)}
          placeholder={TEXT.ADD_NEW_MEAL.MENU_NAME_PLACEHOLDER.BM}
          placeholderTextColor={COLORS.gray2}
          style={{
            borderBottomColor: COLORS.orange,
            width: "100%",
            borderBottomWidth: 2,
            textAlign: "center",
            paddingVertical: 5,
            marginBottom: 20,
            fontSize: 20,
          }}
        />

        <PageSubHeading
          title={TEXT.ADD_NEW_MEAL.ADD_INGREDIENT_SUBHEADING.BM}
        />

        {/* List to add ingredients */}
        <View style={{ maxHeight: 500 }}>
          <FlatList
            data={ingredientList}
            renderItem={({ item }) => {
              const { id } = item;
              return (
                <AddNewIngredient
                  item={item}
                  handlePress={() => onRemoveItem(id)}
                  handleChange={onEditItem}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={{ height: 7 }}></View>}
            keyExtractor={(item) => item.id}
          />
        </View>

        <AddNewIngredientBtn handlePress={onAddNew} />
      </View>
    </SafeAreaView>
  );
}
