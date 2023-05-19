import React, { useState, useEffect } from 'react';
import Api from '../../api/Api';
import Tweet from './Tweet.jsx';

const GetTweetsByUser = () => {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState([]);
  const [pictureProfile, setPictureProfile] = useState([]);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.getLoggedUser();
          setTweets(response.data.tweets);
          setUsername(response.data.username);
          setPictureProfile(response.data.image);
          setUserId(response.data.id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <Tweet
            id={tweet.id}
            content={tweet.content}
            profile_pic={pictureProfile}
            date={tweet.date}
            repliesAmount={tweet.repliesAmount}
            reTweetAmount={tweet.reTweetAmount}
            likes={tweet.likes}
            username={username}
            image={tweet.type.image}
            userId={userId}
            typeAsString={tweet.typeAsString}
            tweetTypeID={tweet.tweetTypeID}
          />
        ))
      ) : (
        <p>Aún no has hecho ningún tweet.</p>
      )}
    </div>
  );
}

export default GetTweetsByUser;
