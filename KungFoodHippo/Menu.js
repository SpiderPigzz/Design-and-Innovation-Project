import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity , Pressable } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
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
import { color } from 'react-native-reanimated';

export function MenuScreen({ navigation }) {
    
    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}

            {/* PROFILE NAME */}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'center' , backgroundColor: '#E76766'}}>
            <TouchableOpacity                                       
                
                onPress={() => navigation.navigate('Home')}>   
                <View style={theme.btnContainer}>                    
                    <InitialIcon initials="K"/>

                    <Text style={theme.btnText}>Kung Food Hippo</Text>
                </View>
                </TouchableOpacity>
            </View>

            {/* PURCHASE */}
            
                <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#FFFFFF'}}> 
                                
                    <TouchableOpacity                                       
                    
                    onPress={() => navigation.navigate('Home')}>   
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "shopping-outline" >   
                            <Text style={theme.text}>My Purchases </Text>
                        </Button>
                        <Text style={theme.sidetxt}>View History</Text>
                        </View>
                    </TouchableOpacity>
                
                </View>
            
            {/*my purchase white box */}
            <View style={{flex:0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF'}}></View>
            {/*grey box after my purchase*/}
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/* white box */}
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF'}}>
                <View style={theme.productsContainer}>
                <TouchableOpacity                                                       
                    onPress={() => navigation.navigate('Home')}>   
                        <View style={{alignItems:'center', marginTop:5}}>
                            <Image 
                                source={require('./assets/to-deliver-icon.png')}
                                style = {theme.midlogo}
                            />
                            <Text style={theme.smalltext}> To Deliver</Text>
                        </View>
                </TouchableOpacity>
                
                
                <TouchableOpacity                                       
                    onPress={() => navigation.navigate('Home')}>   
                    <View style={{alignItems:'center'}}>
                            <Image 
                                style = {theme.midlogo}
                                source={require('./assets/to-receive-icon.png')}                                
                            />
                            <Text style={theme.smalltext}> To Receive</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity                                       
                    onPress={() => navigation.navigate('Home')}>   
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
            <TouchableOpacity                                       
                    
                onPress={() => navigation.navigate('Home')}>   
                    <View style={theme.Container}>   
                    <Button labelStyle={{fontSize: 35}} icon="wallet">
                        <Text style={theme.text}>My Wallet </Text>                                              
                    </Button>
                    
                    </View>
            </TouchableOpacity>
            </View>
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
    
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF'}}>
            <View style={theme.productsContainer}>

                {/*WALLET */}
                <TouchableOpacity                                                       
                    onPress={() => navigation.navigate('Home')}> 
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
                    onPress={() => navigation.navigate('Home')}>   
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
                    onPress={() => navigation.navigate('Home')}>  
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
                <TouchableOpacity                                       
                    onPress={() => navigation.navigate('Home')}>   
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "shopping" >   
                            <Text style={theme.text}>Buy again</Text>                            
                        </Button>                        
                        <Text style={[theme.sidetxt,{textAlign:'right'}]}>View Items</Text>       
                        </View>     
                    </TouchableOpacity>
            </View>

            {/*grey box below buy again*/}
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*white box box below buy again*/}
            <View style={{ flex: 1.6, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <View style={theme.box}>
                    <View style={theme.boxUI}>
                        <View style={theme.image}>
                            <Image source={require('./assets/Pastamania.png')} style={theme.image}  />
                        </View>    

                        <View style={theme.text}>
                            <Text style={{color: 'grey'}}>Bought 1 time</Text>                            
                            <Button icon = "plus-circle"><Text style={styles.text}>$17</Text></Button>
                            
                        </View>
                    </View>
                </View>

                <View style={theme.box}>
                    <View style={theme.boxUI}>
                        <View style={theme.image}>
                            <Image source={require('./assets/images/subway.png')} style={theme.image}  />
                        </View>    

                        <View style={theme.text}>
                            <Text style={{color: 'grey'}}>Bought 1 time</Text>                            
                            <Button icon = "plus-circle"><Text style={styles.text}>$8.50</Text></Button>
                            
                        </View>
                    </View>
                </View>

                <View style={theme.box}>
                    <View style={theme.boxUI}>
                        <View style={theme.image}>
                            <Image source={require('./assets/images/takagiramen.png')} style={theme.image}  />
                        </View>    

                        <View style={theme.text}>
                            <Text style={{color: 'grey'}}>Bought 1 time</Text>                            
                            <Button icon = "plus-circle"><Text style={styles.text}>$12</Text></Button>
                            
                        </View>
                    </View>
                </View>
            </View>
            {/*grey box below bought 1 time*/}
            <View style={{ flex: 0.05, alignItems: 'center', justifyContent: 'space-between'}}></View>
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
                    onPress={() => navigation.navigate('Home')}>   
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
                    onPress={() => navigation.navigate('Home')}>   
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
                    onPress={() => navigation.navigate('Home')}>   
                        <View style={theme.Container}>   
                        <Button labelStyle={{fontSize: 35}} icon = "help-circle-outline" >   
                            <Text style={theme.text}>Help Center</Text>                            
                        </Button>
                        </View>
                </TouchableOpacity>
            </View>

            {/*grey box below help centere*/}
            <View style={{ flex: 0.02, alignItems: 'center', justifyContent: 'space-between'}}></View>
            {/*grey box below help center*/}
            <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#FFFFFF', flexDirection: 'row',}}>
                <TouchableOpacity                                                        
                    onPress={() => navigation.navigate('Home')}>   
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
        //backgroundColor:'#000',
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
        flex: 0.5,
        
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


