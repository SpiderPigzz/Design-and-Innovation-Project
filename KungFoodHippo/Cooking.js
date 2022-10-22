import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { SIZES, COLORS, FONTS } from './constants/theme1';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow } from 'react-native-paper';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { colors } from 'react-native-elements';

export function CookingScreen({ navigation }) {
    const [loadingText, setLoadingText] = useState("Please wait...");

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );


    const loadingFunction = async() => {
        await delay(3000);
        setLoadingText("Chef Hippo is receiving your order...");
        await delay(3000);
        setLoadingText("Now preparing ingredients...");
        await delay(3000);
        setLoadingText("Adding some love <3 to the food...");
        await delay(3000);
        setLoadingText("Finishing up...");
        await delay(3000);
        setLoadingText("Voíla, your food is done, now delivering!");
        await delay(3000);
        navigation.navigate("Map")
    }

    useEffect(() => {
        loadingFunction();

    }, []);


    return (
        <SafeAreaView style={[style1.container]}>
            <View style={{flex: 1, justifyContent:'space-evenly', alignItems:'center', flexDirection: "column"}}>
                <ImageBackground source={require("./assets/fdbg.jpg")}  style={style1.bg}>
                <Image source={require("./assets/videos/loading-cooking.gif")} style={style1.cooking}></Image>
                <Text style={{fontWeight: 'bold',textAlign: 'center', color: 'black', fontSize: 24, flex: 1, flexWrap: 'wrap',}}>{loadingText}</Text>
                </ImageBackground>
                
            </View>




        </SafeAreaView>
    );
}
const style1 = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginHorizontal: 5,
        flexDirection: "row"
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
    imageR: {
        flex: 1,
        width: 150,
        height: 100,
    },
    imageRV: {
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
    foodItemText: {
        fontWeight: 'bold',
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
    bg: {
        flex: 1,
      justifyContent: "center",
      height: 800,
    },
    cooking: {
        resizeMode:"contain",
        height:350,
        opacity: 0.8,
        justifyContent: "center",
        marginVertical: 80
    }
});
//const theme = {
   // DefaultTheme,
   // colors: {
  //      primary: styles.primColor,
  ////      secondary: styles.secColor,
  //  },
//};
