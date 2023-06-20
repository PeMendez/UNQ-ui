import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, StatusBar,TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Api from "../api/api";
import Header from './Header';
import Footer from './Footer'; 
import 'moment-timezone';
import { useLocalSearchParams, useRouter } from "expo-router";
import Tweet from './Tweet';

const FullTweet = () => {
  const { tweetId } = useLocalSearchParams();
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tweetsWithLike, setTweetsWithLike] = useState([]);

  const navigation = useRouter(); 

  useEffect(() => {
    Api.getTweet(tweetId)
      .then((response) => {
        setTweet(response.data);
        setIsLoading(false);
        fetchLoggedUser()
        .then(loggedUserResponse => {
          if (tweet && tweet.replies) {
            const promises = tweet.replies.map(tweet => {
              let isLiked = !!tweet.likes.find(user => user.id === loggedUserResponse.id);
              return { ...tweet, isLiked };
            });
          setTweetsWithLike(promises);
        }})
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log(error)
      })
  }, [tweet]);

  const fetchLoggedUser = async () => {
    try {
      const response = await Api.getLoggedUser();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarTweet = (tweetActualizar) => {
    setTweetsWithLike(prevState => prevState.map((tweet) => ((tweet.id === tweetActualizar.id) ? tweetActualizar : tweet)))
  };

  const handleComment = (typeInteraction) => {
    navigation.push({pathname: "/interaction", params: {typeInteraction: typeInteraction, tweetReference: tweetId, username: tweet.user.username, userId: tweet.user.id}})
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header />
      {isLoading ? (
        <View style={[styles.loadingContainer, styles.loadingAbsolute]}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tweet}>
            <Tweet
              key={tweet.id}
              tweet={tweet}
              actualizarTweet={actualizarTweet}
              isLikedT={tweet.isLiked}
              show={true}
            />
          </View>
          <View style={styles.replies}>
              {tweetsWithLike.length > 0 ? (
                tweetsWithLike.map((tweet) => (
                  <Tweet
                    key={tweet.id}
                    tweet={tweet}
                    isLikedT={tweet.isLiked}
                    actualizar={actualizarTweet}
                    show={true}
                  />
                ))
              ) : (
                <TouchableOpacity onPress={() => handleComment("Reply")}>
                  <Text>Add your reply.</Text>
                </TouchableOpacity>                 
              )}            
          </View>
          </ScrollView>
      )}
        <View style={styles.footerContainer}>
          <Footer/>
        </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tweet: {
    justifyContent: 'space-between',
  },
  replies: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 60,
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

export default FullTweet;
