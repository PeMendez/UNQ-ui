import axios from "axios";
import { setAuthToken } from "./AxiosConfig";

const url = 'http://localhost:7071'

const postRegister = (user, pass, email, image, backgroundImage) => {
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
        localStorage.setItem("authorization_token", token);
        setAuthToken(token);

        resolve(); 
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};


const postLogin = (user, pass) => {

  return new Promise((resolve, reject) => {
    const loginData = {
      username: user,
      password: pass
    };

    axios
      .post(url + "/login", loginData)
      .then(response => {
        const token = response.headers.authorization;
        localStorage.setItem("authorization_token", token);
        setAuthToken(token);

          resolve(); 
      })
      .catch(err => {
        console.log(err);
        reject(err); 
      });
  });
};


//User
const getLoggedUser = async () => {
  try {
    const response = await axios.get(`${url}/user`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}


const getFollowingTweets = async () => {
  try {
    const response = await axios.get(`${url}/user/followingTweets`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const getUsersToFollow = async () => {
  try {
    const response = await axios.get(url + `/user/usersToFollow`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token")
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

const getUser = async (id) => {
  try {
    const response = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token")
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

const putFollowUser= async (id) => {
  try {
    const response = await axios.put(url + `/user/${id}/follow`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token")
      },
    });
    return response; 
  }
  catch (error) {
    return Promise.reject(error.response.data);
  }
}

//Search 
const getSearch = async (searchText) => {
  try{
    const response = await axios.get(`${url}/search?searchText=${searchText}`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token")
      },
    });

    return response;
  }
    catch (error) {
    return Promise.reject(error.response.data);
  }
}

//TrendingTopics
const getTrendingTopics = async () => {
  try {
    const response = await axios.get(`${url}/trendingTopics`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

//Tweet 
const getTweet = async (id) => {
  try {
    const response = await axios.get(`${url}/tweet/${id}`)

    return response;
  }
  catch (error) {
  return Promise.reject(error.response.data);
}
};

const putLike= async (id) => {
  try {
    const response = await axios.put(url + `/tweet/${id}/like`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token")
      }, });
      return response; 
    }
    catch (error) {
      return Promise.reject(error.response.data);
    }
  } 
  
  const postReTweet = (id, content) =>{
    return new Promise((resolve, reject) => {
      const reTweetData = {
        content: content,
      };
      axios
        .post(`${url}/tweet/${id}/retweet`, reTweetData)
        .then(response => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err); });
        });
      }
      
      const postReply = (id, content, image) => {
        return new Promise((resolve, reject) => {
          const tweetData = {
            content: content,
            image: image
          };
      
          axios
          .post(`${url}/tweet/${id}/reply`, tweetData)
          .then(response => {
             resolve();
          })
          .catch(err => {
            reject(err);});
          });
          };
          const postTweet = (content, image) => {
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
          }
          
          export default Api;