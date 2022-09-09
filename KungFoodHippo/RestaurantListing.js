import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
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
import { RestaurantCard } from './Components/RestaurantListing/RestaurantCard.js';
import { ScrollView } from 'react-native-gesture-handler';

export function ListingScreen({ navigation }) {
    const [buttonText, setButtonText] = useState('Click');
    function handleClick() {
        setButtonText('New text');
    }

    return (
        <PaperProvider theme={theme}>

            <SafeAreaView style={styles.container}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height:60}}>
                    <Button icon={"filter-variant"} textColor={"#000000"} style={restaurantStyle.button}>
                        <Text style={restaurantStyle.text}>
                            Filter
                        </Text>
                    </Button>

                    <Button icon={"sort"} textColor={"#000000"} style={restaurantStyle.button}>
                        <Text style={restaurantStyle.text}>
                            Sort By
                        </Text>
                    </Button>

                    <Button icon={"food"} textColor={"#000000"} style={restaurantStyle.button}>
                        <Text style={restaurantStyle.text}>
                            Cuisines
                        </Text>
                    </Button>

                    <Button icon={"food-takeout-box"} textColor={"#000000"} style={restaurantStyle.button}>
                        <Text style={restaurantStyle.text}>
                            Self Pick-Up
                        </Text>
                    </Button>
                </ScrollView>


                <Text style={restaurantStyle.textBold}>
                    Nearby Restaurants
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                </ScrollView>


            </SafeAreaView>
        </PaperProvider>
    );
}

const theme = {
    DefaultTheme,
    colors: {
        primary: styles.primColor,
        secondary: styles.secColor,
    },
};



export const restaurantStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        justifyContent: 'center',
    },

    textBold: {
        color: "#000000",
        textAlign: "left",
        fontSize: 24,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold"
    },

    textThin: {
        color: "#000000",
        textAlign: "left",
        fontSize: 14,
        fontWeight: "200"
    },

    text: {
        color: "#000000",
        textAlign: "left",
        fontSize: 14,
        fontWeight: "normal"
    },

    button: {
        margin: 4,
        borderWidth: 2,
        color: "#000000",
        borderColor: "#000000",
        borderRadius: 15,
        tintColor: "#000000"
    },

    card: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#E76766",
        borderRadius: 5,
    },

    Image: {
        elevation: 3,
        borderWidth: 0,
        borderRadius: 15,
        width: 120,
        height: 120,
    },


    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});