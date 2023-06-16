import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function Header() {
    return (
      <View style={styles.header}>
        <AntDesign name="twitter" size={34} color="#1DA1F2" style={{ marginTop: 20, marginBottom: 10 }} />
      </View>
    );
}

const styles = StyleSheet.create({
    header: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center", 
    marginBottom: 10,
    marginTop: 10, 
    backgroundColor: "white", 
    },
});