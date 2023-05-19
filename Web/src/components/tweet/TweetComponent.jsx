import React, { useState, useEffect } from "react";
import "../../styles/home/Feed.css";
import Tweet from "../../components/tweet/Tweet.jsx";
import Api from "../../api/Api";

const TweetComponent = ({tweet}) => {

    const [user, setUser] = useState([]);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        (async () => {
         try {            
            const user = await Api.getUser(tweet.user.id);
            setUser(user.data);
            const repliesWithProfilePics = await Promise.all(
            tweet.replies.map(async (reply) => {
                let profile_pic = null;
                const userResponse = await Api.getUser(reply.user.id);
                if (userResponse && userResponse.data && userResponse.data.image) {
                    profile_pic = userResponse.data.image;
                  }
                  return { ...reply, profile_pic };
                })
              );
              setReplies(repliesWithProfilePics);
         } catch (error) {
             console.log(error);
         }
        })();
    }, []);

    const reTweetAmount = tweet && tweet.reTweet ? tweet.reTweet.length : 0;
    const repliesAmount = tweet && tweet.replies ? tweet.replies.length : 0;
    //const likesAmount = tweet && tweet.likes ? tweet.likes.length : 0;

    return (
        <div>
            <div>
            <Tweet
                id={tweet.id}
                content={tweet.content}
                profile_pic={user.image}
                date={tweet.date}
                repliesAmount={repliesAmount}
                reTweetAmount={reTweetAmount}
                likes={tweet.likes}
                username={user.username}
                image={tweet.type.image}
                typeAsString={tweet.typeAsString}
                tweetTypeID={tweet.tweetTypeID}
                userId={tweet.user?.id}
            />
            </div>
            <div>
                {repliesAmount > 0 ? (
                    replies.map((reply) => (
                        <Tweet
                            key={reply.id}
                            id={reply.id}
                            content={reply.content}
                            profile_pic={reply.profile_pic}
                            date={reply.date}
                            repliesAmount={reply.repliesAmount}
                            reTweetAmount={reply.reTweetAmount}
                            likes={reply.likes}
                            username={reply.username}
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