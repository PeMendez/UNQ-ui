import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, ActivityIndicator } from "react-native";
import Api from "../api/api";
import Tweet from './Tweet';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer'; 
import FloatingActionButton from './FloatingActionButton';
import { useRouter } from 'expo-router';
import { sortBy } from "lodash";

const GetFollowingTweets = () => {
  const {loggedUser} = useLocalSearchParams() 
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useRouter(); 

   useEffect(() => {
         Api.getFollowingTweets()
           .then(response => {
             if (response && response.data && Array.isArray(response.data.result)) {
               const promises = response.data.result.map(tweet => {
                  let isLiked = !!tweet.likes.find(user => user.id === loggedUser);
                 return { ...tweet, isLiked};
               });
               setTweets(promises);
               setIsLoading(false);
             }
           })
       .catch(error => {
         console.log(error);
       });
   }, []);
  
  const actualizarTweet = (tweetActualizar) => {
    setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
   
  };

  const handleFloatingActionButton = () => {
    navigation.push({pathname: "/interaction", params: {typeInteraction: "Tweet", userId: loggedUser}})
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header />
      {isLoading ? (
        <View style={[styles.loadingContainer, styles.loadingAbsolute]}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>) : (
    <ScrollView>
      {tweets.length > 0 ? (
        sortBy(tweets, ['date']).reverse().map((tweet) => (
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
    </ScrollView>)}
        <View style={styles.footerContainer}>
          <Footer/>
        </View>
        <FloatingActionButton onPress={handleFloatingActionButton} />
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default GetFollowingTweets;
