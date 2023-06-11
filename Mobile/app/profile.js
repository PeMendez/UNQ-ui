import { StyleSheet, View, Text, Button} from "react-native";
import { Link , useRouter} from "expo-router";

const Profile = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Profile</Text>
            <Link href="/index">Go index</Link>
            <Button onPress={()=>router.back()} title="Go back"></Button>
          </View>
        </View>
  );
}
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

