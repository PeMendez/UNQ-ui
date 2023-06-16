import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather} from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import Api from "../api/api";
import moment from 'moment';
import 'moment-timezone';
import { Avatar } from 'react-native-elements';

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
        <Avatar
          rounded
          source={tweet.user.image ? { uri: tweet.user.image } : undefined}
          size="small"
          onPress={() => handleUserProfile()}
        />
        <Text style={styles.username}>@{tweet.user.username}</Text>
        <Text style={styles.createdAt}>- {moment(tweet.date).fromNow()}</Text>
      </View>
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
            <Text> </Text>
          )}
        <View style={styles[showFooter]}>
          <View style={styles.tweet__footerIcon}>
            <FontAwesome5 name="comment" size={24} color="black" onPress={() => handleComment(true)}/>
            <Text style={styles.tweet__footerIconCount}>{tweet.repliesAmount}</Text>
          </View>
          <View style={styles.tweet__footerIcon}>
          <Feather name="refresh-cw" size={24} color="black" onPress={() => handleComment(false)}/>
            {/* <EvilIcons name="retweet" size={34} color="black" onPress={() => handleComment(false)}/> */}
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
    marginVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    paddingBottom: 10, 
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