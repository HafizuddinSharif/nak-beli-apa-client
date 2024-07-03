import ScreenHeaderBtn from "@/components/header/header/ScreenHeaderBtn";
import icons from "@/constants/icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SIZES } from "@/constants"

export default function Index() {

  const router = useRouter();
  const dummyGroceryList: GroceryItem[] = [
    {id: 1, item_name: "Red Onion", quantity: 2, unit: "piece(s)", hasBought: false},
    {id: 2, item_name: "Banana", quantity: 6, unit: "piece(s)", hasBought: false},
    {id: 3, item_name: "Milk", quantity: 1, unit: "liter(s)", hasBought: false},
    {id: 4, item_name: "Bread", quantity: 1, unit: "loaf", hasBought: false},
    {id: 5, item_name: "Eggs", quantity: 12, unit: "piece(s)", hasBought: true},
    {id: 6, item_name: "Chicken Breast", quantity: 1, unit: "kg", hasBought: false},
    {id: 7, item_name: "Tomatoes", quantity: 5, unit: "piece(s)", hasBought: true},
    {id: 8, item_name: "Cucumber", quantity: 2, unit: "piece(s)", hasBought: false},
    {id: 9, item_name: "Cheddar Cheese", quantity: 200, unit: "gram(s)", hasBought: true},
    {id: 10, item_name: "Olive Oil", quantity: 500, unit: "ml", hasBought: false}
  ];
  
  const [groceryList, setGroceryList] = useState(dummyGroceryList);

  const handlePress = () => {
    router.push(`/add-new-meal`)
  }

  const handleToggle = (item: GroceryItem, isChecked: boolean) => {
    item.hasBought = isChecked;
    console.log(`Found this guy ${item.id} ${item.item_name}`)
    setGroceryList(groceryList.map( g => {
      if (g.id === item.id) {
        return item
      } else {
        return g
      }
  }));
  }

  return (

    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: "#FFF"
    }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: '#FFF'},
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Text style={{ marginBottom: 20, fontSize: SIZES.xLarge, fontWeight: 700}}>Senarai bahan untuk dibeli</Text>
      <FlatList 
        data={groceryList}
        renderItem={({ item }) => (
          <View
            style= {{
              flex: 1,
              flexDirection: "row",
              paddingBottom: 15,
            }}
          >
            <BouncyCheckbox onPress={(isChecked: boolean) => handleToggle(item, isChecked)} isChecked={item.hasBought}/>
            <Text>{`${item.quantity} ${item.unit} of ${item.item_name} `}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>

    
  );
}
