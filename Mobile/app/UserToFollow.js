import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Api from "../api/api";
import UserSimple from "./UserSimple";


const UsersToFollow = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.getUsersToFollow()
      .then(response => {
        setUsers(response.data.result);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.userContainer} showsVerticalScrollIndicator={false}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(user => (
            <View key={user.id} style={styles.userItem}>
              <UserSimple user={user} />
            </View>
          ))
        ) : (
          <Text>No hay usuarios para recomendar.</Text>
        )}
      </ScrollView>
    </View>
  );
  
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:10
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userItem: {
    width: '50%',
    padding:5
  },
};

export default UsersToFollow;
