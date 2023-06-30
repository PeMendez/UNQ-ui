import { StyleSheet, View, SafeAreaView, StatusBar, ToastAndroid } from "react-native";
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from "../api/api";
import Header from "./Header";

const Page = () => {

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
            ToastAndroid.show("There are connection problems, try again later.", ToastAndroid.SHORT)
            console.log(error)
          })
        ) : (
          navigation.push({ pathname: "/login"})
        )}        
      )
       
  }, []);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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
  contentContainer: {
    paddingTop: StatusBar.currentHeight,
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

export default Page