import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import Api from "../api/api";
import { useRouter } from "expo-router";
  
export default function Footer() {

    const [loggedUser, setLoggedUser] = useState("");
    const navigation = useRouter()

    useEffect(() => {
  
        Api.getLoggedUser()
        .then((response) => {
            setLoggedUser(response.data)
        })
        .catch(error => {
          console.log(error)
        }) 

    }, []);

    const handleHome = () => {
      navigation.push({ pathname: "/Home", params: {loggedUser: loggedUser.id}})
     };
    
     const handleSearch = () => {
      navigation.push({pathname: "/Search"})
    };
    
    const handleUserProfile = () => {
      console.log("useeeeeeeeeer:", loggedUser.id)
      navigation.push({ pathname: "/profile", params: {user: loggedUser.id}})
    };



    return (
        <View style={styles.footerContainer}>
            <View style={styles.iconContainer}>
                <AntDesign name="home" size={34} color="black" onPress={() => handleHome()}/>
            </View>
            <View style={styles.iconContainer}>
                <AntDesign name="search1" size={34} color="black" onPress={() => handleSearch()}/>
            </View>
            <View style={styles.iconContainer}>
                <Avatar
                  rounded
                  source={loggedUser.image ? { uri: loggedUser.image } : undefined}
                  size="medium"
                  onPress={() => handleUserProfile()}
                />
            </View>
        </View>
    );
  }

  const styles = StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 10,
      backgroundColor: 'white',
      borderTopWidth: 1, 
      borderTopColor: 'gray', 
    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  
  