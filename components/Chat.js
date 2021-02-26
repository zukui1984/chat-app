import React from "react";
import {
  View,
  Button,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      _id: '',
      name: '',
      avatar: '',
    };
  }

const firebaseConfig = {
  apiKey: 'AIzaSyDgOsU-fMoQ17CzXvx7KV9DbQj94e2yI2I',
  authDomain: 'test-48fdb.firebaseapp.com',
  projectId: 'test-48fdb',
  storageBucket: 'test-48fdb.appspot.com',
  messagingSenderId: '881156252769',
  appId: '1:881156252769:web:bf88153f192eda49203620',
  measurementId: 'G-582ETM04ZQ'
};
 
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

this.referenceChatMessages = firebase.firestore().collection("messages");


componentDidMount() {
   this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
     if (!user) {
       firebase.auth().signInAnonymously();
     }
     this.setState({
       uid: user.uid,
       messages: [],
     });
     this.unsubscribe = this.referenceChatMessages
       .orderBy("createdAt", "desc")
       .onSnapshot(this.onCollectionUpdate);
   });
 }

   componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages
    });
  }


  onSend(messages = []) {
    this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessage();
    });
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: messages.createdAt,
      user: message.user,
      uid: this.state.uid,
    });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#c6bff7",
          },
        }}
      />
    );
  }

onCollectionUpdate = (querySnapshot) => {
   const messages = [];
   // go through each document
   querySnapshot.forEach((doc) => {
     // get the QueryDocumentSnapshot's data
     let data = doc.data();
     messages.push({
       _id: data._id,
       text: data.text,
       createdAt: data.createdAt.toDate(),
       user: data.user,
     });
   });




render() {
    let name = this.props.route.params.name;
    let color = this.props.route.params.color || "lightgrey";
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: 1 }}
        />

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}

        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}
