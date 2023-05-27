import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api.js";

const UsersToFollow = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsersToFollow = async () => {
    try {
      const response = await Api.getUsersToFollow();
      setUsers(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsersToFollow();
  }, []);

  return (
    <div className="users-to-follow">
      <h2>Usuarios a seguir</h2>
        {Array.isArray(users) && users.length > 0 ? (
        users.map((user) => (
            <span onClick={() => navigate(`user/:${user.id}`, { replace: true })}>@{user.username}</span>
        ))): (
          <p>No se encontraron tweets.</p>
        )}
    </div>
  );
};

export default UsersToFollow;