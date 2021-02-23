import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ImageBackground, 
  TouchableOpacity,
  Button,
} from "react-native";

const image = require("../assets/Background_Image.png");

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      colors: []
    }
  }

  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
     <Text style={styles.appTitle}>Chat App</Text>
      <View style={styles.container}>
         <TextInput
          style={styles.nameInput}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder='Your Name'
        />
      <Text style={styles.backgroundColorText}>Choose Background Color:</Text>
      <View style={styles.colorInput}>
      <TouchableOpacity
        onPress={() => {this.setState({color: '#ecc86e'})}}
        style={[styles.colorButton, styles.color1]} />
      <TouchableOpacity
        onPress={() => {this.setState({color: '#75ac4f'})}}
        style={[styles.colorButton, styles.color2]} />
      <TouchableOpacity
        onPress={() => {this.setState({color: '#8A95A5'})}}
        style={[styles.colorButton, styles.color3]} />
      <TouchableOpacity
        onPress={() => {this.setState({color: '#0054a7'})}}
        style={[styles.colorButton, styles.color4]} />
        </View>
      
      <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate
            ('Chat', { name: this.state.name, color: this.state.color})}
        >
          <Text style={styles.submitButtonText}>Start Chat</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '45%',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 22
  },
  appTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: '20%'
  },
  image: {
    flex: 1
  },
  nameInput: {
    fontSize: 15,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    borderColor: '#757083',
    borderWidth: 2,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: 20,
    width: '85%',
    height: '20%'
  },
  submitButton: {
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    width: '86%',
    height: '20%',
    marginBottom: '5%',
    marginLeft: '6%'
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  backgroundColorText: {
    fontSize:16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginLeft: 15
  },
  colorButton: {
    height: 32,
    width: 35,
    borderRadius: 33,
    margin: 5
  },
  colorButtonStyleOnPressed: {
    borderColor: '#757083',
    borderWidth: 2
  },
  color1: {
    backgroundColor: '#ecc86e'
  },
  color2: {
    backgroundColor: '#75ac4f'
  },
  color3: {
    backgroundColor: '#8A95A5'
  },
  color4: {
    backgroundColor: '#0054a7'
  },
  colorInput: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'flex-start',
    margin: 15
  }
});
