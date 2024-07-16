import { Text, View } from "react-native";

const MealDetails = ({ details }: any) => {
  if (!details) {
    return (
      <View
        style={{ height: "100%", justifyContent: "center", paddingBottom: 200 }}
      >
        <Text style={{ fontSize: 16, textAlign: "center" }}>To be build</Text>
      </View>
    );
  }

  return <Text style={{ fontSize: 16 }}>{details}</Text>;
};

export default MealDetails;
