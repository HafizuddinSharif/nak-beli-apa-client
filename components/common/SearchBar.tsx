import { COLORS } from "@/constants"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

const SearchBar = ({ value, handleChange }: any) => {
    return (
        <View style={{ backgroundColor: COLORS.secondary, width: "100%", marginBottom: 10, padding: 10, flexDirection: "row", justifyContent: "space-between", borderRadius: 5 }}>
          <TextInput style={{ textAlign: "left" }} value={value} placeholder="Cari menu anda" placeholderTextColor={COLORS.black} onChangeText={handleChange} />
          <TouchableOpacity>
            <Ionicons name="search" size={20}/>
          </TouchableOpacity>
        </View>
    )
}

export default SearchBar