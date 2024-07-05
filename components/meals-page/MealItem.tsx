import { COLORS, SIZES } from "@/constants";
import { View, Text, TouchableOpacity } from "react-native";

const MealItem = ({ title, handlePress }: any) => {
  return (
    <TouchableOpacity
      style={{
        height: 155,
        flex: 1,
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          color: COLORS.black,
          fontWeight: "600",
          fontSize: SIZES.xLarge,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MealItem;
