import React, {useState, useEffect} from 'react';
import "../../styles/tweet/Tweet.css";
import { Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import PopUpCommentTweet from './PopUpCommentTweet';
import Api from '../../api/Api';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment-timezone';

const Tweet = (props) => {
  const {key, id, typeAsString ,image, content, date, profile_pic, 
          likes, repliesAmount, reTweetAmount, username, userId, isLikedT, show } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tweetId, setTweetId] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const [likesAmount, setlikesAmount] = useState(likes?.length);
  const [isLiked, setIsLiked] = useState(isLikedT)
  const [tweet, setTweet] = useState(null)

  const navigate = useNavigate();
  const dateTime = date;
  const formattedDateTime = moment(dateTime).format('D MMMM YYYY, HH:mm');

  const showFooter = show ? "tweet__footer" : "dontShowFooter"  
  const showIsRetweet = typeAsString === "ReTweet" ? "reTweet" : "dontRetweet" 

const fetchLike = async () => {
  try {
    const response = await Api.getTweet(id);
    const updatedTweet = response.data;
    const amount = updatedTweet.likes ? Object.keys(updatedTweet.likes).length : 0;
    setlikesAmount(amount);
    setIsLiked(prevState => !prevState)
  } catch (error) {
    console.error("Error al obtener los likes del tweet:", error);
  }
};

  const handleComment = (isReply) => {
    setTweetId(id)
    setIsPopupOpen(true)
    setIsComment(isReply)
  };

  const handleLike = async () => {
    try{
      await Api.putLike(id);
      fetchLike()
    } catch (error){}
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleRedirectTo = (tweetID) => {
    navigate(`/tweet/${tweetID}`);
  };

  const handleUserProfile = () => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    if ({id}){
      Api.getTweet(id)
        .then(updatedTweet => {
          setTweet(updatedTweet.data);
        })
        .catch(error => {
          console.error(error, "??????????");
        });
    }
  }, [id]);
  

  const retweet = () => { 
    if(typeAsString === "ReTweet") {
      if (tweet && tweet.type && tweet.type.tweet){
        const tweetARenderizar = tweet.type.tweet;
          return (
            <div>
              <Tweet
                key={tweetARenderizar.id}
                id={tweetARenderizar.id}
                content={tweetARenderizar.content}
                profile_pic={tweetARenderizar.user.image}
                date={tweetARenderizar.date}
                username={tweetARenderizar.user.username}
                image={tweetARenderizar.type.image}
                userId={tweetARenderizar.user.id}
                show={false}
              />
            </div>
          );
      }
    }
      return null;
  }

  return (
    <div className='tweet'>
              <div className='tweet__avatar'>
                <Avatar src={profile_pic} onClick={() => handleUserProfile()}/>
              </div>
              <div className='tweet__body'>
                <div className="tweet__header">
                <div className="tweet__headerUsername">
                    <span className="tweet__username">@{username}</span>                    
                    <span className="tweet__date">{formattedDateTime}</span>
                </div>
                <div className="tweet__headerDescription" onClick={() => handleRedirectTo(id)}>
                  <p>{content}</p>
                </div>
              </div>
              {retweet()}
              <img src={image} alt="" onClick={() => handleRedirectTo(id)} />
              <div className={showFooter}>
                <div className='tweet__footerIconChat'>
                  <ChatBubbleOutlineIcon fontSize="small" onClick={() => handleComment(true)}/>
                  <span className="tweet__footerIconCount">{repliesAmount}</span>
                </div>
                <div className='tweet__footerIcon'>
                  <RepeatIcon fontSize="small" onClick={() => handleComment(false)}/>
                  <span className="tweet__footerIconCount">{reTweetAmount}</span>
                </div>
                <div className='tweet__footerIconLike'>
                  <FavoriteTwoToneIcon
                    fontSize="small"
                    style={{ color: isLiked ? 'rgb(249, 24, 128)' : 'rgba(0, 0, 0, 0.54)' }}
                    onClick={() => handleLike()}
                  />
                  <span className="tweet__footerIconCount">{likesAmount}</span>
                </div>
              </div> 
              </div>
              <div className={showIsRetweet}>
                  <p> is Retweet</p>
              </div>
              {isPopupOpen && <PopUpCommentTweet onClose={handlePopupClose} id={tweetId} isComment={isComment} />}
      </div>
    );
  }


export default Tweet;