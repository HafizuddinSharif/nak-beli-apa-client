import { SIZES } from "@/constants";
import { Text } from "react-native";

const PageTitle = ({ title, textAlign = "left" }: any) => {
  return (
    <Text
      style={{
        marginBottom: 20,
        textAlign: textAlign,
        fontSize: SIZES.xLarge,
        fontWeight: 700,
      }}
    >
      {title}
    </Text>
  );
};

export default PageTitle;
