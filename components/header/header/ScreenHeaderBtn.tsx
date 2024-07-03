import { Image, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const ScreenHeaderBtn = ({ iconName, handlePress }: any) => {
  return (
    <TouchableOpacity style={{
      width: 30, height: 30, backgroundColor: '#FFF'
    }} onPress={handlePress}>
      <Ionicons name={iconName} size={30} color="black" />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
