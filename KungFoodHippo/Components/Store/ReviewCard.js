import React, { useState, useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { View, Image, TouchableOpacity, Modal, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';


export function ReviewCard({ overall, food, packaging, value, count, shopID, navigation }) {

    return (

        <Card style={[styles.card, { marginBottom: 8, paddingHorizontal: 0, paddingVertical: 0 }]}>
            <Card.Content>
                <TouchableOpacity 
                    activeOpacity={0.85} 
                    onPress={() => {navigation.navigate('Review', {shopID: shopID})}}
                >
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: "row", paddingBottom: 6 }}>
                                <Text style={{ fontWeight: "bold", color: "#E76766", paddingRight: 10 }}>Reviews</Text>
                                <Text style={{ fontStyle: "italic", paddingLeft: 10, color: '#808080' }}>{count} ratings</Text>
                            </View>

                            <Image
                                source={require('../../assets/rightArrowHead.png')}
                                style={{ height: 14, width: 14, tintColor: "#808080" }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
                            <View style={{ alignItems: "center" }}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={overall}
                                    maxValue={10}
                                    radius={32}
                                    title={overall.toFixed(1)}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={8}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={8}
                                />
                                <Text>Overall</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={food}
                                    maxValue={10}
                                    radius={32}
                                    title={food.toFixed(1)}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={8}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={8}
                                />
                                <Text>Food</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={packaging}
                                    maxValue={10}
                                    radius={32}
                                    title={packaging.toFixed(1)}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={8}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={8}
                                />
                                <Text>Packaging</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={value}
                                    maxValue={10}
                                    radius={32}
                                    title={value.toFixed(1)}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={8}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={8}
                                />
                                <Text>Value</Text>
                            </View>

                        </View>

                    </View>

                </TouchableOpacity>

            </Card.Content>
        </Card>
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
        marginTop: 4,
        marginHorizontal: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
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