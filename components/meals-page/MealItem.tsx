import { COLORS, SIZES } from "@/constants"
import { View, Text } from "react-native"

const MealItem = ({ title }: any) => {
    return (
        <View style={{ height: 155, flex:1, backgroundColor: COLORS.secondary, alignItems: "center", justifyContent: "center", borderRadius: 10}}>
              <Text style={{ color: COLORS.black, fontWeight: "600", fontSize: SIZES.xLarge, textAlign: "center" }}>{title}</Text>
            </View>
    )
}

export default MealItem;