import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "",
        uid: 0,
      },
    };

     const firebaseConfig = {
      apiKey: "AIzaSyCQUMLgpfLRc2bPoF5wEGTf_CMThDaobbs",
      authDomain: "chat-app-dcceb.firebaseapp.com",
      projectId: "chat-app-dcceb",
      storageBucket: "chat-app-dcceb.appspot.com",
      messagingSenderId: "274167868127",
      appId: "1:274167868127:web:76dae021bd7759d10fd76a",
      measurementId: "G-Y8CLF5K208",
    };
  

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } 

    this.referenceChatUser = null;
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }
  

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
    });
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
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
          user={{ name: name }}
        />

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
