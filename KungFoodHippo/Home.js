import * as React from 'react';
import AnimatedSplash from "react-native-animated-splash-screen";
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
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow, Portal, Provider } from 'react-native-paper';
import SearchButton from './Components/Home/SearchButton'
import Homepage from './Components/Home/HomePage'
import { HippoCard } from './Components/TestCard.js';
import { CategoriesCard } from './Components/Home/Categories.js';
import { FoodDeliveryCard } from './Components/Home/FoodDeliveryCard.js';
import { HalalCard } from './Components/Home/HalalCard.js';
import { VeganCard } from './Components/Home/VeganCard.js';
import { PickUpCard } from './Components/Home/PickUpCard.js';
import { RamenCard } from './Components/Home/RamenCard.js';
import { PastamaniaCard } from './Components/Home/PastamaniaCard.js';
import { JapaneseCard } from './Components/Home/JapaneseCard.js';
import { KoreanCard } from './Components/Home/KoreanCard';
import { MexicanCard } from './Components/Home/MexicanCard';
import { ItalianCard } from './Components/Home/ItalianCard';
import { ChineseCard } from './Components/Home/ChineseCard';
import FloatingButton from './Components/Home/FloatingButton'
import { WesternCard } from './Components/Home/WesternCard';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { colors } from 'react-native-elements';
import { userContext } from './App.js';
import { useContext } from 'react';


