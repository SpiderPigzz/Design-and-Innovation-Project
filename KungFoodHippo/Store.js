import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow } from 'react-native-paper';
import { styles } from './Styles.js'
import { FoodCard } from './Components/FoodCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


export function StoreScreen({navigation}){

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View>
                <Image source={require('./assets/Pastamania.png')} style={{ height: 160, width: null }} />
                <TouchableOpacity style={[styles.buttonTouchable, { position: "absolute", left: 10, top: 5, backgroundColor: "#ffffff", width: 40, borderRadius: 50, alignContent: "center" }]}>
                    <Button icon={"arrow-left"} />
                </TouchableOpacity>
            </View>

            <View style={[styles.container, { paddingHorizontal: 16 }]}>
                <View style={[styles.container, { flexDirection: "row", justifyContent: "space-between" }]}>
                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Pastamania</Text>
                    <Text style={[styles.innerText, { textAlignVertical: "bottom" }]}>More info</Text>
                </View>

                <View style={[styles.container, { flexDirection: "row", justifyContent: "flex-start" }]}>
                    <Button icon={"map-marker-outline"}></Button>
                    <Text style={{ textAlignVertical: "center" }}>Lot One    |    1.8km away</Text>
                </View>

                <View style={[styles.container, { flexDirection: "row", justifyContent: 'space-around' }]}>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                    <Text style={{ textAlignVertical: "center" }}> 300+ ratings</Text>
                </View>

                <View style={[styles.container, { flexDirection: "row", justifyContent: "space-between" }]}>
                    <Text style={{ fontWeight: "bold" }}>Delivery: 30 min</Text>
                    <Text style={[styles.innerText, { textAlignVertical: "bottom" }]}>Change</Text>
                </View>

                {/* navigation tab here */}
                <ScrollView horizontal={true}>
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text>Set Meal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text>Popular</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text>Appetisers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text>Pasta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text>Pizza</Text>
                    </TouchableOpacity>
                </ScrollView>


                <ScrollView>
                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Set Meal</Text>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                </ScrollView>

            </View>
        </PaperProvider>
    );
}
const style1 = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flex: 1,
        marginHorizontal: 5,
    },
    //Searchtext:{
    //   textAlign:'right',
    //    color:"#FFFFFF",
    //},
    searchBoxWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EC8C8C' + 20,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    categoryCard: {
        flex: 1,
        //backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 5,

    },
    categoryItem: {
        marginleft: 4,
        marginTop: 5,
        marginVertical: 40,
        alignItems: 'center',
        //backgroundColor:'#EB9FBE',
        padding: 9,
    },
    image: {
        flex: 1,
        width: 42,
        height: 42,
        resizeMode: 'contain',
    },
    image2: {
        flex: 1,
        width: 100,
        height: 70,
       // backgroundColor: '#000000',
        resizeMode: 'contain',
    },
    imageD: {
        flex: 1,
        width: 20,
        height: 100,
        padding: 10,
        //backgroundColor: '#000000',
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    imageDEdit: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: '#000000',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    imageR:{
        flex: 1,
        width: 150,
        height: 100,
    },
    imageRV:{
        flex: 0.7,
        width: 150,
        height: 60,
    },
    image3: {
        flex: 1,
        width: 60,
        height: 5,
        padding: 10,
        //backgroundColor:'#000000',
        resizeMode: 'contain',
        alignSelf: 'flex-end'
    },
    image3Edit: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor:'#000000',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        marginBottom: 40,
    },
    label1: {
        color: '#000000',
        fontSize: 12,
        marginTop: 5,
    },
    label2: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 5,
    },
    foodItemText:{
        fontWeight:'bold',
    },
    categories: {
        display: 'flex',
        flex: 1,
    },
    ListingWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
    },
    foodListingWrapper: {
        display: 'flex',
        flex: 1,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        margin: 5,
        marginBottom: 128

    },
    subHeadingWrapper: {
        fontSize: 20,
        marginRight: 10,
        marginLeft: 10,
        // fontWeight:"bold",
    },
    arrowWrapper: {
        marginBottom: 1,

        alignSelf: 'flex-end',
    },
    foodItemWrapper: {
        backgroundColor: '#E76766' + 20,
        padding: 5,
        flex: 1,
        marginHorizontal: 2,
    },
    catContainer: {
        marginTop: 10,
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',

        // backgroundColor:'#000000',
        //marginHorizontal:10,
    },
    box: {
        marginTop: 5,
        width: '100%',
        height: '30%',
        padding: 5,
    },
    box2: {
        // marginTop:5,
        width: '50%',
        height: '100%',
        padding: 5,
        flex: 1,
    },
    inner1: {
        borderRadius: 5,
        backgroundColor: '#E76766', // original col
        display: 'flex',
        flex: 1,
        padding: 5,
        marginHorizontal: 5,
        marginTop: 5
    },
    inner1container: {
        marginRight: 5,
        marginTop: 5,
    },
    inner2: {
        borderRadius: 5,
        flex: 1,
        backgroundColor: '#FCD077', //yellow
    },
    inner2Text: {
        width: '100%',
        textAlign: 'left',
        // backgroundColor: '#85C0FC', // light blue
        marginLeft: 5,
        alignSelf: 'flex-start',
    },
    inner2TextBottom: {
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    inner2TextBottom1: {
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    inner2TextBold: {
        marginLeft: 5,
        alignSelf: 'flex-start',
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'left',
        //backgroundColor:'#EB9FBE',
    },
    inner3: {
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        flex: 0.7,
        backgroundColor: '#EB9FBE', //light pink
    },
    inner4: {
        marginTop: 10,
        borderRadius: 5,
        flex: 1,
        backgroundColor: '#85C0FC', // light blue
    },
});
const theme = {
   DefaultTheme,
   colors: {
       primary: styles.primColor,
  //      secondary: styles.secColor,
   },
};
