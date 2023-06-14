import { StyleSheet, View, Text, Button} from "react-native";
import { Link , useRouter} from "expo-router";
import { useState } from "react";
import { TextInput } from 'react-native';
import Api from "../api/api";



const Login = () => {
    const [context, setContext] = useState({});
    const [invalidData, setInvalidData] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [login, setLogin] = useState(true);

    const navigation = useRouter()

    const handleLogin = () => {
        //setLoading(true);
    
        //   if (!username || !password) {
        //     toast.console.error("Username y password son campos obligatorios");
        //    return;
        //  }

        Api.postLogin(username, password, setContext, setInvalidData)
          .then((response) => {
            console.log("anda")
            navigation.push("/");
            setContext(response)
          })
          .catch((error) => {
            
            console.log("NO anda")
            console.error("Error during login:", error);
            //toast.error("Login failed. Please check your credentials.")
          });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButton}>
                    <Button onPress={() => setLogin(true)} title="Login" style={styles.buttonText}/>
                </View>
                <View style={styles.headerButton}>
                    <Button onPress={() => setLogin(false)} title="Register" style={styles.buttonText}/>
                </View>
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
                            secureTextEntry
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
                <Button onPress={() => handleLogin()} title="Submit" style={styles.buttonText}></Button>
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
    fontFamily: 'ubuntu-regular',
  },
  header: {
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 50,
    width: 120,
    margin: 5,
    borderRadius: 25,
    overflow: "hidden",
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
  },
  buttonText: {
    textTransform: "none",
},
});



export default Login