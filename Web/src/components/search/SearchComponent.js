import React, { useState, useEffect} from 'react';
import Tweet from '../../components/tweet/Tweet.jsx';
import Api from '../../api/Api.js'
import '../../styles/search/SearchComponent.css'
import { useParams } from 'react-router-dom';

const SearchComponent = () => {

    const { searchText } = useParams();
    const [tweets, setTweets] = useState([])  

useEffect(() => {
  (async () => {
       try {
          const response = await Api.getSearch(searchText);
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
        } catch (error) {
          console.log(error);
        }
      })();
    }, [searchText]);

    console.log('???????????????????????',searchText)

  return (
    <div>
      <h2 className="result-search">Result Search</h2>
      {tweets?.length > 0 ? (
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
        <p className="no-matches">No hay tweets que coincidan con { searchText }.</p>
      )}
    </div>
  );
}

export default SearchComponent;
