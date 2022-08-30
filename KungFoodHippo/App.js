import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import * as Font from 'expo-font';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import * as FileSystem from 'expo-file-system';
import { Asset } from "expo-asset";
import * as SQLite from 'expo-sqlite';

async function openDatabase() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite/", {intermediates: true});
  const dbAsset = Asset.fromModule(require("./assets/kungfoodhippo.db"));
  await FileSystem.deleteAsync(
    FileSystem.documentDirectory + "SQLite/db.db", {idempotent : true})
/*   FileSystem.readDirectoryAsync(FileSystem.documentDirectory+ "SQLite").then( t =>
    console.log(t)
  ) */
  await FileSystem.downloadAsync(
    dbAsset.uri, FileSystem.documentDirectory + "SQLite/db.db"
  ); 
  return SQLite.openDatabase("db.db");
}

openDatabase().then(
  db => {
    db.transaction(
      tx => {
        tx.executeSql("select name from 'shop' ", [], 
          (trans, result) => {
            console.log(result.rows)
          },
          (trans, err) => {
            console.error(err)
          }
        );
      }
    );   
  }
)


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

  h1: {
    marginTop: 16,
    paddingVertical: 8,
    color: "#111111",
    textAlign: "center",
    fontSize: 60,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold"
  },
  
  h2: {
    marginTop: 16,
    paddingVertical: 8,
    color: "#111111",
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold"
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

  color_red: "#E76766",
  color_yellow: "#FCD077",
  color_red_shallow:'rgba(91,40,40,0.25)' 

});

