import { Icon } from 'react-native-elements';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import React, { useState, useEffect } from "react";
import { proc } from 'react-native-reanimated';

export function BillCard({ dishName, quantity, description, category, price, imageURI }) {

    const [showDefault, setState] = useState(require('../../assets/images/subway.png'));
    const [processedPrice, setProcessedPrice] = useState(0)
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

        setProcessedPrice((price / 10000).toFixed(2))

    }, []);

    return (

        <Card style={[styles.cardSec, { marginHorizontal: 16 }]}>
            <Card.Content style={[styles.container, { justifyContent: 'flex-start' }]}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                    <Text style={[styles.backgroundText]}>{dishName}</Text>
                    {/* <Button style={styles.iconPrimTint} icon='application-edit-outline'></Button>
                    <Text style={[styles.text]}>Edit</Text> */}
                </View>

                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>

                    <ImageBackground style={[styles.Image]} imageStyle={{ borderRadius: 10 }} source={showDefault}></ImageBackground>
                    <View style={[styles.container, { flexDirection: 'column', flex: 1}]}>
                        <Text style={[styles.backgroundText, { fontWeight: 'bold', fontSize: 14, textAlignVertical: 'top', marginHorizontal: 8 }]}>{category}</Text>
                        <Text style={[styles.backgroundText, { fontWeight: 'normal', fontSize: 12, textAlignVertical: 'top', marginHorizontal: 8, flexWrap: 'wrap', flex: 1 }]}>{description}</Text>
                    </View>
                    <View style={[styles.container, { flexDirection: 'column', justifyContent: 'space-evenly'}]}>
                    <Text style={[styles.text, { fontSize: 16, textAlignVertical: 'top' }]}>{"S$"}{processedPrice}</Text>
                    <Text style={[styles.text, { textAlignVertical: 'top' }]}>{quantity}{"pcs"}</Text>
                    </View>
                    
                </View>

            </Card.Content>
        </Card>);
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

    Image: {
        elevation: 3,
        borderWidth: 0,
        borderRadius: 15,
        width: 80,
        height: 80,
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