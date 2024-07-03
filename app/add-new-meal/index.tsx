import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>You are in another page</Text>
    </SafeAreaView>
  );
}