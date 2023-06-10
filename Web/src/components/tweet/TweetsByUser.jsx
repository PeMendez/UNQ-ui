import React, { useState, useEffect } from 'react';
import Api from '../../api/Api';
import Tweet from '../../components/tweet/Tweet.jsx';

const TweesByUser = ({user}) =>{

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
    if (user && user.tweets) {
      const promises = user.tweets.map(tweet => {
        let isLiked = !!tweet.likes.find(user => user.id === loggedUserResponse.id);
        return { ...tweet, isLiked };
      });
      return Promise.all(promises)
        .then(tweetsWithProfilePics => {
          setTweets(tweetsWithProfilePics);
        });
    }})
    .catch(error => {
      console.log(error);
    });
  }, [user]);

  const actualizarTweet = (tweetActualizar) => {
    setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
   
  };


  return (
    <div>
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
          isLikedT={tweet.isLiked}
          actualizar={actualizarTweet}
          show={true}
          />
        ))
      ) : (
        <p>Aún no has hecho ningún tweet.</p>
      )}
    </div>
  );
}

export default TweesByUser;


