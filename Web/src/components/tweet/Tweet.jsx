import React, {useState, useEffect} from 'react';
import "../../styles/tweet/Tweet.css";
import { Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { red } from '@mui/material/colors';
import PopUpCommentTweet from './PopUpCommentTweet';
import Api from '../../api/Api';
import { useNavigate } from "react-router-dom";

const Tweet = (props, actualizarTweet) => {
  const {key, id, type, typeAsString, tweetTypeID ,image, content, date, profile_pic, 
          likes, repliesAmount, reTweetAmount, username, userId, isLikedT } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tweetId, setTweetId] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const [likesAmount, setlikesAmount] = useState(likes.length);
  const [reTweetedFrom, setReTweetedFrom] = useState([]);
  const [reTweetID, setReTweetID] = useState([]);
  const [tweet, setTweet] = useState([]);
  const [isLiked, setIsLiked] = useState(isLikedT)
  
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (typeAsString === "reTweet" && type !== undefined) {
  //     setReTweetedFromID(type['tweet']['user']['id'])
  //     setReTweetedFrom(type['tweet']['user']['username'])
  //     setReTweetID(type['tweet']['id'])
  //   }
  // }, []);

  // useEffect(() => {
  //   if (likes) {
  //     const amount =  likes.length; 
  //     setlikesAmount(amount);
  //   }
  // }, [likes]);

//   const fetchData = async () => {
//     try {
//       const response = await Api.getTweet(id);
//       const responseUser = await Api.getLoggedUser();
//       setTweet(response.data);
//       const l =!!response?.likes?.find(async (user) => { return user.id === responseUser.data.id ;});
//       setIsLiked(l)
//     } catch (error) {
//       console.error(error);
//     }
// }

// useEffect(()=>{
//   fetchData();
// },[]
// )

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
    //const response = 
    //actualizarTweet(response.data)
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleRedirectTo = (tweetID) => {
    navigate(`/tweet/${tweetID}`, { replace: true });
  };

  const handleUserProfile = () => {
    navigate(`/user/${userId}`, { replace: true });
  };

  return (
    <div className='tweet'>
              <div className='tweet__avatar'>
                <Avatar src={profile_pic} onClick={() => handleUserProfile()}/>
              </div>
              <div className='tweet__body'>
                <div className="tweet__header">
                <div className="tweet__headerUsername">
                  <h3>
                    <span className="tweet__username">@{username}</span>
                  </h3>
                </div>
                <div className="tweet__headerDate">
                  <span className="tweet__date">{date}</span>
                </div>
                <div className="tweet__headerDescription" onClick={() => handleRedirectTo(id)}>
                  <p>{content}</p>
                </div>
              </div>
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
                    style={{ color: isLiked ? red[500] : 'rgba(0, 0, 0, 0.54)' }}
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