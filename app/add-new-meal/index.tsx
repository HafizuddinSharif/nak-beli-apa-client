import AddNewIngredient from "@/components/add-new-meal-page/AddNewIngredient";
import AddNewIngredientBtn from "@/components/add-new-meal-page/AddNewIngredientBtn";
import PageSubHeading from "@/components/common/PageSubHeading";
import PageTitle from "@/components/common/PageTitle";
import { COLORS, TEXT } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";

export default function Index() {
  const dummyIngredientList = ["1", "2", "3"];
  const [currCount, setCurrCount] = useState(dummyIngredientList.length);
  const [menuName, setMenuName] = useState("");
  const [ingredientList, setIngredientList] = useState(dummyIngredientList);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const onAddNew = () => {
    setCurrCount((prev) => prev + 1);
    const newEntry = currCount + 1;
    setIngredientList((prev) => {
      const newPush = [...prev];
      newPush.push(newEntry.toString());
      console.log("New entry added");
      console.log(newPush);
      return newPush;
    });
  };

  const onRemoveItem = (id: string) => {
    setIngredientList((prev) => {
      const updatedList = [...prev];
      return updatedList.filter((item) => item !== id);
    });
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
                size={24}
                color="black"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {`Are you sure you want to go back? \n All edit will be lost`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                width: 250,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose, { flex: 1 }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Let me stay</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { flex: 1 }]}
                onPress={() => {
                  setModalVisible(modalVisible);
                  router.back();
                }}
              >
                <Text style={styles.textStyle}>Go back</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
          placeholderTextColor={COLORS.black}
          style={{
            borderBottomColor: COLORS.orange,
            width: "100%",
            borderBottomWidth: 2,
            textAlign: "center",
            paddingVertical: 5,
            marginBottom: 20,
          }}
        />

        <PageSubHeading
          title={TEXT.ADD_NEW_MEAL.ADD_INGREDIENT_SUBHEADING.BM}
        />

        <View style={{ maxHeight: 500 }}>
          <FlatList
            data={ingredientList}
            renderItem={({ item }) => (
              <AddNewIngredient handlePress={() => onRemoveItem(item)} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 7 }}></View>}
            keyExtractor={(item) => item}
          />
        </View>

        <AddNewIngredientBtn handlePress={onAddNew} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
