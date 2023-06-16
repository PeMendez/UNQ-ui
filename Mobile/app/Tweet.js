import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import Api from "../api/api";
import moment from 'moment';
import 'moment-timezone';

const Tweet = ({tweet, actualizarTweet, show, isLikedT }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tweetId, setTweetId] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const [likesAmount, setlikesAmount] = useState(tweet.likes?.length);
  const [isLiked, setIsLiked] = useState(isLikedT);
  const [tweetData, setTweetData] = useState(null);

  const dateTime = tweet.date;
  const formattedDateTime = moment(dateTime).format('D MMMM YYYY, HH:mm');

  const showFooter = show ? "container" : "dontShowFooter";
  const showIsRetweet = tweet.typeAsString === "ReTweet" ? "reTweet" : "dontRetweet";

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

  const handleComment = (isReply) => {
    setTweetId(tweet.id);
    setIsPopupOpen(true);
    setIsComment(isReply);
  };

  const handleLike = async () => {
    try {
      await Api.putLike(tweet.id);
      fetchLike();
    } catch (error) {}
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleRedirectTo = (tweetID) => {
    //navigate(`/tweet/${tweetID}`);
  };

  const handleUserProfile = () => {
   // navigate(`/user/${userId}`);
  };

  // useEffect(() => {
  //   Api.getTweet(tweet.id)
  //     .then(updatedTweet => {
  //       setTweetData(updatedTweet?.data);
  //     })
  //     .catch(error => {
  //       console.error(error, "?????????????????????????");
  //     });
  // }, []);
  
  const retweet = () => {
    // if (tweet.typeAsString === "ReTweet") {
    //   if (tweetData && tweetData.type && tweetData.type.tweet) {
    //     const tweetARenderizar = tweetData.type.tweet;
    //     return (
    //       <View>
    //         <Tweet
    //           tweet={tweetARenderizar}
    //           show={false}
    //         />
    //       </View>
    //     );
    //   }
    // }
    // return null;
  };

  return (
    <View style={styles.tweet}>
    <View style={styles.tweetHeaderContainer}>
      <View style={styles.tweetHeaderNames}>
        <Text style={styles.username}>@{tweet.user.username}</Text>
        <Text style={styles.createdAt}>{moment(tweet.date).fromNow()}</Text>
      </View>
      <Entypo name={"chevron-down"} size={16} color={'grey'}/>
    </View>
    <View>
      <Text style={styles.content}>{tweet.content}</Text>
      {/* {!!tweet.type.image && <S3Image style={styles.image} imgKey={tweet.type.image} />} */}
    </View>
      {/* <View style={styles.tweet__avatar}>
        <FontAwesome name="user-circle-o" size={24} source={tweet.user.image} onPress={() => handleUserProfile()} />
      </View> */}
      {/* <View style={styles.tweet__body}>
         <View style={styles.tweet__header}> */}
          {/* <View style={styles.tweet__headerUsername}>
            <Text style={styles.tweet__username}>@{tweet.user.username}</Text>
            <Text style={styles.tweet__date}>{formattedDateTime}</Text>
          </View> */}
          {/* <TouchableOpacity style={styles.tweet__headerDescription} onPress={() => handleRedirectTo(tweet.id)}>
            <Text>{tweet.content}</Text>
          </TouchableOpacity> */}
        {/* </View>  */}
        {retweet()}
        {tweet.type?.image ? (
          <Image source={{ uri: tweet.type.image }} onPress={() => handleRedirectTo(tweet.id)} style={styles.image} /> )
          : (
            <Text> aca no hay imagen </Text>
          )}
        <View style={styles[showFooter]}>
          <View style={styles.tweet__footerIcon}>
            <FontAwesome5 name="comment" size={24} color="black" onPress={() => handleComment(true)}/>
            <Text style={styles.tweet__footerIconCount}>{tweet.repliesAmount}</Text>
          </View>
          <View style={styles.tweet__footerIcon}>
            <EvilIcons name="retweet" size={34} color="black" onPress={() => handleComment(false)}/>
            {/* <FontAwesome5 name="retweet" size={24} color="black" onPress={() => handleComment(false)}/>             */}
            <Text style={styles.tweet__footerIcon}>{tweet.reTweetAmount}</Text>
          </View>
          <View style={styles.tweet__footerIcon}>
            {isLiked ? (
              <AntDesign name="heart" size={24} color= 'rgb(249, 24, 128)' onPress={() => handleLike()} />
            ) : (
              <AntDesign name="hearto" size={24} color='rgba(0, 0, 0, 0.54)' onPress={() => handleLike()} />  
            )}
            <Text style={styles.tweet__footerIconCount}>{likesAmount}</Text>
          </View>
        {/* </View> */}
      </View>
      <View style={styles[showIsRetweet]}>
        <Text>is Retweet</Text>
      </View>
      {isPopupOpen && <PopUpCommentTweet onClose={handlePopupClose} id={tweetId} isComment={isComment} />}
    </View>
  )};


export default Tweet;


const styles = StyleSheet.create({
    tweet: {
      flex: 1,
      marginHorizontal: 10,
    },
    tweetHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tweetHeaderNames: {
      flexDirection: 'row',
    },
    name: {
      marginRight: 5,
      fontWeight: 'bold',
    },
    username: {
      marginRight: 5,
      color: 'grey',
    },
    createdAt: {
      marginRight: 5,
      color: 'grey',
    },
    content: {
      marginTop: 5,
      lineHeight: 18,
    },
    image: {
      marginVertical: 10,
      width: "100%",
      height: 200,
      resizeMode: 'cover',
      borderRadius: 15,
      overflow: 'hidden',
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
    },
    tweet__footerIcon: {
      flexDirection: "row",
      alignItems: "center"
    },
    tweet__footerIconCount: {
      marginLeft: 5,
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
      fontStyle: 'italic',
      fontSize: 5,
      marginRight: 10,
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