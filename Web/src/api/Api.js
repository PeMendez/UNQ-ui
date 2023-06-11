import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'http://localhost:7071'

const postRegister = (user, pass, email, image, backgroundImage, setContext, setInvalidData) => {
    return new Promise((resolve, reject) => {
      const registerData = {
        username: user,
        password: pass,
        email: email,
        image: image,
        backgroundImage: backgroundImage
      };
  
      axios
        .post(url + "/register", registerData)
        .then(response => {
          const token = response.headers.authorization;
          AsyncStorage.setItem("authorization_token", token);  // Use AsyncStorage instead of localStorage
          setAuthToken(token);
  
          let data = response.data;
          setContext({
            logged: true,
            id: data.id,
            username: data.username,
            email: data.email,
            image: data.image,
            followers: data.followers,
            following: data.following,
            tweet: data.tweet
          });
  
          resolve(); 
        })
        .catch(err => {
          console.log(err);
          setInvalidData(true);
          reject(err);
        });
    });
  };
  
  const postLogin = (user, pass, setContext, setInvalidData) => {
  
    return new Promise((resolve, reject) => {
      const loginData = {
        username: user,
        password: pass
      };
  
      axios
        .post(url + "/login", loginData)
        .then(response => {
          const token = response.headers.authorization;
          AsyncStorage.setItem("authorization_token", token);  // Use AsyncStorage instead of localStorage
          setAuthToken(token);
  
          let data = response.data;
          setContext({
            logged: true,
            id: data.id,
            username: data.username,
            email: data.email,
            image: data.image,
            followers: data.followers,
            following: data.following,
            tweet: data.tweet
          });
          resolve(); 
        })
        .catch(err => {
          console.log(err);
          setInvalidData(true);
          reject(err); 
        });
    });
  };

  const getLoggedUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authorization_token");  
      const response = await axios.get(`${url}/user`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
  
  const getFollowingTweets = async () => {
    try {
      const token = await AsyncStorage.getItem("authorization_token");
      const response = await axios.get(`${url}/user/followingTweets`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  const getUsersToFollow = async () => {
    try {
      const token = await AsyncStorage.getItem("authorization_token");
      const response = await axios.get(`${url}/user/usersToFollow`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  const getUser = async (id) => {
    try {
      const token = await AsyncStorage.getItem("authorization_token");
      const response = await axios.get(`${url}/user/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  const putFollowUser = async (id) => {
    try {
      const token = await AsyncStorage.getItem("authorization_token");
      const response = await axios.put(`${url}/user/${id}/follow`, null, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  const getSearch = async (searchText) => {
    try {
      const token = await AsyncStorage.getItem("authorization_token");
      const response = await axios.get(`${url}/search?searchText=${searchText}`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  async function getTrendingTopics() {
    try {
      const token = await AsyncStorage.getItem("authorization_token");
      const response = await axios.get(`${url}/trendingTopics`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
  
  const getTweet = async (id) => {
    try {
      const response = await axios.get(`${url}/tweet/${id}`);
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  const putLike = async (id) => {
    try {
      const token = await AsyncStorage.getItem("authorization_token");
      const response = await axios.put(`${url}/tweet/${id}/like`, null, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  const postReTweet = (id, content, setInvalidData) => {
    return new Promise((resolve, reject) => {
      const reTweetData = {
        content: content,
      };
      axios
        .post(`${url}/tweet/${id}/retweet`, reTweetData)
        .then(response => {
          console.log(response.data.id);
          console.log(response.data.user.id);
          resolve();
        })
        .catch(err => {
          console.log(err);
          setInvalidData(true);
          reject(err);
        });
    });
  };
  
  const postReply = (id, content, image, setInvalidData) => {
    return new Promise((resolve, reject) => {
      const tweetData = {
        content: content,
        image: image,
      };
  
      axios
      .post(`${url}/tweet/${id}/reply`, tweetData)
      .then(response => {
        console.log(response.data.id)
         resolve();
      })
      .catch(err => {
        console.log(err);
        setInvalidData(true);
        reject(err);
      });
  });
  };

  const postTweet = (content, image, setInvalidData) => {
    return new Promise((resolve, reject) => {
      const tweetData = {
        content: content,
        image: image
      };
  
      axios
        .post(url + "/tweet", tweetData)
        .then(response => {
          resolve(); 
        })
        .catch(err => {
          console.log(err);
          setInvalidData(true);
          reject(err); 
        });
    });
  }
  

  const Api = {
    postRegister,
    postLogin,
    getLoggedUser,
    getFollowingTweets,
    getUsersToFollow,
    getUser,
    putFollowUser,
    getSearch,
    getTrendingTopics,
    getTweet,
    putLike,
    postReTweet,
    postReply,
    postTweet
  };
  
  export default Api;
  