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
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    borderColor: 'gray',    
    borderWidth: 1,
    margin: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    margin: 20,    
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  username: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#1DA1F2',
  },
  unfollowButton: {
    backgroundColor: '#8B0000',
  },
  buttonText: {
    color: 'white',
  },
};

export default UserSimple;
