import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Api from "../api/api";
import { useRouter } from 'expo-router';

const UserSimple = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const navigation = useRouter();

  const handleFollow = async () => {
    try {
      await Api.putFollowUser(user.id);
      setIsFollowed(prevState => !prevState);
    } catch (error) {
      console.error('Error al seguir al usuario:', error);
    }
  };

  const handleGoToUser = () => {
    navigation.push({ pathname: "/profile", params: {userId: user.id}})
  };


  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <TouchableOpacity onPress={handleGoToUser} style={styles.userInfo}>
          <Avatar
            source={{ uri: user.image }}
            rounded
            size="medium"
            containerStyle={styles.avatar}
          />
          <Text style={styles.username}>@{user.username}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleFollow}
        style={[styles.followButton, isFollowed ? styles.unfollowButton : null]}
  >
        <Text style={styles.buttonText}>{isFollowed ? 'Unfollow' : 'Follow'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffffff',
    borderColor: 'lightgray',    
    borderWidth: 1,
    paddingVertical:15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    padding:5
  },
  avatar: {
    width: 60,
    height: 60,
  },
  username: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    padding:5
  },
  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgb(80, 183, 245)',
  },
  unfollowButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgb(245, 80, 80)',
  },
  buttonText: {
    color: 'white',
  },
};

export default UserSimple;
