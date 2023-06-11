import { StyleSheet, View, Text, Button} from "react-native";
import { Link , useRouter} from "expo-router";
import { useState } from "react";
import { TextInput } from 'react-native';


const Login = () => {
    const [context, setContext] = useState({});
    const [invalidData, setInvalidData] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [login, setLogin] = useState(true);

    const router = useRouter()


    const handleLogin = (e) => {
        //setLoading(true);
    
        //  if (!username || !password) {
        //   toast.error("Username y password son campos obligatorios");
        //   setLoading(false);
        //   return;
        // }
    

        // Api.postLogin(username, password, setContext, setInvalidData)
        //   .then((response) => {
        //     router.push("/index");
        //     setContext(response)
        //   })
        //   .catch((error) => {
        //     console.error("Error during login:", error);
        //     //toast.error("Login failed. Please check your credentials.")
        //   });
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButton}>
                    <Button onPress={() => setLogin(true)} title="Login" />
                </View>
                <View style={styles.headerButton}>
                    <Button onPress={() => setLogin(false)} title="Register" />
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
                <Button onPress={() => handleLogin()} title="Submit"></Button>
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
  },
  header: {
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    padding: 10,
    margin: 5,
  },
  
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
  },
  postButton: {
    padding: 10,
    margin: 5,
  },
});



export default Login