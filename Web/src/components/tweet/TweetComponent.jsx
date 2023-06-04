import React, { useState, useEffect } from "react";
import "../../styles/home/Feed.css";
import Tweet from "../../components/tweet/Tweet.jsx";
import Api from "../../api/Api";

const TweetComponent = ({tweet}) => {

    // const [user, setUser] = useState([]);
    // const [replies, setReplies] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [loggedUser, setLoggedUser] = useState("");
    const [isLiked, setIsLiked] = useState(false);

    const fetchLoggedUser = async () => {
        try {
          const response = await Api.getLoggedUser();
          setLoggedUser(response.data);
          return response.data
        } catch (error) {
          console.error(error);
        }
      };
console.log(tweet.likes?.length)
      useEffect(() => {
        fetchLoggedUser()
          .then(loggedUserResponse => {
            setIsLiked(tweet.likes.some(user => user.id === loggedUserResponse.id));
          })
          .catch(error => {
            console.log(error);
          });
      }, [tweet.likes]);      

    const reTweetAmount = tweet && tweet.reTweet ? tweet.reTweet.length : 0;
    const repliesAmount = tweet && tweet.replies ? tweet.replies.length : 0;

    const actualizarTweet = (tweetActualizar) => {
        setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
       
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
                type={tweet.type}
                typeAsString={tweet.typeAsString}
                tweetTypeID={tweet.tweetTypeID}
                userId={tweet.user?.id}
                isLikedT={isLiked}
                actualizar={actualizarTweet}
            />
            </div>
            <div>
                {repliesAmount > 0 ? (
                    tweet.replies.map((reply) => (
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
                            //userID={tweet.tweetTypeID.usedID}
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