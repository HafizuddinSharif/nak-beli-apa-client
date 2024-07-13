import { View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";

const ChecklistItem = ({
  handleToggle,
  item,
}: {
  handleToggle: any;
  item: GroceryItem;
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingBottom: 15,
      }}
    >
      <BouncyCheckbox
        onPress={(isChecked: boolean) => handleToggle(item, isChecked)}
        isChecked={item.hasBought}
      />
      <Text
        style={{
          fontSize: 16,
          alignSelf: "center",
        }}
      >{`${item.quantity} ${item.unit.unit} of ${item.item_selection.item_name} `}</Text>
    </View>
  );
};

export default ChecklistItem;
