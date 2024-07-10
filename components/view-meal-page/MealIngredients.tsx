import { Text } from "react-native";

const MealIngredients = ({ item_list }: any) => {
  item_list = item_list as ItemForMeal[];
  return item_list?.map((item: ItemForMeal) => {
    const { item_selection_id, quantity, id } = item;
    const { item_name, unit } = item_selection_id;

    return (
      <Text
        key={id}
        style={{ paddingBottom: 10, fontSize: 16 }}
      >{`${quantity} ${unit} of ${item_name}`}</Text>
    );
  });
};

export default MealIngredients;
