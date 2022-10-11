import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity , Pressable, TextInput } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer, ThemeContext } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer } from 'react-native-paper';
import { HippoCard } from './Components/TestCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { userContext } from './App.js';
import { useContext } from 'react';

export function AccountScreen({ navigation }) {
    
    const [address, setAddress] = useState("");
    const { userEmail, userName, userToken } = useContext(userContext);

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}

            {/* PINK ACC PART */}
            <View style={{ flex: 0.3, alignItems: 'flex-start', justifyContent: 'center' , backgroundColor: '#E76766', }}>
                <View style={theme.Container}>      
                <TouchableOpacity                                       
                onPress={() => navigation.navigate('Menu')}>   
                    <View style={theme.Container}>      
                        <Image
                            source={require('./assets/back-logo.png')}
                            style={theme.backlogo}
                        />                    
                    </View>
                </TouchableOpacity>
                <Text style={theme.bigText}>Account</Text>                
                </View>
            </View>


            {/* GREY BOX MY ACCOUNT */}
            <View style={{ flex: 0.3, justifyContent: 'center'}}>
                <Text style={theme.maintext}>My Account</Text>
            </View>
            
            {/*ACCOUNT NAME BOX*/}
            <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <View style={theme.Container}>
                    <Button labelStyle={{fontSize: 35}} icon = "account" >   
                        <Text style={theme.text}>{userName}</Text>                            
                    </Button>
                </View>
            </View>

            {/*SMALL GREY LINE*/}
            <View style={{ flex: 0.05, alignItems: 'center', justifyContent: 'space-between'}}></View>

            {/*ADDRESS BOX*/}
            <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <View style={theme.Container}>   
                    <Button labelStyle={{fontSize: 35}} icon = "home" >   
                        <Text style={theme.text}>Sk</Text>                            
                    </Button>
                <View style={{ flex: 1,  flexDirection:'row-reverse' ,justifyContent: 'flex-start'}}>
            
                <Button labelStyle={{fontSize: 25}} icon="square-edit-outline"
                onPress={() => navigation.navigate('')}>
                </Button>
            </View>
            </View>
            </View>

            {/*SMALL GREY BOX*/}
            <View style={{ flex: 0.05, alignItems: 'center', justifyContent: 'space-between'}}></View>

            {/*PHONE BOX*/}
            <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
            <View style={theme.Container}>   
                <TouchableOpacity                                                        
                    onPress={() => navigation.navigate('Home')}>   
                        
                        <Button labelStyle={{fontSize: 35}} icon = "phone" >   
                            <Text style={theme.text}>+65 999</Text>                            
                        </Button>
                        
                </TouchableOpacity>
                <View style={{ flex: 1,  flexDirection:'row-reverse' ,justifyContent: 'flex-start'}}>
                <Button labelStyle={{fontSize: 25}} icon="square-edit-outline"
                    onPress={() => navigation.navigate('')}>
                </Button>
                </View>
                </View>
            </View>

            {/*SMALL GREY BOX*/}
            <View style={{ flex: 0.05, alignItems: 'center', justifyContent: 'space-between'}}></View>

            {/*EMAIL BOX*/}
            <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <View style={theme.Container}>
                <TouchableOpacity                                                        
                    onPress={() => navigation.navigate('Home')}>   
                        <View style={theme.picContainer}>
                            <Image 
                            source={require('./assets/google.png')}
                            style = {theme.logo}/>
                            <Text style={theme.text}>{userEmail}</Text> 
                            </View>
                </TouchableOpacity>
                <View style={{ flex: 1,  flexDirection:'row-reverse' ,justifyContent: 'flex-start'}}>
                <Button labelStyle={{fontSize: 25}} icon="square-edit-outline"
                    onPress={() => navigation.navigate('')}>
                </Button>
                </View>
                </View>
            </View>

            {/*GREY BOX*/}
            <View style={{ flex: 0.3, justifyContent: 'center'}}>
                <Text style={theme.maintext}>Support</Text>
            </View>

            {/*HELP CENTER BOX*/}
            <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                    onPress={() => navigation.navigate('Home')}>   
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "help-circle-outline" >   
                            <Text style={theme.text}>Help Center</Text>                            
                        </Button>
                        </View>
                </TouchableOpacity>
            </View>

            {/*SMALL GREY BOX*/}
            <View style={{ flex: 0.05, justifyContent: 'space-between'}}>
            </View>

            {/*LOG OUT BOX*/}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF'}}>
                <TouchableOpacity                                       
                    onPress={() => navigation.navigate('Login')} >  
                    <View style={theme.btnContainer}>                    
                        <Text style={theme.btntext}>LOG OUT</Text>
                    </View>
                </TouchableOpacity>
            </View>
            


        </PaperProvider>

        
    );  
}

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
    

    picContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },

    btnContainer: {
        backgroundColor: "#E76766",
        paddingHorizontal: 150,
        paddingVertical: 10,        
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },

    btntext: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        
    },

    Container: {        
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'flex-start',
        //backgroundColor:'black',
        width: '100%',
        height: '100%'
    },

    maintext: {
        paddingVertical: 8,
        justifyContent:'center',
        color: "black",        
        fontSize: 18,
        alignItems: 'center',
        left: 20,
        fontWeight: "bold"
    },

    text: {    
        paddingVertical: 8,
        color: "black",        
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
        left: 20,
        flexWrap: 'wrap',   
        resizeMode: 'contain',
    },

    bigText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        left: 30
      },

    logo:{
        justifyContent: 'center',
        left:1,
        width: 40,
        height: 40,
        aspectRatio: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',   
        alignItems: 'center',
        float: 'left',
        
    },

    backlogo:{        
        //top: 7,
        left: 10,      
        justifyContent: 'center', 
        width: 50,
        height: 50,
        aspectRatio: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',   
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

};
const InitialIcon = ({ initials, name }) => {
    return (
      <View
        style={{        
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          width: 50,
          height: 50,          
        }}>
        <Text style={{ color: '#E76766', fontSize: 30, fontWeight: "bold" }}>{initials}</Text>               
      </View>
      
    );
  };

