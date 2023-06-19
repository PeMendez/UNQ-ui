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
      <ScrollView horizontal={true}>
      {Array.isArray(users) && users.length > 0 ? (
        users.map(user => (
          <View key={user.id} style={styles.userContainer}>
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
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userContainer: {
    marginBottom: 10,
  },
};

export default UsersToFollow;
