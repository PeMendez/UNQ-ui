import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather} from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import Api from "../api/api";
import moment from 'moment';
import 'moment-timezone';
import { Avatar } from 'react-native-elements';
import { useRouter } from "expo-router";

const Tweet = ({tweet, actualizarTweet, show, isLikedT }) => {
  const [tweetId, setTweetId] = useState(null);
  const [likesAmount, setlikesAmount] = useState(tweet.likes?.length);
  const [isLiked, setIsLiked] = useState(isLikedT);
  const [tweetData, setTweetData] = useState(null);

  const navigation = useRouter()

  const dateTime = tweet.date;

  const showFooter = show ? "container" : "dontShowFooter";
  const showIsRetweet = tweet.typeAsString === "ReTweet" ? "reTweet" : "dontRetweet";
  const tweetOrRetweet = show ? "tweet" : "retweet"; 
  const tweetHeaderContainer = show ? "tweetHeaderContainer" : "retweetHeaderContainer"

  const fetchLike = async () => {
    try {
      const response = await Api.getTweet(tweet.id);
      const updatedTweet = response.data;
      const amount = updatedTweet.likes ? Object.keys(updatedTweet.likes).length : 0;
      setlikesAmount(amount);
      setIsLiked(prevState => !prevState);
    } catch (error) {
      console.error("Error al obtener los likes del tweet:", error);
    }
  };

  const handleComment = (typeInteraction) => {
    navigation.push({pathname: "/interaction", params: {typeInteraction: typeInteraction, tweetReference: tweet.id, username: tweet.user.username, userId: tweet.user.id}})
  };

  const handleLike = async () => {
    try {
      await Api.putLike(tweet.id);
      fetchLike();
    } catch (error) {}
  };

  const handleRedirectTo = (tweetRender) => {  
    navigation.push({ pathname:"/FullTweet",  params: {
      tweetId: tweetRender.id
    }
    });
  };

  const handleUserProfile = (id) => {
   navigation.push({ pathname: "/profile", params: {userId: id}})
  };

  useEffect(() => {
    Api.getTweet(tweet.id)
      .then(updatedTweet => {
        setTweetData(updatedTweet?.data);
      })
      .catch(error => {
        console.error(error, "?????????????????????????");
      });
  }, []);
  
  const retweet = () => {
    if (tweet.typeAsString === "ReTweet") {
      if (tweetData && tweetData.type && tweetData.type.tweet) {
        const tweetARenderizar = tweetData.type.tweet;
        return (
          <View>
            <Tweet
              tweet={tweetARenderizar}
              show={false}
            />
          </View>
        );
      }
    }
    return null;
  };

  return (
    <View style={styles[tweetOrRetweet]}>
    <View style={styles[tweetHeaderContainer]}>
      <View style={styles.tweetHeaderNames}>
        <Avatar
          rounded
          source={tweet.user.image ? { uri: tweet.user.image } : undefined}
          size="small"
          onPress={() => handleUserProfile(tweet.user.id)}
        />
        <Text style={styles.username}>@{tweet.user.username}</Text>
        <Text style={styles.createdAt}>- {moment(tweet.date).fromNow()}</Text>
      </View>
    </View>
    <View >
      <Text style={styles.content} onPress={() => handleRedirectTo(tweet)}>{tweet.content} </Text>
    </View>
        {retweet()}
        {tweet.type?.image &&
          (<TouchableOpacity onPress={() => handleRedirectTo(tweet)}>
              <Image source={{ uri: tweet.type.image }} style={styles.image} />
            </TouchableOpacity> 
          )
        }
        <View style={styles[showFooter]}>
          <View style={styles.tweet__footerIcon}>
            <FontAwesome5 name="comment" size={24} color="black" onPress={() => handleComment("Reply")}/>
            <Text style={styles.tweet__footerIconCount}>{tweet.repliesAmount}</Text>
          </View>
          <View style={styles.tweet__footerIcon}>
          <Feather name="refresh-cw" size={24} color="black" onPress={() => handleComment("ReTweet")}/>
            <Text style={styles.tweet__footerIconCount}>{tweet.reTweetAmount}</Text>
          </View>
          <View style={styles.tweet__footerIcon}>
            {isLiked ? (
              <AntDesign name="heart" size={24} color= 'rgb(249, 24, 128)' onPress={() => handleLike()} />
            ) : (
              <AntDesign name="hearto" size={24} color='rgba(0, 0, 0, 0.54)' onPress={() => handleLike()} />  
            )}
            <Text style={styles.tweet__footerIconCount}>{likesAmount}</Text>
          </View>
      </View>
      <View style={styles[showIsRetweet]}>
      <Feather name="refresh-cw" size={16} color="black" />
        <Text style={styles.reTweetText}>You Retweeted</Text>
      </View>
    </View>
  )};


