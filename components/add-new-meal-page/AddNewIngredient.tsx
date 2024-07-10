import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import DropdownInput from "../common/DropdownInput";
import { useState } from "react";
import { dummyItems, dummyUnits } from "@/dummy_data";

const AddNewIngredient = ({ item, handlePress }: any) => {
  const [itemId, setItemId] = useState(item ? item.item_selection_id.id : "");
  const [itemQuantity, setItemQuantity] = useState(item ? item.quantity : "");
  const [itemUnit, setItemUnit] = useState(
    item ? item.item_selection_id.unit : ""
  );

  // To set dropdown options
  const [itemOptions, setItemOptions] = useState(
    convertToDropdownOption(dummyItems)
  );
  const [unitOptions, setUnitOptions] = useState(
    convertToDropdownOption(dummyUnits)
  );

  return (
    <View style={{ flexDirection: "row", columnGap: 5 }}>
      {/* Left-side add button */}
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: COLORS.secondary,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
        onPress={handlePress}
      >
        <Ionicons size={30} name="remove" color={COLORS.black} />
      </TouchableOpacity>

      {/* Input */}
      <View
        style={{
          flex: 6,
          width: "100%",
          flexDirection: "row",
          borderColor: COLORS.secondary,
          borderWidth: 2,
          borderRadius: 5,
        }}
      >
        {/* For item selection */}
        <View style={{ flex: 2 }}>
          <DropdownInput
            placeholder="Nama bahan"
            selectedValue={itemId}
            option={itemOptions}
          />
        </View>
        <View
          style={{
            width: 2,
            height: 30,
            marginVertical: "auto",
            backgroundColor: COLORS.secondary,
          }}
        ></View>
        {/* For quantity field */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            placeholder="Kuantiti"
            placeholderTextColor={COLORS.gray2}
            style={{
              fontSize: 14,
              paddingHorizontal: 8,
            }}
            keyboardType="numeric"
            selectionColor={COLORS.secondary}
            value={itemQuantity ? itemQuantity.toString() : ""}
            onChangeText={setItemQuantity}
          />
        </View>
        <View
          style={{
            width: 2,
            height: 30,
            marginVertical: "auto",
            backgroundColor: COLORS.secondary,
          }}
        ></View>
        {/* For unit selection */}
        <View style={{ flex: 1 }}>
          <DropdownInput
            placeholder="Unit"
            selectedValue={itemUnit}
            option={unitOptions}
          />
        </View>
      </View>
    </View>
  );
};

const convertToDropdownOption = (list: any): DropdownOption[] => {
  if (!list) {
    return [];
  }
  const options: DropdownOption[] = [];
  list.forEach((elem) => {
    if ("unit" in elem && !("item_name" in elem)) {
      // elem is a Unit
      options.push({ value: elem.unit, label: elem.unit });
    } else if ("item_name" in elem) {
      // elem is an ItemSelection
      elem = elem as ItemSelection;
      options.push({ value: elem.id, label: elem.item_name });
    }
  });

  return options;
};

export default AddNewIngredient;
