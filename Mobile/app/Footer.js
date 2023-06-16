import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import Api from "../api/api";
  
export default function Footer() {

    const [loggedUser, setLoggedUser] = useState("");

    useEffect(() => {
  
        Api.getLoggedUser()
        .then((response) => {
            setLoggedUser(response.data)
        })
        .catch(error => {
          console.log(error)
        })
          
         
    }, []);


    return (
        <View style={styles.footerContainer}>
            <View style={styles.iconContainer}>
                <AntDesign name="home" size={24} color="black" />
            </View>
            <View style={styles.iconContainer}>
                <AntDesign name="search1" size={24} color="black" />
            </View>
            <View style={styles.iconContainer}>
                <Avatar
                  rounded
                  source={loggedUser.image ? { uri: loggedUser.image } : undefined}
                  size="small"
                />
            </View>
        </View>
    //   <View style={styles.footer}>
    //     
    //     
        
    //   </View>
    );
  }

  const styles = StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 10,
      backgroundColor: '#f0f0f0',
    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  
  