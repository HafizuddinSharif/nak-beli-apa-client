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
import { useEffect, useState } from "react";
import useContentStore from "@/hooks/useContentStore";

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

const AddNewIngredient = ({
  item,
  handlePress,
  handleChange,
}: {
  item: ItemForMeal;
  handlePress: any;
  handleChange: any;
}) => {
  const {
    itemOptions,
    itemList,
    unitList,
  }: {
    itemOptions: DropdownOption[];
    itemList: ItemSelection[];
    unitList: Unit[];
  } = useContentStore();

  const [itemSelection, setItemSelection] = useState(
    item ? item.item_selection_id : null
  );
  const [itemQuantity, setItemQuantity] = useState(item ? item.quantity : "");
  const [itemUnit, setItemUnit] = useState(item ? item.unit : null);
  const [unitOptions, setUnitOptions] = useState(
    item ? convertToDropdownOption(item.item_selection_id.units) : []
  );

  const onChangeQuantity = (quantity: string) => {
    setItemQuantity(quantity);
    const editItem = {
      id: item.id,
      item_selection_id: itemSelection,
      quantity: parseInt(quantity),
      unit: itemUnit,
    } as ItemForMeal;
    handleChange(editItem);
  };

  const onChangeItem = (itemIdValue: string) => {
    setItemUnit(null);
    const itemObj = itemList.find(
      (elem) => elem.id === itemIdValue
    ) as ItemSelection;
    const newUnitOptions = convertToDropdownOption(itemObj.units);
    console.log(newUnitOptions);
    setUnitOptions(newUnitOptions);
    setItemSelection(itemObj);
    const editItem = {
      id: item.id,
      item_selection_id: itemObj,
      quantity: itemQuantity,
      unit: itemUnit,
    } as ItemForMeal;
    handleChange(editItem);
  };

  const onChangeUnit = (unitValue: string) => {
    console.log(unitValue);
    const unitObj = unitList.find((elem) => elem.unit === unitValue) as Unit;
    console.log(unitObj);
    setItemUnit(unitObj);
    const editItem = {
      id: item.id,
      item_selection_id: item.item_selection_id,
      quantity: itemQuantity,
      unit: unitObj,
    } as ItemForMeal;
    handleChange(editItem);
  };
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
            selectedValue={itemSelection.id}
            option={itemOptions}
            onChange={onChangeItem}
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
            onChangeText={onChangeQuantity}
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
            onChange={onChangeUnit}
          />
        </View>
      </View>
    </View>
  );
};

export default AddNewIngredient;
