import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Search from "./search";
import TrendingTopics from "./TrendingTopics";
import UserToFollow from "./UserToFollow"; 

const Tab = createBottomTabNavigator();

const Explore = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Trending Topics" component={TrendingTopics} />
        <Tab.Screen name="User to follow" component={UserToFollow} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Explore;