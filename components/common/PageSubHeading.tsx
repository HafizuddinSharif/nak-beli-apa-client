import { SIZES } from "@/constants";
import { Text } from "react-native";

const PageSubHeading = ({ title }: any) => {
  return (
    <Text
      style={{
        marginBottom: 20,
        textAlign: "left",
        fontSize: SIZES.large,
        fontWeight: 700,
      }}
    >
      {title}
    </Text>
  );
};

export default PageSubHeading;
