import React from "react";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import '../../styles/home/HomeComponent.css';

const Home = ({children}) => {
  
  return (
      <div className="app">
        <Sidebar />
        <div className="main children-container" style={{ flex: "0.6", width: "800px" }}>{children}</div>
        <Widgets />
      </div>
  );
}
export default Home;