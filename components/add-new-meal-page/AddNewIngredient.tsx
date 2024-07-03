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

const AddNewIngredient = ({ handlePress }: any) => {
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
        <View style={{ flex: 2 }}>
          <DropdownInput placeholder="Nama bahan" />
        </View>
        <View
          style={{
            width: 2,
            height: 30,
            marginVertical: "auto",
            backgroundColor: COLORS.secondary,
          }}
        ></View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {/* <DropdownInput placeholder="Kuantiti" /> */}
          <TextInput
            placeholder="Kuantiti"
            placeholderTextColor={COLORS.black}
            style={{
              fontSize: 14,
              paddingHorizontal: 8,
            }}
            keyboardType="numeric"
            selectionColor={COLORS.secondary}
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
        <View style={{ flex: 1 }}>
          <DropdownInput placeholder="Unit" />
        </View>
      </View>
    </View>
  );
};

export default AddNewIngredient;
