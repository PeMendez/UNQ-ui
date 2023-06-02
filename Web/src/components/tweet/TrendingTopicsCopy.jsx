import React, { useState, useEffect } from 'react';
import Api from '../../api/Api';
import Tweet from './Tweet';

function TrendingTopics() {
  const [tweets, setTweets] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");

  
  const fetchLoggedUser = async () => {
    try {
      const response = await Api.getLoggedUser();
      setLoggedUser(response.data);
      return response.data
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
    setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
   
  };


  return (
    <div>
      <h6>Trending Topics</h6>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
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

export default TrendingTopics;
