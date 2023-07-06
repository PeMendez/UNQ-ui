import React, {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import "../../styles/tweet/PopUpCommentTweet.css"
import Api from '../../api/Api';
import { useNavigate } from "react-router-dom";

function PopUpCommentTweet({ onClose, id, isComment }) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const navigate = useNavigate();

  const sendTweet = (id) => {
    if(isComment){
      Api.postReply(id, tweetMessage, tweetImage)

      setTweetMessage("");
      setTweetImage(""); 
  
    } else {
      Api.postReTweet(id, tweetMessage)

      setTweetMessage("");
    }
    
    onClose(); 
    navigate(`/tweet/${id}`);  
  };

  const popUpComment = isComment ? 'popup-comment-tweet__textarea' : 'dontShowImageArea';

  return (
    <div className="popup-comment-tweet">
      <div className="popup-comment-tweet__header">
          <CloseIcon className="popup-comment-close" fontSize="small" onClick={onClose}/>
      </div>
      <div className="popup-comment-tweet__content">
        <TextareaAutosize
          onChange={(e) => setTweetMessage(e.target.value)}
          value={tweetMessage}
          className="popup-comment-tweet__textarea"
          placeholder="Write a comment..."
          rowsMin={3}
        />
        <TextareaAutosize
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className={popUpComment}
          placeholder="Optional: Enter image URL"
          type="text"
        />
        <Button className="popup-comment-tweet__reply-button" onClick={() => sendTweet(id)}>
          {isComment ? "Reply" : "Retweet"}
        </Button>
      </div>
    </div>
  );
}

export default PopUpCommentTweet;