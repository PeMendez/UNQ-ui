import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import Api from "../api/api";
import Tweet from './Tweet';
import Header from './Header';
import Footer from './Footer';


function TrendingTopics() {
  const [tweets, setTweets] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");

  const fetchLoggedUser = async () => {
    try {
      const response = await Api.getLoggedUser();
      setLoggedUser(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoggedUser()
      .then(loggedUserResponse => {
        return Api.getTrendingTopics()
          .then(response => {
            if (response && response.data && Array.isArray(response.data.result)) {
              const promises = response.data.result.map(tweet => {
                let isLiked = !!tweet.likes.find(user => user.id === loggedUserResponse.id);
                return { ...tweet, isLiked };
              });
              return Promise.all(promises)
                .then(tweetsWithProfilePics => {
                  setTweets(tweetsWithProfilePics);
                });
            }
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const actualizarTweet = (tweetActualizar) => {
    setTweets(prevState => prevState.map(tweet => (tweet.id === tweetActualizar.id ? tweetActualizar : tweet)));
  };

  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <Header />
  <ScrollView>
      <Text style={styles.heading}>Trending Topics</Text>
      {tweets.length > 0 ? (
        tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            content={tweet.content}
            profile_pic={tweet.user.image}
            date={tweet.date}
            repliesAmount={tweet.repliesAmount}
            reTweetAmount={tweet.reTweetAmount}
            likes={tweet.likes}
            username={tweet.user.username}
            image={tweet.type.image}
            userId={tweet.user.id}
            typeAsString={tweet.typeAsString}
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
