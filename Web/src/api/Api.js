import axios from "axios";
import { setAuthToken } from "./AxiosConfig";

const url = 'http://localhost:7071'

const get = (url) => {
  return axios.get(url)
    .then(({ data }) => data)
    .catch(error => Promise.reject(error.response.data))
};

const post = (url, data) => {
  return axios.post(url, data)
    .then(({ data }) => data)
    .catch(error => Promise.reject(error.response.data))
};

const put = (url) => {
   return axios.put(url, null)
    .then(({ data }) => data)
    .catch(error => Promise.reject(error.response.data))
};

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
        localStorage.setItem("authorization_token", token);
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
        localStorage.setItem("authorization_token", token);
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
async function getTrendingTopics() {
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
  
  const postReTweet = (id, content, setInvalidData) =>{
    return new Promise((resolve, reject) => {
      const reTweetData = {
        content: content,
      };
      axios
        .post(`${url}/tweet/${id}/retweet`, reTweetData)
        .then(response => {
          console.log(response.data.id)
          console.log(response.data.user.id)
          resolve();
        })
        .catch(err => {
          console.log(err);
          setInvalidData(true);
          reject(err); });
        });
      }
      
      const postReply = (id, content, image, setInvalidData) => {
        return new Promise((resolve, reject) => {
          const tweetData = {
            content: content,
            image: image
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
            reject(err);});
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
          }
          
          export default Api;