import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import Api from "../api/api";

const UserSimple = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const navigation = useNavigation();

  const handleFollow = async () => {
    try {
      await Api.putFollowUser(user.id);
      setIsFollowed(prevState => !prevState);
    } catch (error) {
      console.error('Error al seguir al usuario:', error);
    }
  };

  const handleGoToUser = () => {
    navigation.navigate('UserProfile', { userId: user.id });
  };

  return (
    <View style={styles.userSimple}>
      <TouchableOpacity onPress={handleGoToUser} style={styles.userInfo}>
        <Avatar
          source={{ uri: user.image }}
          rounded
          size="medium"
          containerStyle={styles.avatar}
        />
        <Text style={styles.username}>@{user.username}</Text>
      </TouchableOpacity>
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
  userSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
  },
  username: {
    marginLeft: 10,
  },
  followButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  unfollowButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
  },
};

export default UserSimple;
