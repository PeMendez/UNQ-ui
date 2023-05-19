import React, { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { Avatar } from "@mui/material";
import GetTweetsByUser from '../tweet/TweetsUserLogged';
import "../../styles/user/UserComponent.css"

const User = () => {

  const [loggedUser, setLoggedUser] = useState(null);
  
    useEffect(() => {
      (async () => {
        try {
          const response = await Api.getLoggedUser();
          setLoggedUser(response.data);
        } catch (error) {
          console.error(error);
        }
      })();
    }, []);


    const followersAmount = loggedUser ? Object.keys(loggedUser.followers).length : 0;
    const followingAmount = loggedUser ? Object.keys(loggedUser.following).length : 0;

    return (
      <div className='user_profile'>
        <img className="user_background" src={loggedUser?.backgroundImage} alt="Descripción de la imagen"/>
        {loggedUser && (
        <div>
            <div className='user_avatar'>
            <Avatar src={loggedUser.image} alt={loggedUser.username} style={{ width: 100, height: 100 }}/></div>
            <div className='user_info'><p>@{loggedUser.username}</p>
            </div>
            <div className='user_stats'>
                <p>Followers {followersAmount}</p>
                <p>Following {followingAmount}</p>
            </div>
        </div>
        )}
        <GetTweetsByUser/>
      </div>
    );
}



export default User