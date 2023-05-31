import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Api from '../../api/Api';
import '../../styles/user/UserSimple.css'

const UserSimple = ({user},{updateLoggedUser}) => {

    const [isFollowed, setIsFollowed] = useState();
    const navigate = useNavigate();

    const handleFollow = async () => {
        try {
            await Api.putFollowUser(user.id)
                .then(()=>{
                    setIsFollowed(!isFollowed)
                    sendUpdatedLoggedUser()
                })
        } catch (error) {
            console.error("Error al seguir al usuario:", error);
        }
    }

    const sendUpdatedLoggedUser = async () =>{
        try{
            await Api.getLoggedUser()
                .then((response)=>{
                    updateLoggedUser(response.data)
                })
        } catch (error) {
            console.error(error)
        }
    }

    const handleGoToUser = () => {
        navigate(`/user/${user.id}`, { replace: true });
    }

    return (
        <div className='user_simple' >
            <div className='user_simple_info' onClick={()=>handleGoToUser()}>
                <p>{'@'+user.username}</p>
            </div>
            <button className={'follow_button'+isFollowed} onClick={()=>handleFollow()}>
                <p>{isFollowed? 'Unfollow' : 'Follow'}</p>
            </button>  
        </div>
    )
}

export default UserSimple