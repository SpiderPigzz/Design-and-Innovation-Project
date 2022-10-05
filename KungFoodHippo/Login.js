import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer } from 'react-native-paper';
import { styles } from './Styles.js'
import { HippoCard } from './Components/TestCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { acc } from 'react-native-reanimated';

WebBrowser.maybeCompleteAuthSession();


export function LoginScreen({ navigation, route }) {


    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
        iosClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
        androidClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
        webClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
    });


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
                navigation.navigate('Home', { userEmail: val.email });
            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });


    }

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            //route.params.handle(fetchUserInfo(authentication));
            console.log(authentication.accessToken);
            fetchUserInfo(authentication.accessToken);

        }
    }, [response]);

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E76766' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}></View>
                <Text style={theme.bigtext}>Login</Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#E76766' }}></View>
                <Image source={require('./assets/KFH.png')} style={theme.KFH} />
                <Text style={theme.text}>Kung Food Hippo</Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}></View>


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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#E76766' }}></View>


        </PaperProvider>


    );
}

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

