import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, StatusBar,TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Api from "../api/api";
import moment from 'moment';
import Header from './Header';
import Footer from './Footer'; 
import 'moment-timezone';
import { Avatar } from 'react-native-elements';
import { useLocalSearchParams, useRouter } from "expo-router";
import Tweet from './Tweet';

const FullTweet = () => {
  const { tweetId } = useLocalSearchParams();
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tweetsWithLike, setTweetsWithLike] = useState([]);

  useEffect(() => {
    Api.getTweet(tweetId)
      .then((response) => {
        setTweet(response.data);
        setIsLoading(false);
        fetchLoggedUser()
        .then(loggedUserResponse => {
          const promises = tweet.replies.map(tweet => {
            let isLiked = !!tweet.likes.find(user => user.id === loggedUserResponse.id);
            return { ...tweet, isLiked };
          });
          setTweetsWithLike(promises);
        })
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

  // useEffect(() => {
  //   if (tweet) {
  //     fetchLoggedUser()
  //       .then(loggedUserResponse => {
  //         const promises = tweet.replies.map(tweet => {
  //           let isLiked = !!tweet.likes.find(user => user.id === loggedUserResponse.id);
  //           return { ...tweet, isLiked };
  //         });
  //         setTweetsWithLike(promises);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // }, [tweet]);

  const actualizarTweet = (tweetActualizar) => {
    setTweetsWithLike(prevState => prevState.map((tweet) => ((tweet.id === tweetActualizar.id) ? tweetActualizar : tweet)))
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header />
      {isLoading ? (
        <View style={[styles.loadingContainer, styles.loadingAbsolute]}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>) : (
        <View style={styles.tweet}>
          <Tweet
            key={tweet.id}
            tweet={tweet}
            actualizarTweet={actualizarTweet}
            isLikedT={tweet.isLiked}
            show={true}
          />
          <View style={styles.replies}>
            <ScrollView>
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
                <Text>No se encontraron tweets.</Text>
              )}
            </ScrollView>
          </View>
        </View>
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
    marginTop:20
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
