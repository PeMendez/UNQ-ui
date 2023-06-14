import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text} from "react-native";
import Api from "../api/api";
import Tweet from './Tweet';

const GetFollowingTweets = ({loggedUser}) => {
  const [tweets, setTweets] = useState([]);

//   const fetchLoggedUser = async () => {
//     try {
//       const response = await Api.getLoggedUser();
//       return response.data
//     } catch (error) {
//       console.error(error);
//     }
//   };

useEffect(() => {
    Api.getFollowingTweets().then(console.log)
}, [])

//   useEffect(() => {
//     //fetchLoggedUser()
//       //.then(loggedUserResponse => {
//         //return 
//         Api.getFollowingTweets()
//           .then(response => {
//             console.log(response)
//             if (response && response.data && Array.isArray(response.data.result)) {
//               const promises = response.data.result.map(tweet => {
//                 let isLiked = !!tweet.likes.find(user => user.id === loggedUser.id);
//                 return { ...tweet, isLiked };
//               });
//               return Promise.all(promises)
//                 .then(tweetsWithProfilePics => {
//                   setTweets(tweetsWithProfilePics);
//                 });
//             }
//           })
//       //})
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);
  
  const actualizarTweet = (tweetActualizar) => {
    setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
   
  };

  return (
    <View>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <Tweet
            tweet={tweet}
            isLikedT={tweet.isLiked}
            actualizar={actualizarTweet}
            show={true}
          />
        ))
      ) : (
        <Text>No se encontraron tweets.</Text>
      )}
    </View>
  );
}

export default GetFollowingTweets;
