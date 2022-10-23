import React, { useState, useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';

export function CustomerReviewCard({ name, date, comments, overall, food, packaging, value }) {
    return (

        <Card style={styles.cardSec}>
            <Card.Content>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                        <Text style={styles.backgroundText}>{name}</Text>

                        <Text style={styles.infoText}>{date}</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Card style={[styles.cardReview, {width: 130}]}>
                            <View style={{margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.smallText}>Great Packaging</Text>
                            </View>
                        </Card>

                        <Card style={styles.cardReview}>
                            <View style={{margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.smallText}>Delicious Food</Text>
                            </View>
                        </Card>
                        <Card style={styles.cardReview}>
                            <View style={{margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.smallText}>Worth It</Text>
                            </View>
                        </Card>
                    </View>
                    <Text>Overall rating: {overall.toFixed(1)}</Text>
                    <Text>{comments}</Text>
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
        color: "#808080",
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

    smallText: {
        color: "#000000",
        fontSize: 12,
        // fontFamily: "Roboto-Regular",
        textAlign: "center",
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
        padding: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#0000001A",
        backgroundColor: "#FFFFFF",
        borderRadius: 10
    },

    cardReview: {
        width: 80,
        height: 36,
        backgroundColor: "#F9E6E6",
        borderRadius: 20,
        elevation: 3,
        margin: 4,
        alignItems: 'center',
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