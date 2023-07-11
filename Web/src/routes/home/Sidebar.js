import React from "react";
import "./Sidebar.css";
import SidebarOptions from '../../components/home/SidebarOptions';
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import Notification from "@mui/icons-material/Notifications";

const Sidebar = () => {
    return(
        <div className="sidebar">
            <TwitterIcon className="sidebar--twitterIcon"/>
            <SidebarOptions active Icon={HomeIcon} text="Home" />
            <SidebarOptions Icon={Search} text="Search"/>
            <SidebarOptions Icon={Notification} text="Notification"/>
        </div>
    );
}

export default  Sidebar;
