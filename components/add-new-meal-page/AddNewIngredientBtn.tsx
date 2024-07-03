import { COLORS } from "@/constants";
import { Text, TouchableOpacity } from "react-native";

const AddNewIngredientBtn = ({ handlePress }: any) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.secondary,
        paddingVertical: 10,
        marginVertical: 7,
        borderRadius: 5,
      }}
      onPress={handlePress}
    >
      <Text
        style={{ color: COLORS.black, textAlign: "center" }}
      >{`Tambah bahan`}</Text>
    </TouchableOpacity>
  );
};

export default AddNewIngredientBtn;
