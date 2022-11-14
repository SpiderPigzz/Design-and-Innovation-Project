import { Icon } from 'react-native-elements';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import { proc } from 'react-native-reanimated';
import { userContext } from '../../App.js';
import { useContext } from 'react';

export function BillCard({ dishName, quantity, description, category, price, imageURI, shopID }) {

    const { userEmail, userName, userToken } = useContext(userContext);
    const [showDefault, setState] = useState(require('../../assets/images/subway.png'));
    const [processedPrice, setProcessedPrice] = useState(0);
    const [totalItemPrice, setTotalItemPrice] = useState(0);
    const [count, setCount] = useState(0);
    const add = () => {
        setCount(prevCount => prevCount + 1);
    };
    const subtract = () => {
        setCount(prevCount => (count > 0) ? (prevCount - 1) : prevCount);
    };
    //var image = showDefault ? require('../../assets/images/subway.png') : { uri: imageURI };
    var submitOrder = {
        'customer.email': userEmail,
        'shop.ID': shopID,
        'dish.name': dishName,
        'quantity': count
    };

    useEffect(() => {
        setProcessedPrice((price / 10000).toFixed(2));
        setTotalItemPrice((price * count / 10000).toFixed(2));
        changeQuantity();
    }, [count]);

    useEffect(() => {
        setCount(quantity);
        fetch(imageURI)
            .then((res) => {
                if (res.status != 404) {
                    setState({ uri: imageURI })
                }
            })
            .catch((err) => {
                console.log("unable to fetch site data");
            });

        setProcessedPrice((price / 10000).toFixed(2));
        setTotalItemPrice((price * count / 10000).toFixed(2));

    }, [price, quantity, dishName]);

    const changeQuantity = async () => {
        try {
            var formBody = [];
            for (var property in submitOrder) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(submitOrder[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: formBody
            };
            await fetch('http://dip.totallynormal.website/updateCart', requestOptions)
                .then(response => {
                    console.log(response.status)
                    console.log(formBody)
                })
        }
        catch (error) {
            console.error(error);
        }
    }


    return (

        <Card style={[styles.cardSec, { marginHorizontal: 16 }]}>
            <Card.Content style={[styles.container, { justifyContent: 'flex-start' }]}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                    <Text style={[styles.backgroundText]}>{dishName}</Text>
                    {/* <Button style={styles.iconPrimTint} icon='application-edit-outline'></Button>
                    <Text style={[styles.text]}>Edit</Text> */}
                </View>

                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }]}>

                    <ImageBackground style={[styles.Image]} imageStyle={{ borderRadius: 10 }} source={showDefault}></ImageBackground>
                    <View style={[styles.container, { flexDirection: 'column', flex: 1 }]}>
                        <Text style={[styles.backgroundText, { fontWeight: 'bold', fontSize: 14, fontStyle:'italic', color:'#454545', textAlignVertical: 'top', marginHorizontal: 8 }]}>{category}</Text>
                        <Text numberOfLines={8} style={[styles.backgroundText, { fontWeight: 'normal', fontSize: 12, color:'#787878' , fontStyle:'italic', textAlignVertical: 'top', marginHorizontal: 8, flexWrap: 'wrap', flex: 1 }]}>{description}</Text>
                    </View>
                    <View style={[styles.container, { flexDirection: 'column', justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 8 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: count > 0 ? "#E76766" : "#c0c0c0", width: 32, height: 32, borderRadius: 50, justifyContent: "center", alignItems: 'center' }}
                                onPress={subtract}
                            >
                                <Text style={[styles.buttonText, { fontSize: 26 }]}>-</Text>
                            </TouchableOpacity>
                            <Text style={[styles.backgroundText, { fontSize: 24, textAlignVertical: "center", paddingHorizontal: 30 }]}>{count}</Text>
                            <TouchableOpacity
                                style={{ backgroundColor: "#E76766", width: 32, height: 32, borderRadius: 50, justifyContent: "center", alignItems: 'center' }}
                                onPress={add}
                            >
                                <Text style={[styles.buttonText, { fontSize: 24 }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={[styles.text, { textAlignVertical: 'top' }]}>{count}{"pcs"}</Text>
                            <Text style={[styles.text, { textAlignVertical: 'top' }]}>{"S$"}{processedPrice}/ea</Text>
                            <Text style={[styles.text, { fontSize: 15, textAlignVertical: 'top' }]}>Total: {"S$"}{totalItemPrice}</Text>
                        </View>
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
        color: "black",
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold",
        textAlign: 'right',
        textAlignVertical: 'bottom'
    },

    infoText: {
        color: "grey",
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
        borderRadius: 10,
    },

    cardSec: {
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#0000001A",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
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