export function HomeScreen({ navigation, route }) {
    const [value, setValue] = useState();
    function updateSearch(value) {
        console.log(value);
    }
    const [loading, settoLoading] = useState(false);

    setTimeout(() => {
        settoLoading(true);
    }, 2000);

    const isFocused = useIsFocused();

    const { userEmail, userName, userToken } = useContext(userContext);


    return (
        <AnimatedSplash
            translucent={false}
            isLoaded={loading}
            logoImage={require("./assets/rungif.gif")}
            backgroundColor={"#f2a6a6"}
            logoHeight={300}
            logoWidth={300}
        >
            <View style={style1.container}>
                <Portal>
                    <FloatingButton setVisibility={isFocused} navigation={navigation} />
                </Portal>

                <ScrollView style={style1.container2} vertical={true}>
                    
                    <View style={style1.heading}>
                        <Text style={{ fontSize: 24, fontStyle:'italic', fontWeight: "bold"}}>Hello {userName} !</Text>
                        <Text style={{ fontSize:18, fontStyle:'italic'}}>What would you like to eat today?</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Listing', {
                            queryString: 'Search for restaurants'
                        })}>
                        <View style={style1.searchBoxWrapper} >
                            <TextInput placeholder={'Search for restaurants'} />
                            <Image 
                                source={require('./assets/images/search.png')}
                                style={{ height: 20, width: 20, tintColor: '#e76766', alignSelf: 'center' }}
                            />
                        </View>
                    </TouchableOpacity>
                    

                    {/* HOT DEALS / FAV / OFFERS / ORDER LATER*/}

                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', margin: 16}}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Listing', {
                                queryString: 'Hot Deals'
                            })}>
                            <View style={style1.categoryItem}>
                                <View style={style1.categoryCard}>
                                    <Image source={require('./assets/images/HotDeals.png')} style={style1.image} />
                                </View>
                                <Text style={style1.label1}>Hot Deals</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Listing', {
                                queryString: 'Favourite'
                            })}>
                            <View style={style1.categoryItem}>
                                <View style={style1.categoryCard}>
                                    <Image source={require('./assets/images/FavouriteFood.png')} style={style1.image} />
                                </View>
                                <Text style={style1.label1}>Favourite</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Listing', {
                                queryString: 'Offers'
                            })}>
                            <View style={style1.categoryItem}>
                                <View style={style1.categoryCard}>
                                    <Image source={require('./assets/images/BadgetMeal.png')} style={style1.image} />
                                </View>
                                <Text style={style1.label1}>Offers</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Listing', {
                                queryString: 'Order Later'
                            })}>
                            <View style={style1.categoryItem}>
                                <View style={style1.categoryCard}>
                                    <Image source={require('./assets/images/NewFood.png')} style={style1.image} />
                                </View>
                                <Text style={style1.label1}>Order Later</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    {/* FOOD DELIVERY CARD*/}

                    <View style={{ marginHorizontal: 16 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Listing', {
                                queryString: 'Search for restaurants'
                            })}>
                            <FoodDeliveryCard></FoodDeliveryCard>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 8 }}>
                            <View style={[style1.FDCard]}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Listing', {
                                        queryString: 'Halal'
                                    })}>
                                    <HalalCard></HalalCard>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <View style={[style1.FDCard2]}>
                                    <TouchableOpacity

                                        onPress={() => navigation.navigate('Listing', {
                                            queryString: 'Vegan'
                                        })}>
                                        <VeganCard></VeganCard>
                                    </TouchableOpacity>

                                </View>
                                <View style={style1.FDCard2}>
                                    <TouchableOpacity

                                        onPress={() => navigation.navigate('Listing', {
                                            queryString: 'PickUp'
                                        })}>
                                        <PickUpCard></PickUpCard>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                    </View>

                    {/* CUISINES CARD*/}

                    <View style={{ marginTop: 16, marginHorizontal: 16 }}>
                        {/* <userContext.Consumer>
                    {name => <Text style={style1.cuisineText}>{name}</Text>}
                    </userContext.Consumer> */}
                        <Text style={style1.cuisineText}>Cuisines</Text>
                        <View style={[style1.cuisinesCard, { justifyContent: 'space-around' }]} horizontal={true}>

                            <TouchableOpacity

                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Japanese'
                                })}>
                                <JapaneseCard></JapaneseCard>
                            </TouchableOpacity>
                            <TouchableOpacity

                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Thai'
                                })}>
                                <KoreanCard></KoreanCard>
                            </TouchableOpacity>
                            <TouchableOpacity

                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Western'
                                })}>
                                <WesternCard></WesternCard>
                            </TouchableOpacity>



                        </View>
                        <View style={[style1.cuisinesCard, { justifyContent: 'space-around' }]} horizontal={true}>
                            <TouchableOpacity

                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Italian'
                                })}>
                                <ItalianCard></ItalianCard>
                            </TouchableOpacity>
                            <TouchableOpacity

                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Chinese'
                                })}>
                                <ChineseCard></ChineseCard>
                            </TouchableOpacity>
                            <TouchableOpacity

                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Mexican'
                                })}>
                                <MexicanCard></MexicanCard>
                            </TouchableOpacity>



                        </View>
                    </View>

                    {/* RECOMMENDED FOR YOU*/}

                    <View style={style1.ListingWrapper}>
                        <Text style={style1.subHeadingWrapper}>
                            Recommended For You
                        </Text>
                        <Image
                                source={require('./assets/rightArrowHead.png')}
                                style={{ height: 16, width: 16, alignSelf: 'center' }}
                            />
                    </View>
                    <ScrollView
                        contentContainerStyle={[style1.foodListingWrapper]} horizontal={true} >
                        <View style={{ marginBottom: 8,flex: 1, justifyContent: 'space-evenly', flexDirection: 'row' }} horizontal={true}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Takagiramen'
                                })}>
                                <RamenCard></RamenCard>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Listing', {
                                    queryString: 'Pastamania'
                                })}>
                                <PastamaniaCard></PastamaniaCard>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </ScrollView>



            </View>
        </AnimatedSplash>
        // <PaperProvider theme={theme}>
        //   <View style={style.searchBoxWrapper}>
        //         <TextInput placeholder={'Search for shops and restaurants'}/>
        //         <Image source={require('./assets/images/search.png')}/>
        ///     </View>

        //   </PaperProvider>

    );
}
const style1 = StyleSheet.create({
    cuisineText: {
        fontWeight: 'bold', 
        fontSize: 24, 
        //alignSelf: "flex-start"
    },
    cuisinesCard: {
        flexDirection: 'row',
        flex: 1,
    },
    FDCard: {
        backgroundColor: '#fff',
        flex: 1,
        //marginLeft: 10,
    },
    FDCard2: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between',
        //marginRight: 10,
    },
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        flex: 1,
    },
    container2: {
        backgroundColor: '#fff',
        display: 'flex',
        flex: 1,
        //paddingHorizontal: 16,

    },
    //Searchtext:{
    //   textAlign:'right',
    //    color:"#FFFFFF",
    //},
    searchBoxWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EC8C8C' + 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
        height: 48,
        marginHorizontal: 16,
        //width: '96%',
    },
    heading: {
        //flexDirection: 'column',
        //justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 10,
    },
    categoryCard: {

        //backgroundColor: 'black',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 15,
        //padding: 9,

    },
    categoryItem: {
        //flexDirection:'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
        //marginVertical: 10,
        width:103,
        alignItems: 'center',
        //backgroundColor:'grey',
        //padding: 10,
    },
    image: {
        flex: 1,
        width: 50,
        height: 50,
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
        color: 'black',
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
        marginTop: 16,
        marginHorizontal: 16,
        justifyContent: 'space-between'
    },
    foodListingWrapper: {
        flex: 1,
        flexDirection: 'row'

    },
    subHeadingWrapper: {
        //marginTop:5,
        fontSize: 20,
        fontWeight:"bold",
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
//const theme = {
   // DefaultTheme,
   // colors: {
  //      primary: styles.primColor,
  ////      secondary: styles.secColor,
  //  },
//};
