import * as React from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Easing, View, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { useState, useRef, useEffect, createContext } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import AnimatedSplash from "react-native-animated-splash-screen";
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
import { Map2Screen } from './Components/Home/Map.js';
//import { TrackingScreen } from './Tracking.js';
//import { TEST } from './TEST.js';
//import { MenuScreen } from './Menu.js';
import { MenuScreen } from './Menu.js';
import { AccountScreen } from './Account.js';
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

const MovingView = (props) => {
  const backgroundFade = useRef(new Animated.Value(0)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoMovement = useRef(new Animated.Value(800)).current;
  useEffect(() => {
     Animated.timing(backgroundFade, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
     }).start();
     Animated.timing(logoFade, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
     }).start();
     setTimeout(() => {
        Animated.timing(logoMovement, {
              toValue: -50,
              duration: 4000,
              easing: Easing.inOut(Easing.exp),
              useNativeDriver: true,
        }).start();
     }, 500);
  }, []);
  const styles = StyleSheet.create({
     img: {
      height: 300,
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: logoFade,
      transform: [{translateY: logoMovement}],
     },
  });
  return (
    <Animated.View style={{
      ...props.style,
      opacity: backgroundFade,         // Bind opacity to animated value
          }}
      >
        <Animated.Image 
					source={require('./assets/kfhlogo.png')}
					style={styles.img}
				/>{props.children}
    </Animated.View>
 );
}

export default function KungFoodHippo() {
  const [active, setActive] = React.useState('');
  const [userEmail, setUserEmail] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userToken, setUserToken] = React.useState();
  const [loginState, setLoginState] = React.useState(true);
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 900);

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
      <AnimatedSplash
      translucent={true}
      isLoaded={loading}
      logoImage={require("./assets/slash.gif")}
      backgroundColor={"#000"}
      logoHeight={600}
      logoWidth={600}
    >
      {loginState ? (
        <MovingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E76766' }}>

          <Text style={theme.bigtext}>LOGIN</Text>

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

        </MovingView>
      ) :

        (
          <userContext.Provider value={{userEmail, userName, userToken}}>
            <NavigationContainer>
              <Menu.Navigator initialRouteName="Home">
                {/* <Menu.Screen name="Login" component={LoginScreen} /> */}
                <Menu.Screen name="Home" component={HomeScreen} />
                <Menu.Screen name="Menu" component={MenuScreen} />
                <Menu.Screen name="Account" component={AccountScreen} />
                <Menu.Screen name="Listing" component={ListingScreen} initialParams={{otherParam:'Search for restaurants'}}/>
                <Menu.Screen name="Store" component={StoreScreen} />
                <Menu.Screen name="Checkout" component={CheckoutScreen} />
                <Menu.Screen name="Payment" component={PaymentScreen} />
                <Menu.Screen name="Map" component={MapScreen} />
                <Menu.Screen name="Suggestion" component={SuggestionScreen} />
                <Menu.Screen name="Map2" component={Map2Screen} />

                {/*<Menu.Screen name="Tracking" component={TrackingScreen} />*/}
              </Menu.Navigator>
            </NavigationContainer>
          </userContext.Provider>)}
          
      
    </AnimatedSplash>

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
    marginVertical: 30,
    //color: "#E76766",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 40,
    // fontFamily: "Roboto-Regular",
    fontWeight: "bold"
  },

  text: {
    marginTop: 5,
    paddingVertical: 5,
    //color: "#E76766",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 25,
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
    width: 200,
    height: 180,
    justifyContent: 'center',

  },
};