import React, { useState } from "react";
import Search from "./search";
import TrendingTopics from "./TrendingTopics";
import UserToFollow from "./UserToFollow"; 
import { useRouter, useLocalSearchParams } from "expo-router";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StyleSheet, View, Text, StatusBar } from "react-native";
import Header from "./Header";
import Footer from "./Footer";


const SearchScreen = () => (
  <View style={styles.scene} >
    <Search />
  </View>
);

const TrendingTopicsScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Trending Topics</Text>
    <TrendingTopics />
  </View>
);

const UserToFollowScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>User to Follow</Text>
    <UserToFollow/>
  </View>
);

const Explore = () => {
  const {loggedUser} = useLocalSearchParams()
  const navigation = useRouter()
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'search', title: 'Search' },
    { key: 'trending', title: 'Trending Topics' },
    { key: 'userToFollow', title: 'User to Follow' },
  ]);

  const renderScene = SceneMap({
    search: SearchScreen,
    trending: TrendingTopicsScreen,
    userToFollow: UserToFollowScreen,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <Header />
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
     <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    marginTop:10
  },
  text: {
    textAlign: "center", 
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
  },
  indicator: {
    backgroundColor: '#1DA1F2',
  },
  label: {
    color: '#000000',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: StatusBar.currentHeight,
  },

});

export default Explore;

