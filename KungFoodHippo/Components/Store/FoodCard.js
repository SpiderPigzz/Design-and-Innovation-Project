import React, { useState, useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, TouchableOpacity, Modal } from 'react-native';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { userContext } from '../../App.js';
import { useContext } from 'react';

export function FoodCard({ title, description, price, imageURI, shopID }) {
    const { userEmail, userName, userToken } = useContext(userContext);
    
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0);
    const add = () => setCount(prevCount => prevCount + 1);
    const subtract = () => setCount(prevCount => (count > 0) ? (prevCount - 1) : prevCount);
    const [showDefault, setState] = useState(require('../../assets/Pastamania-meal1.png'));
    const submitOrder = {
        'customer.email': userEmail,
        'shop.ID': shopID,
        'dish.name': { title }.title,
        'quantity': { count }.count
    }

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
    }, [showDefault]);


    

    const postExample = async () => {
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
        setVisible(false)
    }

    return (

        <Card style={styles.cardSec}>
            <Card.Content style={[styles.container, { justifyContent: 'flex-start' }]}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <View style={[styles.container, { justifyContent: 'flex-start', flex: 2 }]}>
                            <Text style={[styles.backgroundText]}>{title}</Text>
                            <Text style={[styles.backgroundText, { fontWeight: 'normal', fontSize: 12, textAlignVertical: 'top' }]}>
                                {description}
                            </Text>
                            <Text style={[styles.backgroundText, { fontSize: 14 }]}>S${(price / 10000).toFixed(2)}</Text>
                        </View>
                    
                        <Image source={showDefault} style={{ width: 90, height: 90, borderRadius:10, flex: 1, alignSelf: "center", marginLeft: 20 }}></Image>
                    </View>
                </TouchableOpacity>

                <Modal 
                    transparent={true} 
                    visible={visible}
                    animationType= "fade"
                >
                    <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }}>
                        <View style={{ backgroundColor: "#ffffff", margin: 20, padding: 20, borderRadius: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "center", paddingBottom: 6 }}>
                                <TouchableOpacity 
                                    style={[styles.buttonNavigation, { position: "absolute", left: -15, top: -10}]}
                                    onPress={() => setVisible(false)}
                                >
                                    <Image
                                        source={require('../../assets/Cross.png')}
                                        style={{ height: 16, width: 16 }}
                                    />
                                </TouchableOpacity>
                                <Image source={showDefault} style={{ width: 120, height: 120, borderRadius: 10}}></Image>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                                <Text style={[styles.backgroundText, { fontSize: 18, flex: 3 }]}>{title}</Text>
                                <Text style={[styles.backgroundText, { fontSize: 18, fontWeight: "normal", paddingLeft: 10, alignSelf: 'flex-end' }]}>S${(price / 10000).toFixed(2)}</Text>
                            </View>

                            <Text style={[styles.backgroundText, { fontWeight: 'normal', fontSize: 12, textAlign: "center" }]}>
                                {description}
                            </Text>

                            <View style={{ flexDirection: "row", justifyContent: "center", paddingVertical: 24 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: count > 0 ? "#E76766" : "#c0c0c0", width: 36, height: 36, borderRadius: 50, justifyContent: "center" }}
                                    onPress={subtract}
                                >
                                    <Text style={[styles.buttonText, { fontSize: 30 }]}>-</Text>
                                </TouchableOpacity>
                                <Text style={[styles.backgroundText, { fontSize: 24, textAlignVertical: "center", paddingHorizontal: 30 }]}>{count}</Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: "#E76766", width: 36, height: 36, borderRadius: 50, justifyContent: "center" }}
                                    onPress={add}
                                >
                                    <Text style={[styles.buttonText, { fontSize: 30 }]}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                style={{ backgroundColor: "#E76766", height: 50, borderRadius: 15, justifyContent: "center", marginTop: 8 }}
                                onPress={postExample}
                            >
                                <Text style={styles.buttonText}>Add to Cart</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

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

    buttonNavigation: {
        padding: 10,
        backgroundColor: "#FFFFFF",
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
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
        marginVertical: 8,
        marginHorizontal: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#0000001A",
        backgroundColor: "#FFFFFF",
        borderRadius: 10
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