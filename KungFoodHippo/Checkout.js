import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Image, FlatList, ActivityIndicator, InteractionManager, Touchable } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, Divider, Switch } from 'react-native-paper';
import { BillCard } from './Components/Checkout/BillCard';
import { RecommendedOrderCard } from './Components/Checkout/RecommendedOrderCard';
import { HippoCard } from './Components/TestCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { userContext } from './App.js';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const url = 'http://dip.totallynormal.website/';



export function CheckoutScreen({ navigation }) {
    const [cutlery, setCutlery] = useState(false);
    const toggleSwitch = () => setCutlery(previousState => !previousState);

    const [voucher, setVoucher] = useState(false);
    const toggleVoucherSwitch = () => setVoucher(previousState => !previousState);

    const { userEmail, userName, userToken } = useContext(userContext);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const [shop, setShop] = useState();
    const [address, setAddress] = useState();

    const [shopNames, setShopNames] = useState([]);

    const cartPath = "getCart/" + userEmail;
    const shopPath = "getShop/";

    const orderPath = "getOrderAddress/"



    useEffect(() => {
        navigation.addListener('focus', () => {
            fetch(url + cartPath)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    var sum = 0;
                    for (var i = 0; i < json.length; i++) {
                        json[i]['imageURI'] = 'http://dip.totallynormal.website/picture/' + json[i]['shop.ID'] + "/" + json[i]['dish.name'];
                        //console.log(json[i]['imageURI']);
                        sum = sum + (json[i]['price']) * json[i]['quantity'];
                    }

                    setSubtotal(parseFloat((sum) / 10000).toFixed(2));

                    sum += 30000;

                    setTotalPrice(parseFloat((sum) / 10000).toFixed(2));

                    setData(json);

                    return json[0]['shop.ID']
                })
                .then((shopID) => {
                    fetch(url + shopPath + shopID)
                        .then((response) => response.json())
                        .then((json) => {
                            setShop(json[0]['name']);
                            setAddress(json[0]['address']);
                        })
                })
                .then(() => {
                    fetch(url + orderPath + userEmail)
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json);
                            setShopNames(json[0]['shop.name'])

                            console.log(json[0]['shop.name'])

                        })
                }

                )
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));




        });

    }, []);

    const renderItem = ({ item }) => (
        <BillCard dishName={item['dish.name']} quantity={item['quantity']} description={item['description']} category={item['category']} price={item['price']} imageURI={item.imageURI} shopID={item['shop.ID']}></BillCard>
    );
    return (
        <PaperProvider theme={theme}>
            <AnimatedSplash
                translucent={false}
                isLoaded={!isLoading}
                logoImage={require("./assets/rungif.gif")}
                backgroundColor={"#f2a6a6"}
                logoHeight={300}
                logoWidth={300}
            >
                {/* START WRITING CODE BELOW!!!! */}
                <View style={[styles.container, { flex: 1, flexDirection: 'column', justifyContent: 'space-between' }]}>
                    <Card style={[styles.cardSec, { margin: 16, flex: 3 }]}>
                        <Card.Content>
                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-around', }]}>
                                <Image source={require('./assets/scooter-icon.png')} style={[styles.imageIcon, {}]}></Image>
                                <View style={[styles.container, { flex: 1 }]}>
                                    <Text style={[styles.backgroundText, { fontWeight: 'normal', fontSize: 16 }]}>Ordering From:</Text>
                                    <FlatList
                                        style={{flexDirection: 'column'}}
                                        data={shopNames}
                                        renderItem={({ item }) => <Text style={[styles.text, { fontWeight: 'normal', flexWrap: 'wrap', flex: 1 }]}>{"•"}{item}</Text>}
                                    />
                                </View>
                            </View>

                        </Card.Content>
                    </Card>

                    <View style={[styles.container, { flex: 1, marginBottom: 4, flexDirection: 'row', justifyContent: "space-between", }]}>
                        <Text style={[styles.backgroundText, { marginLeft: 16 }]}>Order</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Listing') }}>
                            <Text style={[styles.text, { marginRight: 16 }]}>Add Items</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={[styles.container, { flex: 15 }]}>
                        <ScrollView>

                            {isLoading ? <ActivityIndicator style={{ flex: 35 }} /> : (
                                <View style={{ flex: 35 }}>
                                    <FlatList
                                        data={data}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                        style={{ flex: 1 }}
                                    />
                                </View>)}

                            <Divider style={styles.divider} horizontalInset='true' bold='true' />

                            <RecommendedOrderCard></RecommendedOrderCard>

                            <View>
                                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                    <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 14 }]}>Subtotal</Text>
                                    <Text style={[styles.backgroundText, { marginRight: 16, fontSize: 14 }]}>{'S$'}{subtotal}</Text>
                                </View>
                                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                    <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 14 }]}>Delivery fee</Text>
                                    <Text style={[styles.backgroundText, { marginRight: 16, fontSize: 14 }]}>S$3.00</Text>
                                </View>
                                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                    <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 14, textAlignVertical: 'center' }]}>Redeem 100 Hippo coins</Text>
                                    <Switch style={[{ marginRight: 8 }]} onValueChange={toggleVoucherSwitch} value={voucher} />
                                </View>
                            </View>

                            <Divider style={styles.divider} horizontalInset='true' bold='true' />

                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <View style={[styles.container, { flexDirection: 'row' }]}>
                                    <Button style={styles.iconPrimTint} icon={'ticket-percent-outline'}></Button>
                                    <Text style={[styles.text, { marginLeft: 8, textAlignVertical: 'center' }]}>Hippo Voucher</Text>
                                </View>

                                <Button style={styles.iconPrimTint} icon={'chevron-right'}></Button>
                            </View>

                            <Divider style={styles.divider} horizontalInset='true' bold='true' />

                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <View style={[styles.container, { flexDirection: 'row' }]}>
                                    <View style={[{ justifyContent: 'center' }]} >
                                        <Button style={styles.iconPrimTint} icon={'food-fork-drink'}></Button>
                                    </View>

                                    <Text style={[styles.backgroundText, { marginLeft: 8, textAlignVertical: 'center', fontSize: 14 }]}>Cutlery</Text>
                                </View>
                                <Switch style={[{ marginRight: 8 }]} onValueChange={toggleSwitch} value={cutlery} />
                            </View>
                            <Text style={[styles.infoText, { marginHorizontal: 16, }]}>
                                {cutlery ? (
                                    "We won’t bring cutlery. Thanks for helping us to reduce waste.") :
                                    ("")}
                            </Text>
                        </ScrollView>

                    </View>

                    <Divider style={styles.divider} horizontalInset='true' bold='true' />

                    <View style={[styles.container, { flex: 3, marginBottom: 8 }]}>

                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }]}>
                            <View style={[styles.container, { flexDirection: 'row' }]}>
                                <Text style={[styles.backgroundText, {}]}>Total</Text>
                                <Text style={[styles.infoText, { marginHorizontal: 4 }]}>(includes GST)</Text>
                            </View>
                            <Text style={styles.text}>{"S$"}{totalPrice}</Text>
                        </View>

                        <Button style={[styles.button, { marginHorizontal: 16, borderRadius: 15 }]} android_ripple={{ color: 'white', borderless: false }} onPress={() => {
                            navigation.navigate('Payment', { totalCheckout: totalPrice });
                        }}>
                            <Text style={styles.buttonText}>Checkout</Text>
                        </Button>

                    </View>



                </View>
            </AnimatedSplash>
        </PaperProvider >
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