import React, { useState, useEffect } from "react";
import UserSimple from "./UserSimple"
import Api from "../../api/Api.js";
import '../../styles/user/UsersToFollow.css'


const UsersToFollow = () => {
    const [loggedUser, setLoggedUser] = useState()
    const [users, setUsers] = useState([])

    const updateLoggedUser = (updatedLoggedUser) => {
        setLoggedUser(updatedLoggedUser)
    }

    const fetchUsersToFollow = async () => {
        try {
          const response = await Api.getUsersToFollow();
          setUsers(response.data.result);
        } catch (error) {
          console.error(error);
        }
    }
    
    useEffect(() => {
      fetchUsersToFollow();
    }, [])

    return (
        <div className="users-to-follow">
            <h2>Recommended users</h2> {
                Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <div className="list_of_users_to_follow">
                            <UserSimple user={user} updateLoggedUser={updateLoggedUser}/>
                        </div>
                    ))
                ):(<p>No hay usuarios para recomendar.</p>)
            }
        </div>
    )
}

export default UsersToFollow
