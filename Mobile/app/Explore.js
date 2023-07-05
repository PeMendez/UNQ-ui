import React, { useState } from "react";
import Search from "./search";
import TrendingTopics from "./TrendingTopics";
import UserToFollow from "./UserToFollow"; 
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StyleSheet, View, StatusBar } from "react-native";
import Header from "./Header";
import Footer from "./Footer";


const SearchScreen = () => (
  <View style={styles.scene} >
    <Search />
  </View>
);

const TrendingTopicsScreen = () => (
  <View style={styles.scene}>
    <TrendingTopics />
  </View>
);

const UserToFollowScreen = () => (
  <View style={styles.scene}>
    <UserToFollow/>
  </View>
);

const Explore = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'search', title: 'Search' },
    { key: 'trending', title: 'Trending Topics' },
    { key: 'userToFollow', title: 'Users to Follow' },
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
      labelStyle={[styles.label, { textTransform: 'none' }]}
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
    fontSize:14
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: StatusBar.currentHeight,
  },

});

export default Explore;

