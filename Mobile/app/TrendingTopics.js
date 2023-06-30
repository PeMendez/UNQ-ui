import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import Api from "../api/api";
import Tweet from './Tweet';
import { useLocalSearchParams } from "expo-router";
import { sortBy } from "lodash";


const TrendingTopics = () => {
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
        ToastAndroid.show("There are connection problems, try again later.", ToastAndroid.SHORT)
         console.log(error);
       });
   }, []);

  return (
    <View style={styles.container}>
  <ScrollView showsVerticalScrollIndicator={false}>
      {tweets.length > 0 ? (
        sortBy(tweets, ['date']).reverse().map((tweet) => (
          <Tweet
          key={tweet.id}
          tweet={tweet}
          isLikedT={tweet.isLiked}
          show={true}
          showRetweet={true}
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
