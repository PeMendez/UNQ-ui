import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from "../api/api";
import Header from "./Header";

export default function Page() {

  const navigation = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
  
      AsyncStorage.getItem('@storage_Key')
      .then( isLogged =>
        {setIsLoggedIn(isLogged)
          isLoggedIn ? (
          Api.getLoggedUser()
          .then((response) => {
            navigation.push({ pathname: "/Home", params: {loggedUser: response.data.id}})
          })
          .catch(error => {
            console.log(error)
          })
        ) : (
          navigation.push({ pathname: "/login"})
        )}        
      )
       
  }, []);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.loadingContainer}>
        <AntDesign name="twitter" size={40} color="white"/>
      </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    width: "100%", 
  },
  logo: {
    width: 120,
    height: 120,
  }
});
