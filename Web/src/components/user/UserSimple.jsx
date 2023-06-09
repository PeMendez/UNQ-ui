import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Api from '../../api/Api';
import '../../styles/user/UserSimple.css'

const UserSimple = ({user}) => {

    const [isFollowed, setIsFollowed] = useState();
    const navigate = useNavigate();

    const handleFollow = async () => {
        try {
            await Api.putFollowUser(user.id)
                .then(()=>{
                    setIsFollowed(prevState => !prevState)
                })
        } catch (error) {
            console.error("Error al seguir al usuario:", error);
        }
    }

    const handleGoToUser = () => {
        navigate(`/user/${user.id}`);
    }

    return (
        <div className='user_simple' >
            <div className='user_simple_info' onClick={()=>handleGoToUser()}>
                <Avatar src={user.image} alt={user.username} style={{ width: 30, height: 30 }}/>
                <p>{'@'+user.username}</p>
            </div>
            <button className={'follow_button'+isFollowed} onClick={()=>handleFollow()}>
                <p>{isFollowed? 'Unfollow' : 'Follow'}</p>
            </button>  
        </div>
    )
}

export default UserSimple