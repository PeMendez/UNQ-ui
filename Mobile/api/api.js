import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from "./axios";

const url = 'http://192.168.0.55:7071'

const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}

const postRegister = (user, pass, email, image, backgroundImage, setInvalidData) => {
    return new Promise(async (resolve, reject) => {
      const registerData = {
        username: user,
        password: pass,
        email: email,
        image: image,
        backgroundImage: backgroundImage
      };
  
      axios
        .post(url + "/register", registerData)
        .then(async (response) => {
          const token = response.headers.authorization;
          await storeToken(token)
          setAuthToken(token);

          resolve(response.data);

        })
        .catch(err => {
          console.log(err);
          setInvalidData(true);
          reject(err);
        });
    });
  };
  
  const postLogin = (user, pass, setInvalidData) => {
  
    return new Promise((resolve, reject) => {
      const loginData = {
        username: user,
        password: pass
      };
  
      axios
        .post(url + "/login", loginData)
        .then(response => {
          const token = response.headers.authorization;
          storeToken(token)
          setAuthToken(token);
  
          resolve(response.data);
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
      const token = await AsyncStorage.getItem("@storage_Key");  
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
      const token = await AsyncStorage.getItem("@storage_Key");
      const response = await axios.get(`${url}/user/followingTweets`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const getUsersToFollow = async () => {
    try {
      const token = await AsyncStorage.getItem("@storage_Key");
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
      const token = await AsyncStorage.getItem("@storage_Key");
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
      const token = await AsyncStorage.getItem("@storage_Key");
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
      const token = await AsyncStorage.getItem("@storage_Key");
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
      const token = await AsyncStorage.getItem("@storage_Key");
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
      const token = await AsyncStorage.getItem("@storage_Key");
      const response = await axios.get(`${url}/tweet/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  const putLike = async (id) => {
    try {
      const token = await AsyncStorage.getItem("@storage_Key");
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
  