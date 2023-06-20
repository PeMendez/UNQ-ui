import {StyleSheet, View, Text, StatusBar, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, TouchableHighlight} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons'; 
import Tweet from "./Tweet";
import Header from "./Header";
import Api from "../api/api";
import { Avatar } from 'react-native-elements';
import { useRouter } from "expo-router";

export default function Interaction() {
    const {typeInteraction} = useLocalSearchParams(); 
    const {tweetReference} = useLocalSearchParams();
    const {username} = useLocalSearchParams();
    const {userId} = useLocalSearchParams();

    const [isLoading, setLoading] = useState(true); 
    const [loggedUser, setLoggedUser] = useState("");
    const [tweet, setTweet] = useState(""); 
    const [tweetMessage, setTweetMessage] = useState(""); 
    const [tweetImage, setTweetImage] = useState(""); 

    const navigation = useRouter()
    console.log(tweetReference)
    console.log(tweet)

    const handleInteraction = () => {
        if (typeInteraction === "ReTweet"){
            Api.postReTweet(tweetReference, tweetMessage)
        } else if (typeInteraction === "Reply"){
            Api.postReply(tweetReference, tweetMessage, tweetImage)
        } else {
            Api.postTweet(tweetMessage, tweetImage)
        }

    };

    const handleClose = () => {

    }

    const onPressUsername = () => {
        navigation.push({ pathname: "/profile", params: {userId: userId}})
    }

    useEffect(() => {
  
        Api.getLoggedUser()
        .then((response) => {
            setLoggedUser(response.data)
        })
        .catch(error => {
          console.log(error)
        }) 
        if (typeInteraction === "ReTweet"){
            Api.getTweet(tweetReference)
            .then((response) =>{
                setTweet(response.data)
                setLoading(false)
            })
            .catch(error =>{
                console.log(error)
            })
        }

    }, []);


    return (
        <View style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <Header />
            <View style={styles.buttom}>
                <AntDesign 
                  style={styles.closeButton}
                  name="close" 
                  size={24} 
                  color="black" 
                  onPress={() => handleClose()}
                />
                <TouchableOpacity
                  onPress={handleInteraction}
                  style={styles.InteractionButton}>      
                  <Text style={styles.buttonText}>{typeInteraction}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.encabezado}>
            <View style={styles.avatar}>
            <Avatar 
              rounded
              source={loggedUser.image ? { uri: loggedUser.image } : undefined}
              size="small"
            />
            </View>
            {typeInteraction === "Reply" && 
                <View style={styles.replyContainer}>
                <Text style={styles.replyText}>Replying to</Text>
                <TouchableHighlight underlayColor="#80b7f5" onPress={onPressUsername}>
                  <Text style={styles.usernameText}>@{username}</Text>
                </TouchableHighlight>
                </View>
            }
            </View>
            <View style={styles.content}>
            <TextInput
              multiline
              numberOfLines={4} 
              value={tweetMessage}
              onChangeText={(newText) => setTweetMessage(newText)}
              style={styles.textInput}
              placeholder={typeInteraction === "Reply" ? 
                            "Tweet your reply" :
                           typeInteraction === "ReTweet" ?
                            "Add a comment..." :
                            "What's happening?" }
            />
            </View>
            {isLoading ? (
              <View>
                <ActivityIndicator size="large" color="skyblue" />
              </View>
            ) : (
              typeInteraction === "ReTweet" && (
                <ScrollView showsVerticalScrollIndicator={false}>
                 <View style={styles.tweet}>
                  <Tweet
                    tweet={tweet}
                    show={false}
                  />
                 </View>
                </ScrollView>
            )
            )}
        </View>
    )
}; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttom: {
      flexDirection: 'row',
      borderBottomWidth: 1, 
      borderBottomColor: 'gray', 
      marginBottom: 10, 
      justifyContent: 'space-between',
      marginTop: 10, 
    },
    closeButton: {
      marginLeft:20, 
    },
    InteractionButton: {
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: 'rgb(80, 183, 245)',
      marginBottom: 10, 
      marginRight:20, 
    }, 
    buttonText: {
      color: 'white',
      fontSize: 20, 
      fontWeight: 'bold', 
    },
    encabezado: {        
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    avatar: {
      marginLeft:20, 
      marginTop:20,   
    },
    textReply: {
        color: 'gray'
    }, 
    replyContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: 20, 
      marginLeft:20,  
    },
    replyText: {
      marginRight: 5, 
      color: 'gray',
    },
    usernameText: {
      color: 'rgb(80, 183, 245)',
    },
    textInput: {
      height: 80,
      padding: 10,
      textAlignVertical: 'top',
      fontSize: 16, 
    },
    content: {
        marginLeft:60,
    }, 
    tweet: {
      width: '80%',
      justifyContent: 'flex-end',
      marginLeft: 70, 
    },

});
