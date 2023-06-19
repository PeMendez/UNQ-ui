import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ToastAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import SearchResult from "./searchResult";


function Search() {  

  const [searchText, setSearchText] = useState("");  

  const handleSearch = () => {
    if (!searchText) {
      ToastAndroid.show("Please introduce some text to search", ToastAndroid.SHORT);
      return;
    }
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
      <SearchBar
        placeholder="Search Tweets"
        placeholderTextColor="#888888"
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
      {searchText != "" && 
      <SearchResult
        searchText={searchText}/>}
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
    backgroundColor: "rgba(242, 242, 242, 0.5)",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
  },
  searchBarInput: {
    color: "#888888",
    fontSize: 14, 
  },
  searchBarIconContainer: {
    marginRight: 10,
  },

});

export default Search;
