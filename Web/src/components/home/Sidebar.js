import React, {useContext, useState} from "react";
import "../../styles/home/Sidebar.css";
import SidebarOption from './SidebarOptions';
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityRounded from '@mui/icons-material/PermIdentityRounded';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";

const Sidebar = () => {

  const navigate = useNavigate();

  const isLogged = !!localStorage.getItem("authorization_token");

  const handleLogout = () => {
    localStorage.removeItem("authorization_token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
      <div className="sidebar">
      <SidebarOption
        Icon={HomeIcon}
        text="Home"
        link="/user/followingTweets"
      />
      <SidebarOption
        Icon={PermIdentityRounded}
        text="Profile"
        link= "/user"
      />
      {isLogged ? (
      <Button variant="outlined" className="sidebar__tweet" onClick={handleLogout} >
          Logout
      </Button> ) 
      : (
      <Button variant="outlined" className="sidebar__tweet" onClick={handleLogin}>
          Login
      </Button>
      )}
      {isLogged ? (
        <UserInfo/>
      ):([])
      }

    </div>
  );
}

export default Sidebar;