import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHeart as lightHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faComment as lightComment } from '@fortawesome/free-regular-svg-icons/faComment';
import { faCircle as solidCircleUser } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faRetweet as solidRetweet } from '@fortawesome/free-solid-svg-icons/faRetweet';
import Api from "../api/api";
import moment from 'moment';
import 'moment-timezone';

const Tweet = ({ tweet, actualizarTweet, show, isLikedT }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tweetId, setTweetId] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const [likesAmount, setlikesAmount] = useState(tweet.likes?.length);
  const [isLiked, setIsLiked] = useState(isLikedT);
  const [tweetData, setTweetData] = useState(null);

  const dateTime = tweet.date;
  const formattedDateTime = moment(dateTime).format('D MMMM YYYY, HH:mm');

  const showFooter = show ? "tweet__footer" : "dontShowFooter";
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
    navigate(`/tweet/${tweetID}`);
  };

  const handleUserProfile = () => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    Api.getTweet(tweet.id)
      .then(updatedTweet => {
        setTweetData(updatedTweet.data);
      })
      .catch(error => {
        console.error(error);
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
    <View style={styles.tweet}>
      <View style={styles.tweet__avatar}>
        <FontAwesomeIcon icon={solidCircleUser} source={tweet.user.image} onPress={() => handleUserProfile()} />
      </View>
      <View style={styles.tweet__body}>
        <View style={styles.tweet__header}>
          <View style={styles.tweet__headerUsername}>
            <Text style={styles.tweet__username}>@{tweet.user.username}</Text>
            <Text style={styles.tweet__date}>{formattedDateTime}</Text>
          </View>
          <TouchableOpacity style={styles.tweet__headerDescription} onPress={() => handleRedirectTo(tweet.id)}>
            <Text>{tweet.content}</Text>
          </TouchableOpacity>
        </View>
        {retweet()}
        <Image source={tweet.type.image} onPress={() => handleRedirectTo(tweet.id)} />
        <View style={styles[showFooter]}>
          <View style={styles.tweet__footerIconChat}>
            <FontAwesomeIcon icon={lightComment} size="small" onPress={() => handleComment(true)} />
            <Text style={styles.tweet__footerIconCount}>{tweet.repliesAmount}</Text>
          </View>
          <View style={styles.tweet__footerIcon}>
            <FontAwesomeIcon icon={solidRetweet} size="small" onPress={() => handleComment(false)} />
            <Text style={styles.tweet__footerIconCount}>{tweet.reTweetAmount}</Text>
          </View>
          <View style={styles.tweet__footerIconLike}>
            {isLiked ? (
              <FontAwesomeIcon
                icon={solidHeart}
                size="small"
                color='rgb(249, 24, 128)'
                onPress={() => handleLike()}
              />
            ) : (
              <FontAwesomeIcon
                icon={lightHeart}
                size="small"
                color='rgba(0, 0, 0, 0.54)'
                onPress={() => handleLike()}
              />
            )}
            <Text style={styles.tweet__footerIconCount}>{likesAmount}</Text>
          </View>
        </View>
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
      // Estilos para el contenedor principal del tweet
    },
    tweet__avatar: {
      // Estilos para el avatar
    },
    tweet__body: {
      // Estilos para el cuerpo del tweet
    },
    tweet__header: {
      // Estilos para el encabezado del tweet
    },
    tweet__headerUsername: {
      // Estilos para el nombre de usuario y la fecha del tweet
    },
    tweet__username: {
      // Estilos para el nombre de usuario
    },
    tweet__date: {
      // Estilos para la fecha del tweet
    },
    tweet__headerDescription: {
      // Estilos para la descripción del tweet
    },
    tweet__footer: {
      // Estilos para el pie de página del tweet
    },
    dontShowFooter: {
      // Estilos alternativos cuando el pie de página no se muestra
    },
    tweet__footerIconChat: {
      // Estilos para el ícono de comentarios y contador de comentarios
    },
    tweet__footerIconCount: {
      // Estilos para el contador de comentarios
    },
    tweet__footerIcon: {
      // Estilos para el ícono de retweets y contador de retweets
    },
    tweet__footerIconLike: {
      // Estilos para el ícono de corazón y contador de likes
    },
    reTweet: {
      // Estilos para el caso en que el tweet sea un retweet
    },
    dontRetweet: {
      // Estilos alternativos cuando el tweet no es un retweet
    },
  });