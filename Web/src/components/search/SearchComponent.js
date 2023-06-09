import React, { useState, useEffect} from 'react';
import Tweet from '../../components/tweet/Tweet.jsx';
import Api from '../../api/Api.js'
import '../../styles/search/SearchComponent.css'
import { useParams } from 'react-router-dom';

const SearchComponent = () => {

    const { searchText } = useParams();
    const [tweets, setTweets] = useState([])    
    
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
          return Api.getSearch(searchText)
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
    }, [searchText]);
  
    const actualizarTweet = (tweetActualizar) => {
      setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
     
    };

  return (
    <div>
      <h2 className="result-search">Result Search</h2>
      {tweets?.length > 0 ? (
        tweets.map((tweet) => (
          <Tweet
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
            tweetTypeID={tweet.tweetTypeID}
            isLikedT={tweet.isLiked}
            actualizar={actualizarTweet}
          />
        ))
      ) : (
        <p className="no-matches">No hay tweets que coincidan con { searchText }.</p>
      )}
    </div>
  );
}

export default SearchComponent;
