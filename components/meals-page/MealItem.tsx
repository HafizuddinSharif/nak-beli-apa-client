import { COLORS, SIZES } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

const MealItem = ({
  handlePress,
  handleAdd,
  handleRemove,
  item,
  selectedMeals,
  isFor,
}: any) => {
  let selected: MealSelection & { quantity: number };
  if (selectedMeals) {
    selected = selectedMeals.find((meal) => meal.id == item.id);
  }
  const AddOrRemoveMealBtn = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          paddingTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.green,
            padding: 3,
            borderRadius: 20,
          }}
          onPress={() => handleAdd(item)}
        >
          <Ionicons name="add" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>
          {selected.quantity ? selected.quantity : 0}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.red,
            padding: 3,
            borderRadius: 20,
          }}
          onPress={() => handleRemove(item.id)}
        >
          <Ionicons name="remove" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={{
        height: 155,
        flex: 1,
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        maxWidth: "50%",
      }}
      onPress={() =>
        isFor == "select" ? handleAdd(item) : handlePress(item.id)
      }
      disabled={selected ? true : false}
    >
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontWeight: "600",
            fontSize: SIZES.xLarge,
            textAlign: "center",
          }}
        >
          {item.meal_name}
        </Text>
      </View>
      {/* Should appear when meal is selected */}
      {selected && <AddOrRemoveMealBtn />}
    </TouchableOpacity>
  );
};

export default MealItem;
