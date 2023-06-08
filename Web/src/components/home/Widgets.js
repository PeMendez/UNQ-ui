import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home/Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Widgets() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (!searchText) {
      toast.error("No puede ser vacía la búsqueda");
      return;
    }

      navigate(`/search/${searchText}`);
      setSearchText("");
  };

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTrendingTopics = () => {
    navigate("/TrendingTopics");
  };

  const onClickUserToFollow = () => {
    navigate("/user/usersToFollow")
  }

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" onClick={()=>handleSearch()} />
        <input
          placeholder="Search Tweets"
          type="text"
          value={searchText}
          onChange={(e)=>handleOnChange(e)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <Button variant="outlined" className="sidebar__tweet" onClick={()=>handleTrendingTopics()}>
          Trending Topics
      </Button>
      <Button variant="outlined" className="sidebar__tweet" onClick={()=>onClickUserToFollow()} >
          Users to follow
      </Button>
      </div>
    </div>
  );
}

export default Widgets;
