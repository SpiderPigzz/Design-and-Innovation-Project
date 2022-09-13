import * as React from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, IconButton } from 'react-native-paper';
import { styles } from './Styles.js'
import { CheckoutScreen } from './Checkout';
import { PaymentScreen } from './Payment';
import { HomeScreen } from './Store.js';
import { ListingScreen } from './RestaurantListing';
import { DemoScreen } from './Demo.js';
import { LoginScreen } from './Login.js';
//import { TrackingScreen } from './Tracking.js';
//import { TEST } from './TEST.js';
//import { MenuScreen } from './Menu.js';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import renderNode from 'react-native-elements/dist/helpers/renderNode.js';

import * as FileSystem from 'expo-file-system';
import { Asset } from "expo-asset";
import * as SQLite from 'expo-sqlite';



async function openDatabase() {
  const workingDir = FileSystem.documentDirectory + 'SQLite';
  const dbFile = "db.db"
  const dbUri = workingDir + "/" + dbFile
  const dirInfo = await FileSystem.getInfoAsync(workingDir)
  if (dirInfo.exists===false) {
    await FileSystem.makeDirectoryAsync(workingDir);
  }
 
/*   await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+ "SQLite").then( t =>
    console.info(t)
  )  */
  const fileInfo = await FileSystem.getInfoAsync(dbUri)
  if ((fileInfo.exists)===false){
    const dbAsset = Asset.fromModule(require("./assets/kungfoodhippo.db"));
    console.warn("database file not found downloading new")
    await FileSystem.downloadAsync(
      dbAsset.uri, dbUri
    ); 
  }
  SQLite.openDatabase(dbFile)._db.close()//to fix SQLITE_READONLY_DBMOVED that occurs with prepopulated db
  return SQLite.openDatabase(dbFile);
}


openDatabase().then(
  async db => {
    transactions = new Promise(
      () => {db.transaction(
        tx => {


          //example non-conditional select
          tx.executeSql(
              "SELECT name, address FROM 'shop' LIMIT 3", [], 
            (trans, result) => {
              console.log("select:")
              console.log(result.rows)
            },
            (trans, err) => {
  
              console.error(err)
              //return true //this will rollback the transaction if uncommented
            }
          );


          // example conditional select statment
          tx.executeSql(
            "SELECT s.'name', d.'name', d.'price'" 
            +"FROM 'dish' AS d INNER JOIN 'shop' "
            +"AS s ON s.'ID' = d.'shop.ID' "
            +"WHERE s.'name' like ?"
            +"ORDER BY d.'price'",
            ['A&W%'],
            (trans, result) => {
              console.log("select statement with where clause:")
              console.log(result.rows)
            },
            (trans, err) => {
              console.error(err)
              //return true //this will rollback the transaction if uncommented
            });
  
          tx.executeSql(
              "SELECT * FROM 'cart_items'", [], 
            (trans, result) => {
              console.log("before insert:")
              console.log(result.rows)
            },
            (trans, err) => {
              console.error(err)
              //return true //this will rollback the transaction if uncommented
            }
          );
  

          //example insert statment
          tx.executeSql(
              "INSERT INTO 'main'.'cart_items' ('shop.ID', 'dish.name', 'customer.email', 'quantity') "
              +"VALUES (?, ?, ?, ?);", 
              ['78141afc6a384ddb936457abf89ca56c', 'Fried Bun', 'realperson@sharklasers.com', 5], 
            (trans, result) => {

            },
            (trans, err) => {
  
              console.error(err)
              //return true //this will rollback the transaction if uncommented
            }
          );
  
  
          tx.executeSql(
            "SELECT * FROM 'cart_items'", [], 
            (trans, result) => {
              console.log("after insert:")
              console.log(result.rows)
            },
            (trans, err) => {
              console.error(err)
              //return true //this will rollback the transaction if uncommented
            }
          );
        });
      }
    )
    transactions.then(
      () => db.closeAsync()
    )
  }
)


export default function KungFoodHippo() {
  const [active, setActive] = React.useState('');

  

  return (

    <PaperProvider theme={theme}>
      
      <NavigationContainer>
        <Menu.Navigator initialRouteName="Login">
        <Menu.Screen name="Login" component={LoginScreen} />
        <Menu.Screen name="Home" component={HomeScreen} />
          <Menu.Screen name="Listing" component={ListingScreen} />
          <Menu.Screen name="Checkout" component={CheckoutScreen} />
          <Menu.Screen name="Payment" component={PaymentScreen} />
          
          {/*<Menu.Screen name="Tracking" component={TrackingScreen} />*/}
        </Menu.Navigator>
      </NavigationContainer>

    </PaperProvider>

    
  );
}


const Menu = createDrawerNavigator();


const theme = {
  DefaultTheme,
  colors: {
    primary: styles.primColor,
    secondary: styles.secColor,
  },
};