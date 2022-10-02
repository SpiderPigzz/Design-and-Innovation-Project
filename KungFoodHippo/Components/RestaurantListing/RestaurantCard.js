import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import React, { useState, useEffect} from "react";

export function RestaurantCard({ title, description, deliveryDesc, imageURI }) {
    //console.log(imageURI);
    const [showDefault, setState] = useState(require('../../assets/images/subway.png'));
    //var image = showDefault ? require('../../assets/images/subway.png') : { uri: imageURI };

    useEffect(() => {
        fetch(imageURI)
            .then((res) => {
                if (res.status != 404) {
                    setState({ uri: imageURI })
                }
            })
            .catch((err) => {
                console.log("unable to fetch site data");
            });
    }, []);


    return (

        <Card style={styles.cardSec}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ marginVertical: 4, marginRight: 20, flex: 1, width: 120, height: 120, }}>

                    <ImageBackground
                        style={[styles.Image, { justifyContent: 'space-between', flex: 1 }]}
                        imageStyle={{ borderRadius: 10 }}
                        source={showDefault}
                    >

                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <Card style={styles.dealCard}>
                                <Text style={styles.dealText}>
                                    Food Fest Deals
                                </Text>
                            </Card>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 8, marginHorizontal: 16 }}>
                            <Card style={styles.timeCard}>
                                <Text style={styles.timeText}>
                                    30 min
                                </Text>
                            </Card>
                        </View>
                    </ImageBackground>



                </View>

                <View style={{ flex: 2, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.textBold}>
                            {title}
                        </Text>
                        <Text numberOfLines={4} style={styles.text}>
                            {description}
                        </Text>
                    </View>
                    <Text style={[styles.text, { fontWeight: "normal" }]}>
                        {deliveryDesc}
                    </Text>

                </View>
            </View>


        </Card>);
}



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        justifyContent: 'center',
    },

    textBold: {
        color: "#000000",
        textAlign: "left",
        fontSize: 20,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold"
    },

    text: {
        color: "#000000",
        textAlign: "left",
        fontSize: 14,
        fontWeight: "200"
    },

    dealText: {
        color: "#FFFFFF",
        textAlign: "left",
        fontSize: 8,
        fontWeight: "bold"
    },

    timeText: {
        color: "#000000",
        textAlign: "left",
        fontSize: 8,
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

    card: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#E76766",
        borderRadius: 5,
    },

    cardSec: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 8,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#F9E6E6",
        borderRadius: 10
    },

    dealCard: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#E76766",
        borderRadius: 5,
        zIndex: 1
    },

    timeCard: {
        marginTop: -16,
        paddingVertical: 4,
        paddingHorizontal: 8,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        zIndex: 1
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