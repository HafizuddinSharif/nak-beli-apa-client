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
      backgroundColor: "#FFF"
    }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: '#FFF'},
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      
      <View style={{ justifyContent: "center", alignItems: "center"}}>
      <Text style={{ width: "80%", marginVertical: 20, textAlign: "left", fontSize: SIZES.xLarge, fontWeight: 700}}>Lihat menu</Text>
      
      <View style={{ backgroundColor: COLORS.secondary, width: "80%", marginVertical: 20, padding: 10, flexDirection: "row", justifyContent: "space-between", borderRadius: 5 }}>
        <TextInput style={{ textAlign: "left" }} value={searchInput} placeholder="Cari menu anda" placeholderTextColor={COLORS.black} onChangeText={handleChange} />
        <TouchableOpacity>
          <Ionicons name="search" size={20}/>
        </TouchableOpacity>
      </View>
        <FlatList 
          data={mealList}
          renderItem={({item}) => (
            <View style={{ width: 150, height: 150, backgroundColor: COLORS.secondary, alignItems: "center", justifyContent: "center", borderRadius: 10}}>
              <Text style={{ color: COLORS.black, fontWeight: "600", fontSize: SIZES.xLarge, textAlign: "center" }}>{item}</Text>
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={{ columnGap: 10}}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10 }}></View>
          )}
        />
      </View>
      
    </SafeAreaView>
  );
}