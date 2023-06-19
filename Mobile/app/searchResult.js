import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text, StatusBar, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import { useRouter, useLocalSearchParams } from "expo-router";
import Api from "../api/api";
import Tweet from "./Tweet";


function SearchResult({searchText}) {  
  const {loggedUser} = useLocalSearchParams() 
  const [tweets, setTweets] = useState([]);

   useEffect(() => {
    Api.getSearch(searchText)
           .then(response => {
             if (response && response.data && Array.isArray(response.data.result)) {
               const withLikes = response.data.result.map(tweet => {
                  let isLiked = !!tweet.likes.find(user => user.id === loggedUser);
                 return { ...tweet, isLiked};
               });
               setTweets(withLikes);
             }
           })
       .catch(error => {
         console.log(error);
       });
         
   }, []);
  
  const actualizarTweet = (tweetActualizar) => {
    setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
   
  };

  return (
    <View style={styles.container}>
        <ScrollView>
            {tweets.length > 0 ? (
              tweets.map(tweet => (
                <Tweet
                key={tweet.id}
                tweet={tweet}
                isLikedT={tweet.isLiked}
                actualizar={actualizarTweet}
                show={true}
                />
              ))
            ) : (
              <Text>No se encontraron tweets.</Text>
            )}
        </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({


});

export default SearchResult;
