import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { useRouter} from "expo-router";
import { useState } from "react";
import { TextInput } from 'react-native';
import { ToastAndroid } from "react-native";
import Api from "../api/api";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [login, setLogin] = useState(true);

    const navigation = useRouter()

    const handleLogin = () => {
    
      if (!username || !password) {
        ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
        return;
      }

      Api.postLogin(username, password)
        .then((response) => {
          navigation.replace({ pathname: "/Home", params: {loggedUser: response.id}});
        })
        .catch(() => {
          ToastAndroid.show("Login failed. Please check your credentials.", ToastAndroid.SHORT);
        });
    };

    const handleRegister = () => {
      if (!username || !password || !email || !image || !backgroundImage) {
        ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        ToastAndroid.show("Please enter an valid e-mail account", ToastAndroid.SHORT);
        return;
      }
  
      if ((!image.startsWith("http://") || !image.startsWith("https://")) && !image.endsWith(".jpg")) {
        ToastAndroid.show("Image field must be an URL of an .jpg extension file", ToastAndroid.SHORT);
        return;
      }
  
      if ((!backgroundImage.startsWith("http://") || !backgroundImage.startsWith("https://")) && !backgroundImage.endsWith(".jpg")) {
        ToastAndroid.show("Background Image field must be an URL of an .jpg extension file", ToastAndroid.SHORT);
        return;
      }
  
      Api.postRegister(username, password, email, image, backgroundImage)
        .then((response) => {
          navigation.replace({ pathname: "/Home", params: {loggedUser: response.id}});
        })
        .catch(() => {
          ToastAndroid.show("Login failed. Please check your credentials.", ToastAndroid.SHORT);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setLogin(true)}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setLogin(false)}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fields}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                {!login &&
                    (<>
                        <TextInput
                            style={styles.inputField}
                            placeholder="email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Image"
                            value={image}
                            onChangeText={(text) => setImage(text)}
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Background image"
                            value={backgroundImage}
                            onChangeText={(text) => setBackgroundImage(text)}
                        />
                    </>)
                }
            </View>
            <View style={styles.postButton}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={login ? handleLogin : handleRegister}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    //fontFamily: 'ubuntu-regular',
  },
  header: {
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 120,
    margin: 5,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: 'rgb(80, 183, 245)',
    alignItems: "center",
    justifyContent: "center",
  },
  
  inputField: {
    height: 40,
    width: 240,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 25,
    overflow: "hidden",
  },
  postButton: {
    width: 250,
    margin: 5,
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    padding:10, 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});



export default Login