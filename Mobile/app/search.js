import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, StatusBar, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import Header from "./Header";
import Footer from "./Footer";


function Search() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

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

  const handleTrendingTopics = () => {
    navigation.navigate("TrendingTopics");
  };

  const onClickUserToFollow = () => {
    navigation.navigate("UsersToFollow");
  };

  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <Header />
  <ScrollView>
    <View style={styles.widgets}>
      <View style={styles.widgets__input}>
        <AntDesign style={styles.widgets__searchIcon} name="search1" size={34} color="black" onPress={() => handleSearch()}/>
        <TextInput
          placeholder="Search Tweets"
          value={searchText}
          onChangeText={handleOnChange}
          onKeyPress={handleKeyPress}
        />
      </View>
      <View style={styles.widgets__widgetContainer}>
        <Text>What's happening</Text>
        <Button title="Trending Topics" onPress={handleTrendingTopics} />
        <Button title="Users to follow" onPress={onClickUserToFollow} />
      </View>
    </View>
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

});

export default Search;
