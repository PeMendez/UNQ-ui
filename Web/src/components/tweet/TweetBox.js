import React, { useState, useEffect } from 'react';
import "../../styles/tweet/TweetBox.css";
import { Avatar,Button } from "@mui/material";
import Api from "../../api/Api.js";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const TweetBox = () => {
  
  const [invalidData, setInvalidData] = useState(false);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const navigate = useNavigate();

  const fetchLoggedUser = async () => {
    try {
      const response = await Api.getLoggedUser();
      setLoggedUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendTweet = (e) => {
      e.preventDefault()
      Api.postTweet(tweetMessage, tweetImage, setInvalidData)
      .catch((error) => {
        toast.error("Content cannot be empty")}
      )
      .finally(() => {
        setTweetMessage("");
        setTweetImage("");    
      });
    }

    // 
    // Api.postTweet(tweetMessage, tweetImage, setInvalidData)

    // setTweetMessage("");
    // setTweetImage("");    

  useEffect(() => {
    fetchLoggedUser();
    
   //toast.error("queres que desactive las notificaciones?")
    const textarea = document.querySelector(".tweetBox__input > textarea");
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, []);

  const handleRedirectTo = () => {
    navigate(`/user`, { replace: true });
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={loggedUser.image} alt={loggedUser.username} onClick={() => handleRedirectTo()} />
          <textarea
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button onClick={sendTweet} type="submit" className="tweetBox__tweetButton">
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;