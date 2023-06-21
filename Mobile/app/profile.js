import {StyleSheet, View, Text, StatusBar, ScrollView, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import Header from "./Header";
import Footer from "./Footer";
import Api from "../api/api";
import { sortBy } from "lodash";
import { Avatar } from 'react-native-elements';

export default function Profile() {
  const {userId} = useLocalSearchParams() 
  const [user, setUser] = useState("");
  const [loggedUser, setLoggedUser] = useState("");  
  const [isLoading, setIsLoading] = useState(true);
  
  const [isFollowed, setIsFollowed] = useState();

  const followersAmount = user && user.followers ? Object.keys(user.followers)?.length : 0;
  const followingAmount = user && user.following ? Object.keys(user.following)?.length : 0;
  
  useEffect(() => {
    Promise.all([Api.getUser(userId), Api.getLoggedUser()])
      .then(([userResponse, loggedUserResponse]) => {
        setUser(userResponse.data);
        setIsLoading(false);
        setLoggedUser(loggedUserResponse.data);
        setIsFollowed(loggedUserResponse.data.following.some(obj => obj.id === userResponse.data.id));
      })
      .catch(error => {
        console.log(error);
      });
  }, [isFollowed]);
  

const handleFollow = async () => {
  try {
    await Api.putFollowUser(user.id);
    setIsFollowed(prevState => !prevState);
  } catch (error) {
    console.error('Error al seguir al usuario:', error);
  }
};

const actualizarTweet = (tweetActualizar) => {
  setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
 
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header />
      {isLoading ? (
        <View style={[styles.loadingContainer, styles.loadingAbsolute]}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>) : (
              <ScrollView showsVerticalScrollIndicator={false}>
              <Image style={styles.userBackground} source={{ uri: user.backgroundImage }} />
              {user && (
                <View>
                  <View style={styles.userAvatar}>
                    <Avatar
                      rounded
                      source={user.image ? { uri: user.image } : undefined}
                      size="large"
                    />
                  </View>
                  <View style={styles.userInfo}>            
                     <View style={styles.usernameContainer}>
                      <Text>@{user.username}</Text>
                          {user.id != loggedUser.id &&
                            <View style={styles.buttomFollow}>
                              <TouchableOpacity
                                onPress={handleFollow}
                                style={[styles.followButton, isFollowed ? styles.followingButton : null]}>      
                                <Text style={[styles.buttonText, isFollowed ? styles.followingButtonText : null]}>{isFollowed ? 'Following' : 'Follow'}</Text>
                              </TouchableOpacity>
                            </View>}
                      </View>
                  </View>
                  <View style={styles.userStats}>
                    <Text>{<Text style={styles.statsText}>{followersAmount}</Text>}{" "}Followers{"    "}</Text>
                    <Text>{<Text style={styles.statsText}>{followingAmount}</Text>}{" "}Following</Text>
                  </View>          
                </View>
              )}   
              <View style={styles.tweets}> 
              {user.tweets?.length > 0 ? (
                sortBy(user.tweets, ['date']).reverse().map((tweet) => (
                  <Tweet
                    key={tweet.id}
                    tweet={tweet}
                    isLikedT={tweet.isLiked}
                    actualizar={actualizarTweet}
                    show={true}
                    showRetweet={true}
                  />
                ))
              ) : (
                <Text>No se encontraron tweets.</Text>
              )}
              </View>  
            </ScrollView>
        )}
        <View style={styles.footerContainer}>
          <Footer/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingTop: StatusBar.currentHeight,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  userProfile: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userBackground: {
    width: '100%',
    height: 150,
  },
  buttomFollow: {
    marginLeft:210, 
  },
  userAvatar: {
    alignSelf: 'flex-start',
    marginTop: -50,
    marginLeft: 10, 
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userInfo: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userStats: {
    flexDirection: 'row',
    marginTop: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    paddingBottom: 10, 
    marginHorizontal: 10,
    marginLeft:10,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgb(80, 183, 245)',
  },
  followingButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor:'rgb(80, 183, 245)',
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'rgb(80, 183, 245)',
  },
  buttonText: {
    color: 'white',
  },
  followingButtonText: {
    color: 'rgb(80, 183, 245)',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tweets: {
    marginBottom: 60, 
  },
});

