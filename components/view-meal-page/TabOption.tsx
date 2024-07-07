import { COLORS } from "@/constants";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { OPTION } from "@/constants/add-new-meal";
const TabOption = ({ optionInFocus, onTabChange }: any) => {
  // To render individual pill option
  const optionItem = (option: string, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onTabChange(option)}
        style={{
          flex: 1,
          backgroundColor:
            optionInFocus == option ? COLORS.secondary : "transparent",
          height: 30,
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <Text style={{ textAlign: "center" }}>{option}</Text>
      </TouchableOpacity>
    );
  };

  // The pill bar
  return (
    <View
      style={{
        backgroundColor: COLORS.peachWhite,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      ></View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 5,
        }}
      >
        {Object.values(OPTION).map((element, index) => {
          return optionItem(element, index);
        })}
      </View>
    </View>
  );
};

export default TabOption;
