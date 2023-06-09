import React from "react";
import { useNavigate } from "react-router-dom";
import  "../../styles/home/NotFoundPage.css"

const NotFoundPage = () => {

  const isLogged = !!localStorage.getItem("authorization_token");
  
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/user/followingTweets"); 
  };
  
  const handleNavigateLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className="not-found-page">
      <img
        src="https://digiday.com/wp-content/uploads/sites/3/2023/01/twitter-flatline-digiday-gif.gif?w=800&h=466&crop=1"
        alt="Error 404"
        className="error-image"
      />
      <button className="navigate-home-button" onClick={isLogged ? handleNavigateHome : handleNavigateLogin}>
        <span className="navigate-home-button-text">Back</span>
      </button>
    </div>
  );
};

export default NotFoundPage;