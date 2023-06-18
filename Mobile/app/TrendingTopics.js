import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import Api from "../api/api";
import Tweet from './Tweet';
import Header from './Header';
import Footer from './Footer';
import { useLocalSearchParams } from "expo-router";


function TrendingTopics() {
  const {loggedUser} = useLocalSearchParams() 

  const [tweets, setTweets] = useState([]);

   useEffect(() => {
         Api.getTrendingTopics()
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
      <Text style={styles.heading}>Trending Topics</Text>
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

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

export default TrendingTopics;
