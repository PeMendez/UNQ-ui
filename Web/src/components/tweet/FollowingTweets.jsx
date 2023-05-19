import React, { useState, useEffect } from 'react';
import Api from '../../api/Api';
import Tweet from '../../components/tweet/Tweet';

const GetFollowingTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");

  const fetchLoggedUser = async () => {
    try {
      const response = await Api.getLoggedUser();
      setLoggedUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchLoggedUser();

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.getFollowingTweets();
        
        if (response && response.data && Array.isArray(response.data.result)) {
          const tweetsWithProfilePics = await Promise.all(
            response.data.result.map(async (tweet) => {
              let isLiked = !!tweet.likes.find(async (user) => {
                return user.id === loggedUser.id; })

              //const isLiked = response.data.result.likes?.some(obj => obj.id === loggedUser.id)
              console.log(isLiked)
              let profile_pic = null;
              let username = null; 
              const userResponse = await Api.getUser(tweet.user.id);
              if (userResponse && userResponse.data && userResponse.data.image) {
                profile_pic = userResponse.data.image;
                username = userResponse.data.username;
              }
              return { ...tweet, profile_pic, username, isLiked };
            })
          );
          setTweets(tweetsWithProfilePics);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const actualizarTweet = (tweetActualizar) => {
    tweets.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet))
  };

  return (
    <div>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            content={tweet.content}
            profile_pic={tweet.profile_pic}
            date={tweet.date}
            repliesAmount={tweet.repliesAmount}
            reTweetAmount={tweet.reTweetAmount}
            likes={tweet.likes}
            username={tweet.username}
            image={tweet.type.image}
            userId={tweet.user.id}
            typeAsString={tweet.typeAsString}
            type={tweet.type}
            tweetTypeID={tweet.tweetTypeID}
            isLikedT={tweet.isLiked}
            actualizar={actualizarTweet}
          />
        ))
      ) : (
        <p>No se encontraron tweets.</p>
      )}
    </div>
  );
}

export default GetFollowingTweets;
