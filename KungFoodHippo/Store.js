import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow } from 'react-native-paper';
import { FoodCard } from './Components/Store/FoodCard.js';
import { ReviewCard } from './Components/Store/ReviewCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const url = 'http://dip.totallynormal.website/';
const menuPath = "getShopMenu/1";
const shopPath = "getShop/1"

export function StoreScreen({navigation, route}){

    const {shopID} = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [address, setAddress] = useState();


    useEffect(() => {
        fetch(url + menuPath)
            .then((response) => response.json())
            .then((json) => {
                for (var i = 0; i < json.length; i++) {
                    json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/1/' + json[i]['name'];
                    //console.log(json[i]['imageURI']);
                }
                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }) => (
        <FoodCard title={item.name} description={item.description} price={item.price} imageURI={item.imageURI}></FoodCard>
    );

    useEffect(() => {
        fetch(url + shopPath)
            .then((response) => response.json())
            .then((json) => {
                setRestaurant(json[0].name);
                setAddress(json[0].address);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View style={{flex: 1}}>
                <Image source={require('./assets/Pastamania.png')} style={{ height: 160, width: null}} />
                <TouchableOpacity 
                    style={[styles.buttonTouchable, { position: "absolute", left: 10, top: 5, backgroundColor: "#ffffff", width: 40, borderRadius: 50, alignContent: "center" }]}
                    onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('./assets/ArrowLeft.png')}
                            style={[styles.iconPrimTint, {height: 16, width: 16, }]}
                        />
                </TouchableOpacity>
            </View>

            <View style={[styles.container, { paddingHorizontal: 16 , paddingVertical: 8, flex: 4}]}>
                <View style={{ flexDirection: "row"}}>
                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>{restaurant}</Text>
                    
                </View>

                <ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingVertical: 4 }}>
                            <Image
                                source={require('./assets/locationpin.png')}
                                style={[styles.iconPrimTint, {height: 18, width: 12, alignSelf: "center"}]}
                            />
                            <Text style={{ textAlignVertical: "center" }}>   {address}</Text>
                        </View>
                        <Text style={[styles.innerText, { textAlignVertical: "center" }]}>More info</Text>
                    </View>
                    

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingVertical: 4 }}>
                            <Image
                            source={require('./assets/Time.png')}
                            style={[styles.iconPrimTint, {height: 16, width: 16, alignSelf: "center"}]}
                            />
                            <Text style={{fontWeight: "bold", textAlignVertical: "center"}}>  Delivery: 30 min</Text>
                        </View>
                        <Text style={[styles.innerText, { textAlignVertical: "center" }]}>Change</Text>
                    </View>

                    <ReviewCard></ReviewCard>

                    {/* navigation tab here */}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Popular</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Mains</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Sides</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>All</Text>
                    
                    {isLoading ? <ActivityIndicator/> : (
                        <View>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    )}

                </ScrollView>
            </View>
            
            {/*<ScrollView style={{backgroundColor: "#ffffff", paddingHorizontal: 16}}>
                <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Set Meal</Text>
                <FoodCard></FoodCard>
                <FoodCard></FoodCard>
            </ScrollView>*/}
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',

    },

    scrollView: {
        backgroundColor: '#fff',
        padding: 8,
    },

    textTitle: {
        marginTop: 8,
        paddingVertical: 8,
        color: "#E76766",
        textAlign: "center",
        fontSize: 30,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold"
    },

    text: {
        color: "#E76766",
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold",
        textAlignVertical: 'bottom'
    },

    infoText:{
        color: "#b8b8b880",
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
        textAlignVertical: 'bottom'
    },

    buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 16,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold",
        textAlignVertical: 'bottom'
    },

    backgroundText: {
        color: "#000000",
        fontSize: 20,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold",
        textAlignVertical: 'bottom'
    },

    innerText: {
        color: "#E76766",
        textAlign: "right",
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold"
    },

    button: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 0,
        backgroundColor: "#E76766",
        // fontFamily: "Roboto-Regular",
        borderRadius: 5,
    },

    buttonSec: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 0,
        backgroundColor: "#FFFFFF",
        // fontFamily: "Roboto-Regular",
        borderRadius: 5,
    },

    buttonOutline: {
        paddingHorizontal: 4,
        borderWidth: 2,
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        // fontFamily: "Roboto-Regular",
        borderRadius: 15,
    },

    buttonTouchable: {
        padding: 10, 
        backgroundColor: "#F9E6E6",
        width: 120, 
        height: 40, 
        borderRadius: 30, 
        alignItems: "center", 
        justifyContent: "center", 
        marginRight: 10,
        marginVertical: 5,
    },

    card: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#F9E6E6",
        borderRadius: 5,
    },

    cardSec: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#0000001A",
        backgroundColor: "#FFFFFF",
        borderRadius: 5
    },

    imageIcon: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },

    divider: {
        backgroundColor:'#b8b8b880',
        margin:8,
    },

    iconPrimTint: {
        tintColor: "#E76766",
    },


    cardAlign:{
        flexDirection:'row',
    },
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
};