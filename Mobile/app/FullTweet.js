import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5, Feather} from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import Api from "../api/api";
import moment from 'moment';
import 'moment-timezone';
import { Avatar } from 'react-native-elements';
import { useLocalSearchParams, useRouter } from "expo-router";
import Tweet from './Tweet';

const FullTweet = () =>{
  const {tweetId} = useLocalSearchParams()
  const [tweet,setTweet]= useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tweetsWithLike, setTweetsWithLike] = useState([]);
  console.log('lala')

  
  console.log(tweetId)

  useEffect(() => {
    Api.getTweet(tweetId)
    .then((response) => {
        setTweet(response.data)
        setIsLoading(false);
    })
    .catch(error => {
      console.log(error)
    }) 
  },[]);

  const fetchLoggedUser = async () => {
    try {
      const response = await Api.getLoggedUser();
      return response.data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoggedUser()
      .then(loggedUserResponse => {
        const promises = tweet.replies.map(tweet => {
          let isLiked = !!tweet.likes.find(user => user.id === loggedUserResponse.id);
          return { ...tweet, isLiked };
        });
        console.log(promises)
        setTweetsWithLike(promises);
      })
      .catch(error => {
        console.log(error);
      });
  }, [tweet]);

  
  console.log(tweet.id)

  const actualizarTweet = (tweetActualizar) => {
    setTweetsWithLike((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
  };

  return (
    <View>
      <View>
      <Tweet
        key={tweet.id}
        tweet={tweet}
        actualizarTweet={actualizarTweet}
        isLikedT={tweet.isLiked}
        show={true}
        />
      </View>
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
      </ScrollView>)
    </View>
  )};

export default FullTweet;