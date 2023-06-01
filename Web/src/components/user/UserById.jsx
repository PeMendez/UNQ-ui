import React, {useEffect, useState} from 'react';
import { Avatar, Button } from "@mui/material";
import TweetsByUser from '../../components/tweet/TweetsByUser.jsx';
import "../../styles/user/UserComponent.css"
import Api from '../../api/Api';

const UserById = ({user}) => {

  const followersAmount = user && user.followers ? Object.keys(user.followers).length : 0;
  const followingAmount = user && user.following ? Object.keys(user.following).length : 0;

  const [loggedUser, setLoggedUser] = useState(null);
  const [teSigo, setTeSigo] = useState();
  const buttonClassName = teSigo ? 'user_button user_button_following' : 'user_button';
  const [hovered, setHovered] = useState(false);
  const [followersAmountRefresh, setFollowersAmountRefresh] = useState(followersAmount);

  useEffect(() => {
    if (user) {
      const amount = user.followers ? Object.keys(user.followers).length : 0;
      setFollowersAmountRefresh(amount);
    }
  }, [user]);

  const fetchData = async () => {
      try {
        const response = await Api.getLoggedUser();
        setLoggedUser(response.data);
        setTeSigo(response.data.following.some(obj => obj.id === user.id));
        console.log("?", response.data.following, user.id, response.data.following.some(obj => obj.id === user.id))
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(()=>{
    fetchData();
  },[]
  )

  const fetchUser = async () => {
    try {
      const response = await Api.getUser(user.id);
      const updatedUser = response.data;
      const amount = updatedUser.followers ? Object.keys(updatedUser.followers).length : 0;
      setFollowersAmountRefresh(amount);
      fetchData()
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };


const onClickFollow = async () => {
  try {
    await Api.putFollowUser(user.id).then(console.log);
    fetchUser();
  } catch (error) {
    console.error("Error al seguir al usuario:", error);
  }
};

const handleMouseEnter = () => {
  setHovered(true);
};

const handleMouseLeave = () => {
  setHovered(false);
};

    return (
      <div className='user_profile'>
        <img className="user_background" src={user?.backgroundImage} alt="Descripción de la imagen"/>
        {user && (
        <div>
            <div className='user_avatar'>
            <Avatar src={user.image} alt={user.username} style={{ width: 100, height: 100 }}/></div>
            <div className='user_info'><p>@{user.username}</p>
            <Button variant="outlined" className={buttonClassName} onClick={onClickFollow} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {teSigo && !hovered ? 'Following' : (teSigo && hovered ? 'Unfollow' : 'Follow')}  
              </Button>
            </div>           
            <div className='user_stats'>
                <p>Followers {followersAmountRefresh}</p>
                <p>Following {followingAmount}</p>
            </div>
        </div>
        )}
        <TweetsByUser user={user}/>
      </div>
      
    );
}



export default UserById