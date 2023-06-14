import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from 'react';
import { Link } from "expo-router";

export default function Page() {
  
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Home</Text>
        <Link href="/search">Search</Link>
        <Text style={styles.subtitle}>Esto es una mierda...</Text>
        <Link href="/profile">Go to profile</Link>
        <Link href="/login">Go to login</Link>
      </View>
      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D", 
  },
});
