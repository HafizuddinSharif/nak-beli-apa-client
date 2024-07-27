import { COLORS } from "@/constants";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropdownInput = ({
  placeholder,
  selectedValue = "",
  option,
  onChange,
}: any) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(selectedValue);

  const dummyOption = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
  ];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <Dropdown
      itemTextStyle={{ fontSize: 14 }}
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={option}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder : "..."}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
        onChange(item.value);
      }}
    />
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 8,
    borderRightWidth: 0,
    marginVertical: 0,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.gray2,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 0,
    height: 0,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
