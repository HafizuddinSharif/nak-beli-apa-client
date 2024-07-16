import { COLORS } from "@/constants";
import { Text, View } from "react-native";

const MealSteps = ({ cooking_guide }: any) => {
  if (!cooking_guide) {
    return (
      <View
        style={{ height: "100%", justifyContent: "center", paddingBottom: 200 }}
      >
        <Text
          style={{ fontSize: 16, textAlign: "center", color: COLORS.gray2 }}
        >
          Bahagian ini belum siap dibina
        </Text>
      </View>
    );
  }
  return <Text style={{ fontSize: 16 }}>{cooking_guide}</Text>;
};

export default MealSteps;
