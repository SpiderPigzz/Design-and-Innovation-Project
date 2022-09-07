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


export function LoginScreen({ navigation }) {
    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#E76766'}}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between'}}></View>
                <Text style={theme.bigtext}>Login</Text>                
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' , backgroundColor: '#E76766'}}></View>
                <Image source={require('./assets/KFH.png')}/>                  
                <Text style={theme.text}>Kung Food Hippo</Text>                               
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between'}}></View>
                <TouchableOpacity                                       
                //style={theme.button}
                android_ripple={{ color: 'white', borderless: false }}                     
                onPress={() => navigation.navigate('Home')}>   
                <View style={theme.btnContainer}>                    
                <Image 
                    source={require('./assets/google2.png')}
                    style = {theme.logo}
                    />

                    <Text style={theme.btnText}>LOGIN WITH GOOGLE</Text>
                </View>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' , backgroundColor: '#E76766'}}></View>


            {/*GOOGLE LOGIN PART */}
                          


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
        fontSize: 30,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold"
    },

    text: {
        marginTop: 8,
        paddingVertical: 8,
        //color: "#E76766",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold"
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
      logo:{
        right: 15,
        justifyContent: 'center'
    },


};