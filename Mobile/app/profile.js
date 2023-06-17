import {StyleSheet, View, Text, StatusBar, ScrollView, Image} from "react-native";
import {useRouter} from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import Header from "./Header";
import Footer from "./Footer";
import Api from "../api/api";
import { Avatar } from 'react-native-elements';

export default function Profile() {
  //const {user} = useLocalSearchParams() 
  const router = useRouter()
  const [user, setUser] = useState("");

  const followersAmount = user && user.followers ? Object.keys(user.followers)?.length : 0;
  const followingAmount = user && user.following ? Object.keys(user.following)?.length : 0;
  
  // console.log(Object.keys(user))
  // console.log(user[0], user[1], user[2], user[3], user[4], user[5], user[6], user[7], user[8], user[9], user[10], user[11], user[12], user[13], user[14])
  // console.dir(user)
  // console.log(JSON.stringify(user))

  useEffect(() => {
  
    Api.getLoggedUser()
    .then((response) => {
        setUser(response.data)
    })
    .catch(error => {
      console.log(error)
    }) 

}, []);

const actualizarTweet = (tweetActualizar) => {
  setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
 
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header />
    <ScrollView>
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
            <Text>@{user.username}</Text>
          </View>
          <View style={styles.userStats}>
            <Text>{<Text style={styles.statsText}>{followersAmount}</Text>}{" "}Followers{"    "}</Text>
            <Text>{<Text style={styles.statsText}>{followingAmount}</Text>}{" "}Following</Text>
          </View>
        </View>
      )}      
      {user.tweets?.length > 0 ? (
        user.tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isLikedT={tweet.isLiked}
            actualizar={actualizarTweet}
            show={true}
          />
        ))
      ) : (
        <Text>No se encontraron tweets.</Text>
      )}
    </ScrollView>
        <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: StatusBar.currentHeight,
  },
  userProfile: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userBackground: {
    width: '100%',
    height: 150,
  },
  userAvatar: {
    alignSelf: 'flex-start',
    marginTop: -50,
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
});

