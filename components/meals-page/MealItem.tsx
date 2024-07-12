import { COLORS, SIZES } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

const MealItem = ({
  title,
  handlePress,
  id,
  handleAdd,
  handleRemove,
  item,
  selectedMeals,
}: any) => {
  const selected = selectedMeals.find((meal) => meal.id == item.id);
  // For select-meal page
  if (selected) {
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
        onPress={() => handlePress(id)}
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
            {title}
          </Text>
        </View>
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
      </TouchableOpacity>
    );
  }

  // For view-meal page
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
      onPress={() => handlePress(id)}
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
