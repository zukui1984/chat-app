import React from 'react';
import { Text, View, Button } from "react-native";

export default class Chat extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { name: "" };
  // }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder="Type here ..."
        /> */}
        {/* <Text>You wrote: {this.state.text}</Text> */}
        <Button
        title="Go to Start"
          onPress={() => this.props.navigation.navigate ("Start")} />      
      </View>
    );
  }
}
