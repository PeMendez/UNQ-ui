import { StyleSheet, View, ToastAndroid } from "react-native";
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import Api from "../api/api";
import { useRouter } from "expo-router";
  
const Footer = () => {

    const [loggedUser, setLoggedUser] = useState("");
    const navigation = useRouter()

    useEffect(() => {
  
        Api.getLoggedUser()
        .then((response) => {
            setLoggedUser(response.data)
        })
        .catch(error => {
          ToastAndroid.show("There are connection problems, try again later.", ToastAndroid.SHORT)
          console.log(error)
        }) 

    }, []);

    const handleHome = () => {
      navigation.push({ pathname: "/Home", params: {loggedUser: loggedUser.id}})
     };

    const handleSearch = () => {
      navigation.push({pathname: "/Explore", params: {loggedUser: loggedUser.id}})
    };
    
    const handleUserProfile = () => {
      navigation.push({ pathname: "/profile", params: {userId: loggedUser.id}})
    };



    return (
        <View style={styles.footerContainer}>
            <View style={styles.iconContainer}>
                <AntDesign name="home" size={35} color="black" onPress={() => handleHome()}/>
            </View>
            <View style={styles.iconContainer}>
                <AntDesign name="search1" size={35} color="black" onPress={() => handleSearch()}/>
            </View>
            <View style={styles.iconContainer}>
                <Avatar
                  rounded
                  source={loggedUser.image ? { uri: loggedUser.image } : undefined}
                  size={35}
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
      padding: 10,
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

  
  export default Footer