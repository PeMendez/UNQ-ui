import React, { useState, useEffect, useRef } from "react";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";
import "../../styles/home/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [context, setContext] = useState({});
  const [invalidData, setInvalidData] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  
  const inputRef = useRef(null);
  const usernameInputRef = useRef(null);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleBackgroundImageChange = (e) => {
    setBackgroundImage(e.target.value);
  };

  const handleRegister = (e) => {
    //e.preventDefault();
    setLoading(true);
    Api.postRegister(
      username,
      password,
      email,
      image,
      backgroundImage,
      setContext,
      setInvalidData
    )
      .then(() => {
        navigate("/followingTweets");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error("Registration failed. Please check your credentials.")
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = (e) => {
    setLoading(true);
    Api.postLogin(username, password, setContext, setInvalidData)
      .then((response) => {
        navigate("/user/followingTweets");
        setContext(response)
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error("Login failed. Please check your credentials.")
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showLogin = login ? "showLogin" : "showRegister"

  return (
    <div className="container">
      <div className="login__header">
            <button type="button" onClick={() => setLogin(true)} disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
            <button type="button" onClick={() => setLogin(false)} disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </button>
      </div>
      <div className={"login" + showLogin}>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </form>
      </div>
      <div className={"register" + showLogin}>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={handleImageChange}
          />
          <label htmlFor="backgroundImage">Background Image:</label>
          <input
            type="text"
            id="backgroundImage"
            value={backgroundImage}
            onChange={handleBackgroundImageChange}
          />
        </form>
        
      </div>


      {/* {login ? <LoginFields /> : <RegisterFields />} */}
      <button type="button" onClick={login ? () => handleLogin() : () => handleRegister()} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
    </div>)
};

export default Login;

