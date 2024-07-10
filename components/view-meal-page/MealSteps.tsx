import { Text } from "react-native";

const MealSteps = ({ cooking_guide }: any) => {
  if (cooking_guide == "") {
    return <Text style={{ fontSize: 16 }}>Nampaknya its empty</Text>;
  }
  return <Text style={{ fontSize: 16 }}>{cooking_guide}</Text>;
};

export default MealSteps;