export default Tweet;


const styles = StyleSheet.create({
  tweet: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    paddingBottom: 10, 
  },
  retweet: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10, 
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingBottom: 10,
  },
    retweetHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    tweetHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tweetHeaderNames: {
      flexDirection: 'row',
    },
    username: {
      marginLeft: 5, 
      marginRight: 5,
      color: 'grey',
      fontSize: 16, 
    },
    createdAt: {
      fontStyle: 'italic',
      marginTop:3, 
      marginLeft: 5, 
      marginRight: 5,
      color: 'grey',
    },
    content: {
      marginLeft:40,
      marginTop: 5,
      lineHeight: 18,
      marginRight:20, 
      marginBottom: 20, 
    },
    image: {  
      alignSelf: 'center', 
      marginVertical: 20,
      width: '90%', 
      aspectRatio: 1, 
      borderRadius: 15,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
      alignItems: 'center',
      paddingHorizontal: 60,
      paddingBottom: 10,
    },
    tweet__footerIcon: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tweet__footerIconCount: {
      marginLeft: 10,
      color: 'grey',
      textAlign: 'center'
    },
    dontShowFooter: {
      display: 'none',
    },
    dontRetweet: {
      display: 'none',
      marginRight: 10,
    },
    reTweet: {
      flexDirection: 'row',
      fontStyle: 'italic',
      fontSize: 5,
      marginRight: 10,
      position: 'absolute',
      top: 10, 
      right: 10,
    },
    reTweetText: {
      marginLeft: 10, 
    },
  });
  
  //   tweet__avatar: {
  //     borderRadius: 30,
  //     marginRight: 10,
  //     marginTop: 10,
  //     marginLeft: 10,
  //     width: 60,
  //     height: 60,
  //   },
  //   tweet__body: {
  //     flex: 1,
  //     backgroundColor: 'white',
  //     marginLeft: 10,
  //     borderRadius: 10,
  //   },
  //   tweet__header: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //   },
  //   tweet__headerUsername: {
  //     flex: 1,
  //     textAlign: 'left',
  //     marginTop: 10,
  //   },
  //   tweet__username: {
  //     fontStyle: 'italic',
  //     fontSize: 10,
  //   },
  //   tweet__date: {
  //     fontSize: 10,
  //     color: 'gray',
  //     marginLeft: 30,
  //     fontStyle: 'italic',
  //   },
  //   tweet__headerDescription: {
  //     fontStyle: 'italic',
  //     flex: 1,
  //     fontSize: 14,
  //   },
  //   tweet__footer: {
  //     display: 'flex',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     marginTop: 4,
  //     cursor: 'pointer',
  //     marginBottom: 10,
  //   },
  //   tweet__footerIcon: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     marginRight: 5,
  //     color: 'gray',
  //     cursor: 'pointer',
  //   },
  //   tweet__footerIconLike: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     marginRight: 150,
  //     color: 'gray',
  //     cursor: 'pointer',
  //   },
  //   tweet__footerIconChat: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     marginLeft: 100,
  //     color: 'gray',
  //     cursor: 'pointer',
  //   },
  //   tweet__footerCount: {
  //     fontSize: 12,
  //     marginLeft: 2,
  //     color: 'gray',
  //   },
  //   dontShowFooter: {
  //     display: 'none',
  //   },

  // });