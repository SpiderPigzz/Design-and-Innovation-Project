import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, FlatList, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, Searchbar, TextInput, Portal } from 'react-native-paper';
import { HippoCard } from './Components/TestCard.js';
import FloatingButton from './Components/Home/FloatingButton'
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { RestaurantCard } from './Components/RestaurantListing/RestaurantCard.js';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import { debug } from 'react-native-reanimated';
import { userContext } from './App.js';
import { useContext } from 'react';


const url = 'http://dip.totallynormal.website/';
const path = "listShop";
const orderAddress = "getOrderAddress/"
const nearest = "getNearest/";
const cuisinePath = "listShopByTag/";

export function ListingScreen({ route, navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [searchDisplay, setSearchDisplay] = React.useState('All');
    const [sortByPrice, setSortByPrice] = useState(false);
    const { queryString } = route.params;
    const [shopNames, setShopNames] = useState([]);
    const { userEmail, userName, userToken } = useContext(userContext);

    const [stateNearby, setStateNearby] = useState(false);

    const [selectState, setSelectState] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false]);

    const cartPath = "getCart/";

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetch(url + cartPath + userEmail)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.length == 0) {
                        setStateNearby(false);
                        if (queryString == 'Halal') {
                            setSelectState(selectArray('Halal'));
                        }

                        else if (queryString == 'Vegan') {
                            setSelectState(selectArray('Vegan'));
                        }

                        else if (queryString == 'Japanese') {
                            setSelectState(selectArray('Japanese'));
                        }

                        else if (queryString == 'Thai') {
                            setSelectState(selectArray('Thai'));
                        }

                        else if (queryString == 'Western') {
                            setSelectState(selectArray('Western'));
                        }

                        else if (queryString == 'Italian') {
                            setSelectState(selectArray('Italian'));
                        }

                        else if (queryString == 'Chinese') {
                            setSelectState(selectArray('Chinese'));
                        }

                        else if (queryString == 'Mexican') {
                            setSelectState(selectArray('Mexican'));
                        }

                        else if (queryString == 'Search for restaurants' || queryString == 'PickUp') {
                            setSearchQuery("");
                            setSelectState(selectArray('All'));
                        }

                        else {
                            setSearchQuery(queryString);
                            setSelectState(selectArray('All'));
                            searchButton();
                        }
                    }
                    else {
                        setStateNearby(true);
                        getNearby();
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));


        }

    }, [isFocused]);

    const getNearby = async () => {
        var address = "";
        await fetch(url + orderAddress + userEmail)
            .then((response) => response.json())
            .then((json) => {
                address = json[0]['shop.address'][0].replace('#', '');

            });

        console.log(address);
        console.log(url + nearest + address + '?range=3000');


        await fetch(url + nearest + address + '?range=3000')
            .then((response) => response.json())
            .then((json) => {
                for (var i = 0; i < json.length; i++) {
                    json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['ID'];
                    //console.log(json[i]['imageURI']);
                }
                //console.log(json);

                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };


    const getNearest = async (address) => {
        // await fetch(url + orderPath + userEmail)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         console.log(json);
        //         setShopNames(json[0]['shop.name'])

        //         console.log(json[0]['shop.name'])

        //     });


        await fetch(url + nearest + address)
            .then((response) => response.json())
            .then((json) => {
                for (var i = 0; i < json.length; i++) {
                    json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['ID'];
                    //console.log(json[i]['imageURI']);
                }
                //console.log(json);

                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const getData = () => {
        fetch(url + path)
            .then((response) => response.json())
            .then((json) => {
                for (var i = 0; i < json.length; i++) {
                    json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['ID'];
                    //console.log(json[i]['imageURI']);
                }
                //console.log(json);

                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const getCuisine = (cuisineType) => {
        fetch(url + cuisinePath + cuisineType)
            .then((response) => response.json())
            .then((json) => {
                for (var i = 0; i < json.length; i++) {
                    json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['ID'];
                    //console.log(json[i]['imageURI']);
                }
                //console.log(json);

                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const selectArray = (buttonName) => {
        console.log(buttonName);
        if (buttonName == 'All') {
            getData();
            return [true, false, false, false, false, false, false, false, false, false, false, false, false];
        }

        else if (buttonName == 'Nearby') {
            getNearest('50 nanyang avenue');
            setSearchDisplay('Nearby');
            return [false, true, false, false, false, false, false, false, false, false, false, false, false];
        }

        else if (buttonName == 'Halal') {
            getCuisine('cuisine_halal');
            setSearchDisplay('Halal');
            return [false, false, true, false, false, false, false, false, false, false, false, false, false];
        }

        else if (buttonName == 'Drinks') {
            getCuisine('cuisine_drinks');
            setSearchDisplay('Drinks');
            return [false, false, false, true, false, false, false, false, false, false, false, false, false];
        }

        else if (buttonName == 'Vegan') {
            getCuisine('cuisine_vegan');
            setSearchDisplay('Vegan');
            return [false, false, false, false, true, false, false, false, false, false, false, false, false];
        }

        else if (buttonName == 'Chinese') {
            getCuisine('cuisine_chinese');
            setSearchDisplay('Chinese');
            return [false, false, false, false, false, true, false, false, false, false, false, false, false];
        }

        else if (buttonName == 'Indian') {
            getCuisine('cuisine_indian');
            setSearchDisplay('Indian');
            return [false, false, false, false, false, false, true, false, false, false, false, false, false];
        }

        else if (buttonName == 'Italian') {
            getCuisine('cuisine_italian');
            setSearchDisplay('Italian');
            return [false, false, false, false, false, false, false, true, false, false, false, false, false];
        }

        else if (buttonName == 'Japanese') {
            getCuisine('cuisine_japanese');
            setSearchDisplay('Japanese');
            return [false, false, false, false, false, false, false, false, true, false, false, false, false];
        }

        else if (buttonName == 'Malay') {
            getCuisine('cuisine_malay');
            setSearchDisplay('Malay');
            return [false, false, false, false, false, false, false, false, false, true, false, false, false];
        }

        else if (buttonName == 'Mexican') {
            getCuisine('cuisine_mexican');
            setSearchDisplay('Mexican');
            return [false, false, false, false, false, false, false, false, false, false, true, false, false];
        }

        else if (buttonName == 'Thai') {
            getCuisine('cuisine_thai');
            setSearchDisplay('Thai');
            return [false, false, false, false, false, false, false, false, false, false, false, true, false];
        }

        else if (buttonName == 'Western') {
            getCuisine('cuisine_western');
            setSearchDisplay('Western');
            return [false, false, false, false, false, false, false, false, false, false, false, false, true];
        }

        else if (buttonName == 'None') {
            setSearchDisplay('');
            return [false, false, false, false, false, false, false, false, false, false, false, false, false];
        }
    };


    const renderItem = ({ item }) => (
        <RestaurantCard title={item.name} description={item.description} deliveryDesc={item.address} imageURI={item.imageURI} shopID={item.ID} navigation={navigation}></RestaurantCard>
    );

    const sortShopsByName = async () => {
        try {
            var order;
            if (sortByPrice == false) {
                order = 'DESC';
            }

            else {
                order = 'ASC'
            }
            const response = await fetch('http://dip.totallynormal.website/listShop?sortOrder=' + order);
            var json = await response.json();

            for (var i = 0; i < json.length; i++) {
                json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['ID'];
                //console.log(json[i]['imageURI']);
            }
            setData(json);
            //console.log('http://dip.totallynormal.website/listShop?sortBy=price&sortOrder=' + order);

        } catch (error) {
            console.error(error);
        }
    };

    const searchShops = async (name) => {
        try {
            var order;
            if (sortByPrice == false) {
                order = 'DESC';
            }

            else {
                order = 'ASC'
            }

            const response = await fetch('http://dip.totallynormal.website/searchShopByName/' + name + '?sortOrder=' + order);
            var json = await response.json();

            for (var i = 0; i < json.length; i++) {
                json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['ID'];
                //console.log(json[i]['imageURI']);
            }
            setData(json);
            //console.log('http://dip.totallynormal.website/listShop?sortBy=price&sortOrder=' + order);

        } catch (error) {
            console.error(error);
        }
    };



    const searchButton = () => {
        if (searchQuery == '') {
            getData();
            setSearchDisplay('All');
        }

        else {
            searchShops(searchQuery);
            setSearchDisplay(searchQuery);
        }

    };


    return (
        <PaperProvider theme={theme}>
            <Portal>
                <FloatingButton setVisibility={isFocused} navigation={navigation} />
            </Portal>

            <SafeAreaView style={[restaurantStyle.container, { flexDirection: 'column' }]}>
                <View style={[restaurantStyle.searchBoxWrapper, { flex: 1, minHeight: 60, marginHorizontal: 16, marginVertical: 10 }]}>

                    <TextInput placeholder={queryString}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{ flex: 50 }}
                    />

                    <Button icon={require('./assets/images/search.png')} mode="text" onPress={searchButton} style={{ flex: 1 }} />
                </View>
                {stateNearby ? <></> :
                    <View style={{ flex: 1, minHeight: 40 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={restaurantStyle.filterBar}>
                            <Button icon={"all-inclusive"} textColor={"#000000"} buttonColor={selectState[0] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('All'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    All
                                </Text>
                            </Button>

                            <Button icon={"near-me"} textColor={"#000000"} buttonColor={selectState[1] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Nearby'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Nearby
                                </Text>
                            </Button>

                            <Button icon={"food-halal"} textColor={"#000000"} buttonColor={selectState[2] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Halal'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Halal
                                </Text>
                            </Button>

                            <Button icon={"cup"} textColor={"#000000"} buttonColor={selectState[3] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Drinks'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Drinks
                                </Text>
                            </Button>


                            <Button icon={"leaf"} textColor={"#000000"} buttonColor={selectState[4] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Vegan'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Vegan
                                </Text>
                            </Button>



                            <Button textColor={"#000000"} buttonColor={selectState[5] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Chinese'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Chinese
                                </Text>
                            </Button>

                            <Button textColor={"#000000"} buttonColor={selectState[6] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Indian'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Indian
                                </Text>
                            </Button>

                            <Button textColor={"#000000"} buttonColor={selectState[7] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Italian'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Italian
                                </Text>
                            </Button>

                            <Button textColor={"#000000"} buttonColor={selectState[8] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Japanese'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Japanese
                                </Text>
                            </Button>

                            <Button textColor={"#000000"} buttonColor={selectState[9] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Malay'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Malay
                                </Text>
                            </Button>

                            <Button textColor={"#000000"} buttonColor={selectState[10] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Mexican'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Mexican
                                </Text>
                            </Button>

                            <Button textColor={"#000000"} buttonColor={selectState[11] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Thai'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Thai
                                </Text>
                            </Button>

                            <Button textColor={"#000000"} buttonColor={selectState[12] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                                setSelectState(selectArray('Western'))
                            }}>
                                <Text style={restaurantStyle.text}>
                                    Western
                                </Text>
                            </Button>

                            {/* <Button icon={"sort"} textColor={"#000000"} style={restaurantStyle.button} onPress={() => {
                            setSortByPrice(!sortByPrice);

                            sortShopsByName();
                        }}>
                            <Text style={restaurantStyle.text}>
                                Sort By
                            </Text>
                        </Button>

                        <Button icon={"food"} textColor={"#000000"} buttonColor={selectState[2] ? '#f2a6a6' : '#FFFFFF'} style={restaurantStyle.button} onPress={() => {
                            setSelectState(selectArray('Cuisines'))
                        }}>

                            <Text style={restaurantStyle.text}>
                                Cuisines
                            </Text>
                        </Button> */}
                        </ScrollView>
                    </View>
                }


                {stateNearby ? <Text style={[restaurantStyle.textBold, { flex: 1, minHeight: 40, marginHorizontal: 20, marginVertical: 4, fontSize: 20 }]}>
                    Listing available restaurants for{'\n'}Bundle Delivery
                </Text> : <Text style={[restaurantStyle.textBold, { flex: 1, minHeight: 20, marginHorizontal: 20, marginVertical: 4 }]}>
                    Searching for '{searchDisplay}'
                </Text>}

                {isLoading ? <ActivityIndicator style={{ flex: 35 }} /> : (
                    <View style={{ flex: 35 }}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={[restaurantStyle.restaurantList, { flex: 1 }]}
                        />
                    </View>)}



            </SafeAreaView>
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
};

export const restaurantStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    textBold: {
        color: "#000000",
        textAlign: "left",
        fontSize: 24,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold",
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
        borderWidth: 1.5,
        color: "#000000",
        borderColor: "#000000",
        borderRadius: 20,
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

    searchBoxWrapper: {
        flexDirection: 'row',
        backgroundColor: '#EC8C8C' + 20,
        padding: 10,
        borderRadius: 5,
        minHeight: 40,
    },

    filterBar: {
        paddingHorizontal: 16,
    },

    restaurantList: {
        //paddingHorizontal: 16,
    },


    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});