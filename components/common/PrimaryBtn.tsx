import { COLORS } from "@/constants";
import { Text, TouchableOpacity } from "react-native";

const PrimaryBtn = ({ handlePress, title }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: COLORS.primary,
        padding: 10,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          textAlign: "center",
          color: COLORS.white,
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;
