import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, FlatList, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, Searchbar, TextInput } from 'react-native-paper';
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
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import { debug } from 'react-native-reanimated';


const url = 'http://dip.totallynormal.website/';
const path = "listShop";


export function ListingScreen({ route, navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [searchDisplay, setSearchDisplay] = React.useState('All');
    const [sortByPrice, setSortByPrice] = useState(false);
    const { itemId, otherParam } = route.params;

    const getData = () => {
        fetch(url + path)
            .then((response) => response.json())
            .then((json) => {
                for (var i = 0; i < json.length; i++) {
                    json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['ID'];
                    //console.log(json[i]['imageURI']);
                }
                console.log(json);

                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {

        navigation.addListener('focus', () => {
            setSearchQuery(otherParam);
        });

        getData();

    }, []);




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


    return (
        <PaperProvider theme={theme}>

            <SafeAreaView style={[restaurantStyle.container, { flexDirection: 'column' }]}>
                <View style={[restaurantStyle.searchBoxWrapper, { flex: 1, minHeight: 60 }]}>

                    <TextInput placeholder={otherParam}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{ flex: 50 }}
                    />

                    <Button icon={require('./assets/images/search.png')} mode="text" onPress={() => {
                        if (searchQuery == '') {
                            getData();
                            setSearchDisplay('All');
                        }

                        else {
                            searchShops(searchQuery);
                            setSearchDisplay(searchQuery);
                        }

                    }} style={{ flex: 1 }} />
                </View>
                <View style={{ flex: 1, minHeight: 40 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={restaurantStyle.filterBar}>
                        <Button icon={"filter-variant"} textColor={"#000000"} style={restaurantStyle.button}>
                            <Text style={restaurantStyle.text}>
                                Filter
                            </Text>
                        </Button>

                        <Button icon={"sort"} textColor={"#000000"} style={restaurantStyle.button} onPress={() => {
                            setSortByPrice(!sortByPrice);

                            sortShopsByName();
                        }}>
                            <Text style={restaurantStyle.text}>
                                Sort By
                            </Text>
                        </Button>

                        <Button icon={"food"} textColor={"#000000"} style={restaurantStyle.button}>
                            <Text style={restaurantStyle.text}>
                                Cuisines
                            </Text>
                        </Button>
                    </ScrollView>
                </View>


                <Text style={[restaurantStyle.textBold, { flex: 1, minHeight: 20, margin: 4 }]}>
                    Searching for '{searchDisplay}'
                </Text>

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
        backgroundColor: '#fff',
        padding: 0,
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

    searchBoxWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EC8C8C' + 20,
        padding: 10,
        borderRadius: 5,
        minHeight: 40,
        width: '100%',
    },

    filterBar: {

    },

    restaurantList: {
        paddingHorizontal: 12
    },


    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});