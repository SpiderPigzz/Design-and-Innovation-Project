import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { SIZES, COLORS, FONTS } from './constants/theme1';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow } from 'react-native-paper';
import SearchButton from './Components/Home/SearchButton'
import Homepage from './Components/Home/HomePage'
import { HippoCard } from './Components/TestCard.js';
import { CategoriesCard } from './Components/Home/Categories.js';
import { FoodDeliveryCard } from './Components/Home/FoodDeliveryCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { colors } from 'react-native-elements';
import { HalalCard } from './Components/Home/HalalCard';

export function HomeScreen({ navigation }) {
    const [value, setValue] = useState()
    function updateSearch(value) {
        console.log(value);
    }

    return (
        <SafeAreaView style={style1.container}>

            <ScrollView style={style1.container} vertical={true}>
                <View style={style1.searchBoxWrapper} >
                    <TextInput placeholder={'Search for shops and restaurants'} />
                    <Image source={require('./assets/images/search.png')} />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={style1.categoryItem}>
                        <View style={style1.categoryCard}>
                            <Image source={require('./assets/images/HotDeals.png')} style={style1.image} />
                        </View>
                        <Text style={style1.label1}>Hot Deals</Text>
                    </View>

                    <View style={style1.categoryItem}>
                        <View style={style1.categoryCard}>
                            <Image source={require('./assets/images/FavouriteFood.png')} style={style1.image} />
                        </View>
                        <Text style={style1.label1}>Favourite Food</Text>
                    </View>

                    <View style={style1.categoryItem}>
                        <View style={style1.categoryCard}>
                            <Image source={require('./assets/images/BadgetMeal.png')} style={style1.image} />
                        </View>
                        <Text style={style1.label1}>Budget Meal</Text>
                    </View>

                    <View style={style1.categoryItem}>
                        <View style={style1.categoryCard}>
                            <Image source={require('./assets/images/NewFood.png')} style={style1.image} />
                        </View>
                        <Text style={style1.label1}>Order Later</Text>
                    </View>


                </ScrollView>
                <FoodDeliveryCard></FoodDeliveryCard>
                <View style={style1.catContainer} horizontal={true}>
                    <View style={style1.box2}>

                        <HalalCard></HalalCard>
                    </View>
                    <View style={style1.box2}>

                        <HalalCard></HalalCard>
                    </View>
                </View>
                <View horizontal={true}>

                    <View style={style1.box}>


                        <View style={style1.inner1}>
                            <Image source={require('./assets/images/food_delivery.png')} style={style1.image2} />

                            <View style={style1.inner1}></View>
                            <Text style={style1.label2}>Food Delivery</Text>
                            <Text style={style1.label2}>Order food you love</Text>
                        </View>

                    </View>
                    <View style={style1.catContainer} horizontal={true}>

                        <View style={style1.box2}>
                            <View style={style1.inner2}>
                                <View style={style1.imageDEdit}>
                                    <Image source={require('./assets/images/halalfood.png')} style={style1.imageD} />
                                </View>

                                <View style={style1.inner2TextBottom}>
                                    <Text style={style1.inner2TextBold}>HalalFood</Text>
                                    <Text style={style1.inner2Text}>Everyday up to </Text>
                                    <Text style={style1.inner2Text}>20% off</Text>
                                </View>
                            </View>
                        </View>
                        <View style={style1.box2}>
                            <View style={style1.inner3}>
                                <View style={style1.inner2TextBottom}>
                                    <Text style={style1.inner2TextBold}>PickUp</Text>
                                    <Text style={style1.inner2Text}>Everyday up to </Text>
                                    <Text style={style1.inner2Text}>25% off</Text>
                                </View>
                                <View style={style1.image3Edit}>
                                    <Image source={require('./assets/images/pickup.png')} style={style1.image3} />
                                </View>
                            </View>

                            <View style={style1.inner4}>
                                <Image source={require('./assets/images/veganfoodv1.png')} style={style1.image3} />
                                <View style={style1.inner2TextBottom1}>
                                    <Text style={style1.inner2TextBold}>Vegan </Text>
                                    <Text style={style1.inner2Text}>Salads and others </Text>
                                    <Text style={style1.inner2Text}>15% off </Text>
                                </View>

                            </View>
                        </View>

                    </View>
                </View>

                <View style={style1.ListingWrapper}>
                    <Text style={style1.subHeadingWrapper}>
                        Recommended For You
                    </Text>
                    <Image source={require('./assets/images/Rightarrow.png')} style={style1.arrowWrapper} />
                </View>


                <ScrollView
                    contentContainerStyle={style1.foodListingWrapper} horizontal={true}>
                    <View style={style1.foodItemWrapper}>
                        <Image source={require('./assets/images/takagiramen.png')} style={style1.imageR} />
                        <Text style={style1.foodItemText}>Takagi Ramen</Text>
                        <Text>Lunch/Dinner*Japanese</Text>
                        <Text>$3.70 delivery fee</Text>
                    </View>
                    <View style={style1.foodItemWrapper}>
                        <Image source={require('./assets/images/pastamania.png')} style={style1.imageRV} />
                        <Text style={style1.foodItemText}>Pastamania</Text>
                        <Text>Pasta*Italian</Text>
                        <Text>$3.00 delivery fee</Text>
                    </View>
                </ScrollView>

            </ScrollView>

        </SafeAreaView>
        // <PaperProvider theme={theme}>
        //   <View style={style.searchBoxWrapper}>
        //         <TextInput placeholder={'Search for shops and restaurants'}/>
        //         <Image source={require('./assets/images/search.png')}/>
        ///     </View>

        //   </PaperProvider>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        //backgroundColor: '#85C0FC',
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
//const theme = {
   // DefaultTheme,
   // colors: {
  //      primary: styles.primColor,
  ////      secondary: styles.secColor,
  //  },
//};
