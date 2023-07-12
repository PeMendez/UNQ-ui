import React, { useState, useEffect } from "react";
import UserSimple from "./UserSimple"
import Api from "../../api/Api.js";
import '../../styles/user/UsersToFollow.css'


const UsersToFollow = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        Api.getUsersToFollow()
          .then(response => {
            setUsers(response.data.result);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    return (
        <div className="users-to-follow">
            <h2>Recommended users</h2> {
                Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <div className="list_of_users_to_follow">
                          <div className="user-container">
                            <UserSimple key={user.id} user={user} />
                          </div>
                        </div>
                    ))
                ):(<p>No hay usuarios para recomendar.</p>)
            }
        </div>
    )
}

export default UsersToFollow
