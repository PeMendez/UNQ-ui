import React, { useState } from "react";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";
import "../../styles/home/Login.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  

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

    if (!username || !password || !email || !image || !backgroundImage) {
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if ((!image.startsWith("http://") || !image.startsWith("https://")) && !image.endsWith(".jpg")) {
      toast.error("El campo de imagen debe ser una URL de imagen en formato jpg");
      setLoading(false);
      return;
    }

    if ((!backgroundImage.startsWith("http://") || !backgroundImage.startsWith("https://")) && !backgroundImage.endsWith(".jpg")) {
      toast.error("El campo de imagen de fondo debe ser una URL de imagen en formato jpg");
      setLoading(false);
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      toast.error("El campo de correo electrónico debe tener un formato válido");
      setLoading(false);
      return;
    }
    
    Api.postRegister(
      username,
      password,
      email,
      image,
      backgroundImage
    )
      .then(() => {
        navigate("/user/followingTweets");
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

     if (!username || !password) {
      toast.error("Username y password son campos obligatorios");
      setLoading(false);
      return;
    }

    Api.postLogin(username, password)
      .then((response) => {
        navigate("/user/followingTweets");
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
              Login
            </button>
            <button type="button" onClick={() => setLogin(false)} disabled={loading}>
              Register
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

      <button type="button" onClick={login ? () => handleLogin() : () => handleRegister()} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
    </div>)
};

export default Login;

