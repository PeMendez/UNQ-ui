import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text, StatusBar, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import { useRouter } from "expo-router";
import Api from "../api/api";
import Tweet from "./Tweet";


function Search({loggedUser}) {
  const navigation = useNavigation();
  const navi = useRouter();
  const [searchText, setSearchText] = useState("");
  const [tweets, setTweets] = useState([]);

   useEffect(() => {
         Api.getSearch(searchText)
           .then(response => {
             if (response && response.data && Array.isArray(response.data.result)) {
               const withLikes = response.data.result.map(tweet => {
                  let isLiked = !!tweet.likes.find(user => user.id === loggedUser);
                 return { ...tweet, isLiked};
               });
               setTweets(withLikes);
             }
           })
       .catch(error => {
         console.log(error);
       });
   }, []);
  
  const actualizarTweet = (tweetActualizar) => {
    setTweets((prevState) =>  prevState.map((tweet) => ( (tweet.id === tweetActualizar.id)?  tweetActualizar : tweet)))
   
  };

  const handleSearch = () => {
    if (!searchText) {
      ToastAndroid.show("Please introduce some text to search", ToastAndroid.SHORT);
      return;
    }

    navigation.navigate("Search", { searchText });
    setSearchText("");
  };

  const handleOnChange = (text) => {
    setSearchText(text);
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <View style={styles.widgets}>
    {/* <View style={styles.widgets__input}>
      <AntDesign style={styles.widgets__searchIcon} name="search1" size={20} color="black" onPress={() => handleSearch()}/>
      <TextInput
        placeholder="Search Tweets"
        value={searchText}
        onChangeText={handleOnChange}
        onKeyPress={handleKeyPress}
      />
    </View> */}
      <SearchBar
        placeholder="Search Tweets"
        value={searchText}
        onChangeText={handleOnChange}
        onKeyPress={handleKeyPress}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchBarInputContainer}
        rightIconContainerStyle={styles.searchBarIconContainer}
        rightIcon={
          <AntDesign
            name="search1"
            size={20}
            color="black"
            onPress={handleSearch}
          />
        }
      />
    <View style={styles.container}>
  <ScrollView>
      {tweets.length > 0 ? (
        tweets.map(tweet => (
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
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  widgets: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchBarInputContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
  },
  searchBarInput: {
    fontSize: 14, 
  },
  searchBarIconContainer: {
    marginRight: 10,
  },

});

export default Search;
