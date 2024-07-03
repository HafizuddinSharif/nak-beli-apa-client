import { View, Text } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox"

const ChecklistItem = ({ handleToggle, item }: any) => {
    return (
        <View
            style= {{
              flex: 1,
              flexDirection: "row",
              paddingBottom: 15,
            }}
          >
            <BouncyCheckbox onPress={(isChecked: boolean) => handleToggle(item, isChecked)} isChecked={item.hasBought}/>
            <Text>{`${item.quantity} ${item.unit} of ${item.item_name} `}</Text>
          </View>
    )
}

export default ChecklistItem