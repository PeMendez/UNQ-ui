import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ToastAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import SearchResult from "./searchResult";


function Search() {  

  const [searchText, setSearchText] = useState("");  
  const [textToSearch, setTextToSearch] = useState("");  

  const handleSearch = () => {
    if (searchText === "") {
      ToastAndroid.showWithGravity(
        "Please introduce some text to search",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    } else{
      setTextToSearch(searchText)
    }
  };

  const handleOnChange = (text) => {
    setSearchText(text);
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === "Enter" || e.nativeEvent.key === "Search") {
      handleSearch();
    }
  };

  return (
    <View style={styles.widgets}>
      <View style={styles.search}>
        <SearchBar
          placeholder="Search Tweets"
          placeholderTextColor="#888888"
          value={searchText}
          onChangeText={handleOnChange}
          onKeyPress={handleKeyPress}
          onSubmitEditing={()=>handleSearch()}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInputContainer}
          searchIcon={null}
          clearIcon={null}
        />
        {/* <AntDesign
          name="search1"
          size={15}
          color="black"
          onPress={()=> setTextToSearch(searchText)}
        /> */}
      </View>
      {textToSearch != "" && 
      <SearchResult
        searchText={textToSearch}/>}
    </View>
  );
}


const styles = StyleSheet.create({
  widgets: {
    paddingHorizontal: 10,
  },
  searchBar: {
    backgroundColor: 'transparent',
  },
  search: {
    margin:2
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
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
});

export default Search;
