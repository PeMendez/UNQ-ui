import React, { useState, useEffect } from 'react';
import Tweet from '../../components/tweet/Tweet.jsx';

const TweesByUser = ({user}) =>{

  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    if (user && user.tweets) {
      setTweets(user.tweets);
    }
  }, [user]);

  return (
    <div>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            content={tweet.content}
            profile_pic={user.image}
            date={tweet.date}
            repliesAmount={tweet.repliesAmount}
            reTweetAmount={tweet.reTweetAmount}
            likes={tweet.likes}
            username={user.username}
            userId={user.id}   
            image={tweet.type.image}         
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

export default TweesByUser;


