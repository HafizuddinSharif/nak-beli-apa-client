import { Text } from "react-native";

const MealIngredients = ({ item_list }: any) => {
  item_list = item_list as ItemForMeal[];
  return item_list?.map((item: ItemForMeal, idx: number) => {
    const { item_selection_id, quantity, id, unit } = item;
    const { item_name } = item_selection_id;

    return (
      <Text
        key={idx}
        style={{ paddingBottom: 10, fontSize: 16 }}
      >{`${quantity} ${unit.unit} of ${item_name.toLowerCase()}`}</Text>
    );
  });
};

export default MealIngredients;
