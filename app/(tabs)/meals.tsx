import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import MealItem from "@/components/meals-page/MealItem";
import { COLORS, SIZES } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Meals() {

  const dummyMeals = ["Ikan masak merah", "Nasi Lemak", "Ayam masak lemak cili api", "Kentang goreng"]
  const [mealList, setMealList] = useState(dummyMeals);

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    setSearchInput(e)
  }

  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: "#FFF",
      paddingHorizontal: 30
    }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: '#FFF'},
          headerShadowVisible: false,
          headerTitle: ""
        }}
      />
        {/* Page title */}
        <PageTitle title="Lihat menu"/>

        {/* Search bar */}
        <SearchBar value={searchInput} handleChange={handleChange}/>
        
        {/* List of meals */}
        <FlatList 
          data={mealList}
          renderItem={({item}) => (
            <MealItem title={item}/>
          )}
          numColumns={2}
          columnWrapperStyle={{ columnGap: 10}}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10 }}></View>
          )}
        />
      
    </SafeAreaView>
  );
}