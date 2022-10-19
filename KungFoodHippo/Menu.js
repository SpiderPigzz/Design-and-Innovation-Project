import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity , Pressable } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { MSuggest } from './Components/Menu/MSuggest.js';
import { MSuggest2 } from './Components/Menu/MSuggest2.js';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer } from 'react-native-paper';
import { HippoCard } from './Components/TestCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {userContext} from './App.js';
import {useContext} from 'react';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';

export function MenuScreen({}) {
    const navigation = useNavigation();
    const { userEmail, userName, userToken } = useContext(userContext);
    const [nameInitial, setInitials] = useState("");

    useEffect(() => {
        if( userName != null){
            setInitials(userName[0]);
        }

    }, [userName]);

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}


           
            {/* PROFILE NAME */}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'center' , backgroundColor: '#E76766'}}>
                <View style={theme.btnContainer}>                    
                    <InitialIcon initials={nameInitial}/>

                    <Text style={theme.btnText}>{userName}</Text>
                </View>
            </View>

            {/* PURCHASE */}
            
                <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#FFFFFF'}}> 
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "shopping-outline" >   
                            <Text style={theme.text}>My Purchases </Text>
                        </Button>
                        </View>
                </View>
            
            {/*my purchase white box */}
            <View style={{flex:0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF'}}></View>
            {/*grey box after my purchase*/}
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/* white box */}
            <View style={{ flex:0, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF'}}>
                <View style={theme.productsContainer}>
                <TouchableOpacity                                                       
                    onPress={() => navigation.navigate('Checkout')}>   
                        <View style={{alignItems:'center', marginTop:5}}>
                            <Image 
                                source={require('./assets/shopping-cart.png')}
                                style = {theme.midlogo}
                            />
                            <Text style={theme.smalltext}>Cart</Text>
                        </View>
                </TouchableOpacity>
                
                
                <TouchableOpacity                                       
                    onPress={() => navigation.navigate('Map')}>   
                    <View style={{alignItems:'center'}}>
                            <Image 
                                style = {theme.midlogo}
                                source={require('./assets/to-receive-icon.png')}                                
                            />
                            <Text style={theme.smalltext}> To Receive</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity                                       
                    >
                    <View style={{alignItems:'center'}}>
                            <Image 
                                source={require('./assets/rate-icon.png')}
                                style = {theme.midlogo}                                
                            />
                            <Text style={theme.smalltext}> To Rate</Text>
                    </View>    
                </TouchableOpacity>
                </View>
            </View>

            {/*my wallet above grey box */}
            <View style={{ flex: 0.04, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*my wallet white box */}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF'}}>
                    <View style={theme.Container}>   
                    <Button labelStyle={{fontSize: 35}} icon="wallet">
                        <Text style={theme.text}>My Wallet </Text>                                              
                    </Button>
                    
                    </View> 
            </View>
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
    
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF'}}>
            <View style={theme.productsContainer}>

                {/*WALLET */}
                <TouchableOpacity                                                       
                    >
                    <View style={{alignItems:'center',  marginTop:5}}>
                            <Image 
                                style = {theme.midlogo}
                                source={require('./assets/wallet.png')}
                            />
                            <Text style={theme.smalltext}>Hippo Pay{'\n'} 
                                <Text style={theme.wordtext}>$50</Text>
                            </Text>     
                        </View>                       
                </TouchableOpacity>
                
                
                {/*COINS */}
                
                <TouchableOpacity                                       
                   >
                    <View style={{alignItems:'center'}}>
                            <Image 
                                style = {theme.midlogo}
                                source={require('./assets/coin-icon.png')}                                
                            />
                            <Text style={theme.smalltext}>My Hippo Coins{'\n'} 
                                <Text style={theme.wordtext}>100 Coins</Text>
                            </Text>
                    </View>                            
                </TouchableOpacity>
                

                {/*VOUCHERS */}
                <TouchableOpacity                                       
                   >
                    <View style={{alignItems:'center'}}>
                            <Image 
                                style = {theme.midlogo}
                                source={require('./assets/voucher-icon.png')}         
                            />
                            <Text style={theme.smalltext}>My Vouchers{'\n'} 
                                <Text style={theme.wordtext}>10 Vouchers</Text>
                            </Text>                     
                    </View>        
                </TouchableOpacity>
                </View>

            </View>
            {/*my wallet below grey box */}
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*buy again white box */}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#FFFFFF'}}>
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "shopping" onPress={() => navigation.navigate('Suggestion')} >   
                            <Text style={theme.text}>Suggestions</Text>                            
                        </Button>                          
                        </View>     
            </View>
            <View style={{flexDirection:'row'}}>
            <MSuggest></MSuggest> 
            <MSuggest2></MSuggest2>

            </View>
            
            {/*grey box below buy again*/}
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
           
            {/*grey box below bought 1 time*/}
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*grey box below buy again*/}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                    onPress={() => navigation.navigate('Home')}>   
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "history" >   
                            <Text style={theme.text}>Recently Viewed</Text>                            
                        </Button>
                        </View>
                </TouchableOpacity>
            </View>

            {/*grey box below recently viewed*/}
            <View style={{ flex: 0.01, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*grey box below recently viewed*/}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                   >
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "heart" >   
                            <Text style={theme.text}>Favourites</Text>                            
                        </Button>
                        </View>
                </TouchableOpacity>

            </View>
            
            {/*grey box below favourites*/}
            <View style={{ flex: 0.01, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*grey box below fav*/}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                   >
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "earth" >   
                            <Text style={theme.text}>Foodie Community</Text>                            
                        </Button>
                        </View>
                </TouchableOpacity>
            </View>            

            {/*grey box below refer a friend*/}
            <View style={{ flex: 0.04, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*grey box below raf*/}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                    onPress={() => navigation.navigate('Account')}>   
                        <View style={theme.Container}> 
                        <Button labelStyle={{fontSize: 35}} icon = "account" >   
                            <Text style={theme.text}>Account</Text>                            
                        </Button>
                        </View>
                </TouchableOpacity>
            </View>

            {/*grey box below acc*/}
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*grey box below raf*/}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                   >
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "help-circle-outline" >   
                            <Text style={theme.text}>Help Center</Text>                            
                        </Button>
                        </View>
                </TouchableOpacity>
            </View>

            {/*grey box below help centere*/}
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*grey box below help center*/}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                   >
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "chat-outline" >   
                            <Text style={theme.text}>Chat with Hippo</Text>                            
                        </Button>
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

    sidetxt: {
        //textAlign: 'right',
        color: 'grey',
        flexDirection: 'row',
        textAlign:'right'
        //alignItems: 'stretch',
    },

    tinylogo:{
        width: 31,
        height: 30,                

    },

    midlogo:{
        width: 45,
        height: 44,
        resizeMode: 'contain',
        alignItems: 'center',
        //backgroundColor:'#000',
        justifyContent: 'center',
        //marginLeft:4,

    },
    
    productsContainer: {
        //display: 'flex',
        paddingVertical: 3,
        width: '90%',
        //flexrap: 'wrap',
        justifyContent: 'space-between',
        //justifyContent: 'center',
        flexDirection: 'row',
        //backgroundColor:'black',
        alignItems: 'center',
        textAlign:'center'
        
    },

    btnContainer: {        
        paddingHorizontal: 20,
        paddingVertical: 10,        
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',        
        textAlign: 'center'
    },
    Container: {        
        //paddingHorizontal: 20,
        //paddingVertical: 10,        
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    smalltext: {
        marginTop: 8,
        paddingVertical: 8,      
        color: "black",
        textAlign: "center",
        fontSize: 12,
    },

    text: {
        paddingVertical: 8,
        color: "black",
        textAlign: "center",
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center'
    },
    wordtext: {    
        paddingVertical: 8,
        color: "#E76766",
        textAlign: "center",
        fontSize: 10,
    },

    button: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 0,        
        borderRadius: 5,
        
    },
      btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        left: 15
      },
      logo:{        
        //top: 7,
        //left: 10,      
        justifyContent: 'center',
        minWidth: 40, 
        minHeight: 40, 
        aspectRatio: 1,
        resizeMode: 'contain',
        
    },

    catContainer: {
        marginTop: 10,
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',   
        alignItems: 'center',
        textAlign: 'center'     
    },
    
    //BoxSize
    box: {

        width: '30%',
        height: '90%',
        margin: '2%',
        padding: '2%',        
        padding: 5,
        flex: 1,
        backgroundColor: 'black'
        
    },

    //Inner box for image
    innerbox: {        
        margin: '6%',        
        padding: 45,
        flex: 0.5,        
        borderRadius: 5,
        backgroundColor: 'black',
    },

    //Box UI
    boxUI: {
        borderRadius: 5,
        flex: 1,
        backgroundColor: 'white', //yellow FCD077
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
          },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 12,
    },

    //image 
    image: {
        flex: 1,    
        justifyContent: 'center',
        height: undefined,
        width: undefined,        
        alignItems: 'center',
        margin: '6%',        
        padding: 45,
        flex: 0.5,
        borderRadius: 5,        
        //textAlign: 'center'
        
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


