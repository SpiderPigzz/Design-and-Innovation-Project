import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, Modal, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow, Portal } from 'react-native-paper';
import { FoodCard } from './Components/Store/FoodCard.js';
import { ReviewCard } from './Components/Store/ReviewCard.js';
import FloatingButton from './Components/Home/FloatingButton';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

const url = 'http://dip.totallynormal.website/';

export function StoreScreen({ navigation, route }) {

    const listTab = [
        {
            status: "All"
        },
        {
            status: "Popular"
        },
        {
            status: "Mains"
        },
        {
            status: "Sides"
        },
    ]

    const { shopID } = route.params;

    const [isLoading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [address, setAddress] = useState();
    const [description, setDescription] = useState();
    const [reviewData, setReviewData] = useState([]);
    const [defaultPhoto, setState] = useState(require('./assets/Pastamania.png'));
    const [status, setStatus] = useState('All');
    const [dataList, setDataList] = useState(data);
    const setStatusFilter = status => {
        console.log(status);
        if (status !== 'All') {

            setDataList(data.filter(e => e.category === status))
            console.log(dataList);
        } else {
            setDataList(data)
        }
        setStatus(status)
    };

    const menuPath = "getShopMenu/" + shopID;
    const shopPath = "getShop/" + shopID;
    const photoPath = "picture/" + shopID;
    const reviewPath = "getShopRating/" + shopID;

    useEffect(() => {
        setStatusFilter('All');
    }, [data]);

    useEffect(() => {
        setLoading(true);
        fetch(url + menuPath)
            .then((response) => response.json())
            .then((json) => {
                for (var i = 0; i < json.length; i++) {
                    json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + shopID + '/' + json[i]['name'];
                    //console.log(json[i]['imageURI']);
                }
                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => {

                setLoading(false)
            });

        fetch(url + shopPath)
            .then((response) => response.json())
            .then((json) => {
                setRestaurant(json[0].name);
                setAddress(json[0].address);
                setDescription(json[0].description);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        fetch(url + photoPath)
            .then((res1) => {
                if (res1.status != 404) {
                    setState({ uri: url + photoPath })
                }
            })
            .catch((err) => {
                console.log("unable to fetch site data");
            });

        fetch(url + reviewPath)
            .then((response) => response.json())
            .then((json) => {
                setReviewData(json);
            })
            .catch((error) => alert(error))
            .finally(() => setLoading(false));


    }, [shopID]);




    const renderItem = ({ item }) => (
        <FoodCard title={item.name} description={item.description} price={item.price} imageURI={item.imageURI} shopID={shopID}></FoodCard>
    );

    const isFocused = useIsFocused();
    /*function onSelectCategory(category) {
        // filter dish
        let foodList = data.filter(a => a.category.includes(category.id))
        setData(foodList)
        setSelectedCategory(category)
    }*/
    const renderReview = ({ item }) => (
        <ReviewCard overall={item.overall} food={item.food} packaging={item.packaging} value={item.value} count={item.count} navigation={navigation} shopID={shopID}></ReviewCard>
    );


    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <Portal>
                <FloatingButton setVisibility={isFocused} navigation={navigation} />
            </Portal>
            <View style={{ flex: 1 }}>
                <Image source={defaultPhoto} style={{ height: 160, width: null }} />
                <TouchableOpacity
                    style={[styles.buttonNavigation, { position: "absolute", left: 16, top: 8 }]}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('Listing')}
                >
                    <Image
                        source={require('./assets/ArrowLeft.png')}
                        style={[styles.iconPrimTint, { height: 18, width: 18, }]}
                    />
                </TouchableOpacity>
            </View>

            <View style={[styles.container, { paddingTop: 8, flex: 4 }]}>
                <View style={{ flexDirection: "row", marginHorizontal: 16, marginBottom: 2 }}>
                    <Text style={[styles.title, { textAlign: "left" }]}>{restaurant}</Text>
                </View>

                <ScrollView>
                    <View style={{ marginHorizontal: 16 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingVertical: 4, paddingRight: 4, flex: 4.5 }}>
                                <Image
                                    source={require('./assets/locationpin.png')}
                                    style={[styles.iconPrimTint, { height: 18, width: 12, alignSelf: "center" }]}
                                />
                                <Text numberOfLines={1} style={{ textAlignVertical: "center" }}>   {address}</Text>
                            </View>
                            <Button onPress={() => { navigation.navigate("Location", { shopAddress: address, shopID: shopID, shopName: restaurant, shopDescription: description }) }}>
                                <Text style={[styles.innerText, { textAlignVertical: "center", flex: 1 }]}>More info</Text>
                            </Button>
                        </View>


                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingVertical: 4 }}>
                                <Image
                                    source={require('./assets/Time.png')}
                                    style={[styles.iconPrimTint, { height: 16, width: 16, alignSelf: "center" }]}
                                />
                                <Text style={{ fontWeight: "bold", textAlignVertical: "center" }}>  Delivery: 30 min</Text>
                            </View>

                            <View>
                                <Button onPress={() => setVisible(true)}>
                                    <Text style={[styles.innerText, { textAlignVertical: "center" }]}>Change</Text>
                                </Button>
                            </View>

                        </View>

                        <Modal
                            transparent={true}
                            visible={visible}
                            animationType="slide"
                        >
                            <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "flex-end" }}>
                                <View style={{ backgroundColor: "#ffffff", marginHorizontal: 20, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                    <TouchableOpacity
                                        style={[styles.buttonNavigation, { position: "absolute", top: 10, left: 10, elevation: 0 }]}
                                        onPress={() => setVisible(false)}
                                    >
                                        <Image
                                            source={require('./assets/Cross.png')}
                                            style={{ height: 16, width: 16 }}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ marginTop: 26, flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity style={[styles.buttonTouchable, { width: 120 }]}>
                                            <Text>Delivery</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.buttonTouchable, { width: 120 }]}>
                                            <Text>Self Pick-up</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* insert drop down box here */}
                                </View>
                            </View>
                        </Modal>
                    </View>

                    {isLoading ? <ActivityIndicator /> : (
                        <View>
                            <FlatList
                                data={reviewData}
                                renderItem={renderReview}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    )}

                    {/* navigation tab here */}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, marginVertical: 4 }}>
                        {
                            listTab.map(e => (
                                <TouchableOpacity
                                    style={[ status == e.status ? styles.buttonTouchableActive : styles.buttonTouchable ]}
                                    onPress={() => setStatusFilter(e.status)}
                                >
                                    <Text style={[ status == e.status ? styles.buttonText : styles.tabText ]}>
                                        {e.status}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                    {isLoading ? <ActivityIndicator /> : (
                        <View>
                            <FlatList
                                data={dataList}
                                renderItem={renderItem}
                                keyExtractor={(e, item) => item.id}
                            />
                        </View>
                    )}

                </ScrollView>
            </View>

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

    title: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlignVertical: 'bottom',
        // fontFamily: "Roboto-Regular",
    },

    text: {
        color: "#E76766",
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold",
        textAlignVertical: 'bottom'
    },

    infoText: {
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
        fontSize: 12,
        // fontFamily: "Roboto-Regular",
        fontWeight: "normal",

    },

    tabText: {
        color: "#000000",
        textAlign: "center",
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
        textAlignVertical: "bottom"
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
        width: 100,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        margin: 4,
    },

    buttonTouchableActive: {
        padding: 10,
        backgroundColor: "#E76766",
        width: 100,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        elevation: 3,
    },

    buttonNavigation: {
        padding: 10,
        backgroundColor: "#FFFFFF",
        width: 42,
        height: 42,
        borderRadius: 50,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginVertical: 5,
        elevation: 5,
    },

    touchableHighlight: {
        padding: 10,
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
        backgroundColor: '#b8b8b880',
        margin: 8,
    },

    iconPrimTint: {
        tintColor: "#E76766",
    },


    cardAlign: {
        flexDirection: 'row',
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