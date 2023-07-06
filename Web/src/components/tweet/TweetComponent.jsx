import "../../styles/home/Feed.css";
import Tweet from "../../components/tweet/Tweet.jsx";
import React, { useState, useEffect } from 'react';
import Api from '../../api/Api';


const TweetComponent = ({tweet}) => {

    const [tweetsWithLike, setTweetsWithLike] = useState([]);

    const fetchLoggedUser = async () => {
        try {
          const response = await Api.getLoggedUser();
          return response.data
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        fetchLoggedUser()
          .then(loggedUserResponse => {
            const promises = tweet.replies.map(tweet => {
              let isLiked = !!tweet.likes.find(user => user.id === loggedUserResponse.id);
              return { ...tweet, isLiked };
            });
            console.log(promises)
            setTweetsWithLike(promises);
          })
          .catch(error => {
            console.log(error);
          });
      }, [tweet]);
      

    const reTweetAmount = tweet && tweet.reTweet ? tweet.reTweet.length : 0;
    const repliesAmount = tweet && tweet.replies ? tweet.replies.length : 0;

    
    const actualizarTweet = (tweetActualizar) => {
        setTweetsWithLike((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
       
      };

    return (
        <div>
            <div>
            <Tweet
                key={tweet.id}
                id={tweet.id}
                content={tweet.content}
                profile_pic={tweet.user.image}
                date={tweet.date}
                repliesAmount={repliesAmount}
                reTweetAmount={reTweetAmount}
                likes={tweet.likes}
                username={tweet.user.username}
                image={tweet.type.image}
                typeAsString={tweet.typeAsString}
                userId={tweet.user?.id}
                isLikedT={tweet.isLiked}
                show={true}
            />
            </div>
            <div>
                {repliesAmount > 0 ? (
                    tweetsWithLike?.map((reply) => (
                        <Tweet
                            key={reply.id}
                            id={reply.id}
                            content={reply.content}
                            profile_pic={reply.user.image}
                            date={reply.date}
                            repliesAmount={reply.repliesAmount}
                            reTweetAmount={reply.reTweetAmount}
                            likes={reply.likes}
                            username={reply.user.username}
                            isLikedT={reply.isLiked}
                            actualizar={actualizarTweet}
                            userId={reply.user?.id}
                        />
                    ))
                ) : (
                    <p>Tweet your reply!</p>
                )}
            </div>
        </div>
    );
}


export default TweetComponent;