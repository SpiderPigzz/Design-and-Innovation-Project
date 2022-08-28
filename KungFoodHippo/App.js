import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import * as Font from 'expo-font';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    }
  }

  async loadFonts() {
    await Font.loadAsync({
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Open up App.js to start working on your app!</Text>
          <Pressable style={styles.button} android_ripple={{ color: 'white', borderless: false }} onPress={this.onClickHandler}>
            <Text style={styles.buttontext}>TEST</Text>
          </Pressable>
          <Card containerStyle={styles.card} image={require('./assets/favicon.png')}>
            <Text style={styles.paragraph}>
              React Native Card View for Android and IOS using
              "react-native-elements"
            </Text>
          </Card>

          <Card containerStyle={styles.cardSec}>
            <Card.Title>Card Title</Card.Title>
            <Card.Image source={require('./assets/KFH.png')} backgroundColor={styles.primColor} resizeMode='contain'></Card.Image>
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component structure than actual design.
            </Text>
            <Pressable style={styles.button} android_ripple={{ color: 'white', borderless: false }} onPress={this.onClickHandler}>
              <Text style={styles.buttontext}>TEST</Text>
            </Pressable>
          </Card>
        </View>
      );

    }
  }

  onClickHandler = () => {

  }
}



styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginTop: 16,
    paddingVertical: 8,
    color: "#E76766",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold"
  },

  buttontext: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold"
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 0,
    backgroundColor: "#E76766",
    fontFamily: "Roboto-Regular",
    borderRadius: 5,
  },

  buttonSec: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    borderRadius: 5,
  },

  card: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 5,
    borderWidth: 0,
    backgroundColor: "#E76766",
    borderRadius: 5
  },

  cardSec: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 5,
    borderWidth: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 5
  },

  primColor: "#E76766",

  secColor: "#E76766"

});

