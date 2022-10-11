import * as React from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { useState, createContext } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, IconButton } from 'react-native-paper';
import { CheckoutScreen } from './Checkout';
import { PaymentScreen } from './Payment';
import { HomeScreen } from './Home.js';
import { MapScreen } from './MapStatus';
import { ListingScreen } from './RestaurantListing';
import { StoreScreen } from './Store';
import { DemoScreen } from './Demo.js';
import { SuggestionScreen } from './Suggestion.js';
import { CookingScreen } from './Cooking';
import { Map2Screen } from './Components/Home/Map.js';
//import { TrackingScreen } from './Tracking.js';
//import { TEST } from './TEST.js';
//import { MenuScreen } from './Menu.js';
import { MenuScreen } from './Menu.js';
import { AccountScreen } from './Account.js';
import AnimatedSplash from "react-native-animated-splash-screen";

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
import { onChange } from 'react-native-reanimated';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { acc } from 'react-native-reanimated';

export const userContext = React.createContext();

WebBrowser.maybeCompleteAuthSession();


export default function KungFoodHippo() {
  const [active, setActive] = React.useState('');
  const [userEmail, setUserEmail] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userToken, setUserToken] = React.useState();
  const [loginState, setLoginState] = React.useState(true);
  const [isLoaded, setLoading] = React.useState(false);

  const fetchUserInfo = (token) => {
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((resp) => resp.json())
      .then((val) => {
        //route.params.setUserEmail(val.email);
        //console.log(val.email);
        setUserName(val.name);
        setUserEmail(val.email);
        console.log(val);
        //, { userEmail: val.email });
      })
      .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
    iosClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
    androidClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
    webClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
  });




  React.useEffect(() => {

  setLoading(true);
    if (response?.type === 'success') {
      const { authentication } = response;
      //route.params.handle(fetchUserInfo(authentication));
      //console.log(authentication.accessToken);
      setUserToken(authentication.accessToken);
      fetchUserInfo(authentication.accessToken);
      setLoginState(false);

    }
  }, [response]);

 

  return (

    <PaperProvider theme={theme}>
      {loginState ? (
         <AnimatedSplash
         translucent={true}
         isLoaded={isLoaded}
         logoImage={require("./assets/KFH.png")}
         backgroundColor={"#E76766"}
         logoHeight={200}
         logoWidth={200}
       >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#E76766' }}>
          <Text style={theme.bigtext}>Login</Text>
          <Image source={require('./assets/Videos/run-gif.gif')} style={theme.KFH} />
          <Text style={theme.text}>Kung Food Hippo</Text>

          <TouchableOpacity
            //style={theme.button}
            android_ripple={{ color: 'white', borderless: false }} disabled={!request}
            onPress={() => { promptAsync(); }}>
            <View style={theme.btnContainer}>
              <Image
                source={require('./assets/google.png')}
                style={theme.logo}
              />
              <Text style={theme.btnText}>LOGIN WITH GOOGLE</Text>
            </View>
          </TouchableOpacity>

        </View>
        </AnimatedSplash>
      ) :

        (
          <userContext.Provider value={{userEmail, userName, userToken}}>
            <NavigationContainer>
              <Menu.Navigator initialRouteName="Home">
                {/* <Menu.Screen name="Login" component={LoginScreen} /> */}
                <Menu.Screen name="Home" component={HomeScreen} />
                <Menu.Screen name="Menu" component={MenuScreen} />
                <Menu.Screen name="Account" component={AccountScreen} />
                <Menu.Screen name="Listing" component={ListingScreen} />
                <Menu.Screen name="Store" component={StoreScreen} />
                <Menu.Screen name="Checkout" component={CheckoutScreen} />
                <Menu.Screen name="Payment" component={PaymentScreen} />
                <Menu.Screen name="Map" component={MapScreen} />
                <Menu.Screen name="Suggestion" component={SuggestionScreen} />
                <Menu.Screen name="Cooking" component={CookingScreen} />
                <Menu.Screen name="Map2" component={Map2Screen} />

                {/*<Menu.Screen name="Tracking" component={TrackingScreen} />*/}
              </Menu.Navigator>
            </NavigationContainer>
          </userContext.Provider>)}


    </PaperProvider>


  );
}


const Menu = createDrawerNavigator();

const styles = StyleSheet.create({
  primColor: "#E76766",
  primTextColor: "#FFFFFF",
  primIconColor: "#FFFFFF",
  secColor: "#F9E6E6",
  backgroundColor: "#FFFFFF",
});

const theme = {
  DefaultTheme,
  colors: {
    primary: styles.primColor,
    secondary: styles.secColor,
  },


  btnContainer: {
    backgroundColor: "#E4A478",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  bigtext: {
    marginTop: 8,
    paddingVertical: 8,
    //color: "#E76766",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 40,
    // fontFamily: "Roboto-Regular",
    fontWeight: "bold"
  },

  text: {
    marginTop: 8,
    paddingVertical: 8,
    //color: "#E76766",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 40,
    // fontFamily: "Roboto-Regular",
    fontWeight: "bold",
    justifyContent: 'center',
  },

  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 0,
    //backgroundColor: "#E76766",
    //backgroundColor: "#F0D682",
    // fontFamily: "Roboto-Regular",
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    //left: 15
  },
  logo: {
    width: 30,
    height: 30,
    right: 15,
    justifyContent: 'center',
  },

  KFH: {
    width: 240,
    height: 240,
    justifyContent: 'center',

  },
};