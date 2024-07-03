import { SIZES } from "@/constants";
import { Text } from "react-native";

const PageTitle = ({ title }: any) => {
    return (<Text style={{ marginBottom: 20, textAlign: "left", fontSize: SIZES.xLarge, fontWeight: 700}}>{title}</Text>
    )
}

export default PageTitle;