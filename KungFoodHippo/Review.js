import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, Divider } from 'react-native-paper';
import { CustomerReviewCard } from './Components/Store/CustomerReviewCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SocialIcon } from 'react-native-elements';

const url = 'http://dip.totallynormal.website/';

export function ReviewScreen({ navigation, route }) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [shopOverall, setShopOverall] = useState();
    const [shopFood, setShopFood] = useState();
    const [shopPackaging, setShopPackaging] = useState();
    const [shopValue, setShopValue] = useState();
    const [ratingCount, setRatingCount] = useState();
    const [restaurant, setRestaurant] = useState();

    const { shopID } = route.params;

    const shopPath = "getShop/" + shopID;
    const reviewPath = "getShopRating/" + shopID;
    const custReviewPath = "getShopReview/" + shopID;

    useEffect(() => {
        fetch(url + shopPath)
            .then((response) => response.json())
            .then((json) => {
                setRestaurant(json[0].name);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        fetch(url + reviewPath)
            .then((response) => response.json())
            .then((json) => {
                setShopOverall(parseFloat(json[0].overall).toFixed(1));
                setShopFood(json[0].food);
                setShopPackaging(json[0].packaging);
                setShopValue(json[0].value);
                setRatingCount(json[0].count);
            })
            .catch((error) => alert(error))
            .finally(() => setLoading(false));

        fetch(url + custReviewPath)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => alert(error))
            .finally(() => setLoading(false));

    }, [shopID]);

    const renderItem = ({ item }) => (
        <CustomerReviewCard name={item["customer.email"]} date={item.date} comments={item.comments} overall={item.overall} food={item.food} packaging={item.packaging} value={item.value}></CustomerReviewCard>
    );

    return (
        <PaperProvider theme={theme}>
            <View style={[styles.container, { flex: 1 }]}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.buttonNavigation}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('./assets/ArrowLeft.png')}
                            style={[styles.iconPrimTint, { height: 16, width: 16, }]}
                        />
                    </TouchableOpacity>

                    <View style={{ paddingHorizontal: 14 }}>
                        <Text style={styles.headerTitle}>Ratings & Reviews</Text>
                        <Text style={styles.headerText}>{restaurant}</Text>
                    </View>
                </View>



                <ScrollView style={{ paddingBottom: 16 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Overall Rating</Text>
                            <Text style={[styles.infoText, { fontStyle: "italic", textAlign: 'center' }]}>{ratingCount} ratings</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { fontSize: 42 }]}>{shopOverall}</Text>
                                <Button labelStyle={{ fontSize: 45, color: '#F8CD44' }} style={{ backgroundColor: '#fff', height: 45, width: 45 }} icon="star" />
                            </View>

                            <View style={{ flexDirection: 'row', padding: 16, justifyContent: 'center' }}>
                                <Card style={styles.cardRating}>
                                    <Card.Content>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>Most rate</Text>
                                            <Text style={{ fontWeight: 'bold' }}>8</Text>
                                        </View>

                                    </Card.Content>
                                </Card>

                                <Card style={styles.cardRating}>
                                    <Card.Content>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>Most rate</Text>
                                            <Text style={{ fontWeight: 'bold' }}>8</Text>
                                        </View>

                                    </Card.Content>
                                </Card>

                                <Card style={styles.cardRating}>
                                    <Card.Content>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>Most rate</Text>
                                            <Text style={{ fontWeight: 'bold' }}>8</Text>
                                        </View>

                                    </Card.Content>
                                </Card>

                                <Card style={styles.cardRating}>
                                    <Card.Content>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>Most rate</Text>
                                            <Text style={{ fontWeight: 'bold' }}>8</Text>
                                        </View>

                                    </Card.Content>
                                </Card>
                            </View>

                        </View>

                        <Divider style={styles.divider} horizontalInset='true' bold='true' />

                        <View style={[styles.container, { paddingHorizontal: 16 }]}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={[styles.title, { textAlign: 'left' }]}>Reviews</Text>
                                <Button icon={"filter-variant"} textColor={"#000000"} style={styles.buttonOutline}>
                                    <Text>
                                        Filter
                                    </Text>
                                </Button>
                            </View>

                            {isLoading ? <ActivityIndicator /> : (
                                <View>
                                    <FlatList
                                        data={data}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            )}
                        </View>
                    </SafeAreaView>
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

    header: {
        backgroundColor: '#E76766',
        width: '100%',
        padding: 16,
        flexDirection: 'row',
    },

    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlignVertical: 'bottom',
        // fontFamily: "Roboto-Regular",
    },

    headerText: {
        color: '#ffffff',
        fontSize: 14,
        textAlignVertical: 'bottom',
        // fontFamily: "Roboto-Regular",
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
        textAlign: 'center',
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
        color: '#808080',
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
        padding: 8,
        backgroundColor: "#E76766",
        // fontFamily: "Roboto-Regular",
        borderRadius: 20,
    },

    buttonSec: {
        padding: 8,
        backgroundColor: "#FFFFFF",
        // fontFamily: "Roboto-Regular",
        borderRadius: 20,
    },

    buttonOutline: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#000000",
        // fontFamily: "Roboto-Regular",
        borderRadius: 20,
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

    buttonNavigation: {
        padding: 10,
        backgroundColor: "#FFFFFF",
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginVertical: 5,
        elevation: 5,
    },

    card: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#F9E6E6",
        borderRadius: 10,
    },

    cardSec: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#0000001A",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },

    cardRating: {
        width: 90,
        height: 80,
        backgroundColor: "#F9E6E6",
        borderRadius: 20,
        elevation: 3,
        marginHorizontal: 4,
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