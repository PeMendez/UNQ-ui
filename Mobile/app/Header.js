import { StyleSheet, View, ToastAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";


const Header = ({screen}) => {
  const isLogged = AsyncStorage.getItem('@storage_Key')
  const navigation = useRouter()

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@Storage_key')
    .then(()=>{
      navigation.push({ pathname: "/"})
    })
    .catch((error) => {
      ToastAndroid.show("There are connection problems, try again later.", ToastAndroid.SHORT)
    })
  };

  const handleBack = () => {
    navigation.back()
  };

    return (
      <View style={styles.header}>
        <AntDesign name="twitter" size={34} color="#1DA1F2" style={{ marginTop: 20, marginBottom: 10 }} />
        {isLogged && (
          <View style={styles.logoutIconContainer}>
            <MaterialIcons name="logout" size={24} color="black" onPress={() => handleLogout()}/>
          </View>
        )}
        {screen != "Home" && (
          <View style={styles.backIconContainer}>
            <AntDesign name="back" size={24} color="black" onPress={() => handleBack()}/>
          </View>
        )}
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
    marginTop: 35, 
    backgroundColor: "white", 
  },
  logoutIconContainer: {
    position: "absolute",
    right: 20,
    top: 20,
    marginTop: 5,
  },
  backIconContainer: {
    position: "absolute",
    left: 20,
    top: 20,
    marginTop: 5,
  }
});

export default Header