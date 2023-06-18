import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar} from "react-native";
import Api from "../api/api";
import Tweet from './Tweet';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer'; 

const GetFollowingTweets = () => {
  const {loggedUser} = useLocalSearchParams() 
  const [tweets, setTweets] = useState([]);

   useEffect(() => {
         Api.getFollowingTweets()
           .then(response => {
             if (response && response.data && Array.isArray(response.data.result)) {
               const promises = response.data.result.map(tweet => {
                  let isLiked = !!tweet.likes.find(user => user.id === loggedUser);
                 return { ...tweet, isLiked};
               });
               setTweets(promises);
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header />
    <ScrollView>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
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
        <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: StatusBar.currentHeight,
  },
});

export default GetFollowingTweets;
