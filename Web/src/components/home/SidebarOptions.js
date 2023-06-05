import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home/SidebarOptions.css";

const SidebarOptions = ({active, text, Icon, link}) => {
    
    const optionClassName = active ? 'sidebarOption--active' : 'sidebarOption';
    const navigate = useNavigate();

    const Redirect = () => {
        navigate(`${link}`);
      };

    return (
        
        <div className={optionClassName} onClick={Redirect}>
        <Icon />
        <h1>{text}</h1>
        </div>
    );
}

export default  SidebarOptions;
