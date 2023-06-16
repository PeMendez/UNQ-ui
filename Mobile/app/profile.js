import {StyleSheet, View, Text, StatusBar, ScrollView, Image} from "react-native";
import {useRouter} from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import Header from "./Header";
import Footer from "./Footer";

export default function Profile({user}) {
  const {user} = useLocalSearchParams() 
  const router = useRouter()
  const followersAmount = user && user.followers ? Object.keys(user.followers)?.length : 0;
  const followingAmount = user && user.following ? Object.keys(user.following)?.length : 0;
  console.log(user)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header />
    <ScrollView>
      <Image style={styles.userBackground} source={user?.backgroundImage} />
      {user && (
        <View>
          <View style={styles.userAvatar}>
            <Image style={styles.avatarImage} source={user.image} />
          </View>
          <View style={styles.userInfo}>
            <Text>@{user.username}</Text>
          </View>
          <View style={styles.userStats}>
            <Text>Followers {followersAmount}</Text>
            <Text>Following {followingAmount}</Text>
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
    height: 200,
  },
  userAvatar: {
    alignItems: 'center',
    marginTop: -80,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statsText: {
    fontSize: 16,
  },
});

