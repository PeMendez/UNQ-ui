import React, { useState, useEffect } from 'react';
import Api from '../../api/Api';
import Tweet from './Tweet';

function TrendingTopics() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.getTrendingTopics();
        if (response && response.data && Array.isArray(response.data.result)) {
          const tweetsWithProfilePics = await Promise.all(
            response.data.result.map(async (tweet) => {
              let profile_pic = null;
              let username = null; 
              const userResponse = await Api.getUser(tweet.user.id);
              if (userResponse && userResponse.data && userResponse.data.image) {
                profile_pic = userResponse.data.image;
                username = userResponse.data.username;
              }
              return { ...tweet, profile_pic, username };
            })
          );
          setTweets(tweetsWithProfilePics);
        }
        setTweets(response.data.result)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <h6>Trending Topics</h6>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <Tweet
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
            tweetTypeID={tweet.tweetTypeID}
          />
        ))
      ) : (
        <p>No se encontraron tweets.</p>
      )}
    </div>
  );
}

export default TrendingTopics;
