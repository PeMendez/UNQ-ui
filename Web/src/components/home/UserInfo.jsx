import { useState, useEffect } from "react";
import Api from "../../api/Api.js"
import { Avatar } from "@mui/material";
import "../../styles/user/UserInfo.css"
import { useNavigate } from "react-router-dom";


const UserInfo = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const navigate = useNavigate();

    const handleRedirectTo = () => {
      navigate(`/user`, { replace: true });
    };
  
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
  
    return (
      <div>
        {loggedUser && (
          <div className="user-button"onClick={() => handleRedirectTo()} >
            <Avatar src={loggedUser.image} alt={loggedUser.username}/>
            <div className="user-info-side">
              <p className="username-side">@{loggedUser.username}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default UserInfo;