import React, {useState} from 'react';
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

const Tweet = (props, actualizarTweet) => {
  const {key, id, type, typeAsString, tweetTypeID ,image, content, date, profile_pic, 
          likes, repliesAmount, reTweetAmount, username, userId, isLikedT } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tweetId, setTweetId] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const [likesAmount, setlikesAmount] = useState(likes?.length);
  const [reTweetedFrom, setReTweetedFrom] = useState([]);
  const [reTweetID, setReTweetID] = useState([]);
  const [isLiked, setIsLiked] = useState(isLikedT)
  const [isRetweet, setIsRetweet] = useState(null)
  
  const navigate = useNavigate();
  const dateTime = date;
  const formattedDateTime = moment(dateTime).format('D MMMM YYYY, HH:mm');
  

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

  console.log(typeAsString)
  // const retweet = async (id) => {
  //   if(typeAsString === "ReTweet"){
  //     setIsRetweet( await Api.getTweet(id));  
  //     if (isRetweet){
  //       const tweetARenderizar = isRetweet.type.tweet;
  //         return (
  //           <div className="quote-tweet">
  //             <Tweet
  //               key={tweetARenderizar.id}
  //               id={tweetARenderizar.id}
  //               content={tweetARenderizar.content}
  //               profile_pic={tweetARenderizar.user.image}
  //               date={tweetARenderizar.date}
  //               username={tweetARenderizar.user.username}
  //               image={tweetARenderizar.type.image}
  //               userId={tweetARenderizar.user.id}
  //             />
  //           </div>
  //         );
  //     }
  //     return null;
  //   }
  // }
  // const retweetContent = retweet(id);

  return (
    <div className='tweet'>
              <div className='tweet__avatar'>
                <Avatar src={profile_pic} onClick={() => handleUserProfile()} style={{ width: 60, height: 60 }}/>
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
              {/* {retweet(id)} */}
              <img src={image} alt="" onClick={() => handleRedirectTo(id)} />
              <div className='tweet__footer'>
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
              <div className={typeAsString}>
                  <p  onClick={() => handleRedirectTo(reTweetID)}> retweeted from @{reTweetedFrom}</p>
              </div>
              {isPopupOpen && <PopUpCommentTweet onClose={handlePopupClose} id={tweetId} isComment={isComment} />}
      </div>
    );
  }


export default Tweet;