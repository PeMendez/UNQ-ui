import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, ToastAndroid } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Api from "../api/api";
import Tweet from "./Tweet";
import { sortBy } from "lodash";

const SearchResult = ({ searchText }) => {
  const { loggedUser } = useLocalSearchParams();
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Api.getSearch(searchText)
      .then((response) => {
        if (response && response.data && Array.isArray(response.data.result)) {
          const withLikes = response.data.result.map((tweet) => {
            let isLiked = !!tweet.likes.find((user) => user.id === loggedUser);
            return { ...tweet, isLiked };
          });
          setIsLoading(false);
          setTweets(withLikes);
          
        }
      })
      .catch((error) => {
        ToastAndroid.show("There are connection problems, try again later.", ToastAndroid.SHORT)
      });
  }, [searchText]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>
      ) : (
        <ScrollView>
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
            <Text>No hay tweets que coincidan con tu búsqueda</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    marginTop: 20, 
  },
});

export default SearchResult;
