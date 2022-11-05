import React, { useState, useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Divider, Title, Paragraph, ProgressBar } from 'react-native-paper';
import { StyleSheet, View, Image, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';


export function CustomerReviewCard({ name, date, comments, overall, food, packaging, value }) {

    // useEffect(() => {
    //     dates= new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);

    //     setFormattedDate(dates);

    // }, []);

    //const [formattedDate, setFormattedDate] = useState();

    const [nameInitial, setInitials] = useState("");

    useEffect(() => {
        if( name != null){
            setInitials(name[0]);
        }

    }, [name]);

    return (

        <Card style={styles.cardSec}>
            <Card.Content>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <InitialIcon initials={nameInitial}/>
                            <Text style={[styles.backgroundText, { textTransform: 'capitalize' }]}>{name}</Text>
                        </View>
                        <Text style={styles.infoText}>{date}</Text>
                    </View>

                    <View style={styles.ratingsView}>
                        <View>
                            <Text style={styles.text}>Overall</Text>
                            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{overall.toFixed(1)}</Text>
                        </View>

                        <Divider style={styles.divider} bold='true' />

                        <View style={{ alignSelf: 'center' }}>
                            <Text>Food</Text>
                            <Text>Packaging</Text>
                            <Text>Value
                            </Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <ProgressBar progress={(food / 10)} color={'#E76766'} style={styles.bar} />
                                <Text style={styles.innerText}>{food}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <ProgressBar progress={(packaging / 10)} color={'#E76766'} style={styles.bar} />
                                <Text style={styles.innerText}>{packaging}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <ProgressBar progress={(value / 10)} color={'#E76766'} style={styles.bar} />
                                <Text style={styles.innerText}>{value}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={{ fontSize: 16 }}>{comments}</Text>
                </View>


            </Card.Content>

        </Card>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',

    },

    ratingsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F9E6E6',
        borderRadius: 10,
        elevation: 2,
        marginVertical: 8,
        padding: 16,
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
        fontSize: 16,
        // fontFamily: "Roboto-Regular",
        fontWeight: "bold",
        textAlignVertical: 'bottom'
    },

    infoText: {
        color: "#808080",
        fontSize: 14,
        fontStyle: 'italic',
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
        fontWeight: "bold",
        fontSize: 14,
        // fontFamily: "Roboto-Regular",
        marginLeft: 8,
        textAlign: "right",
        textAlignVertical: 'center'
    },

    smallText: {
        color: "#000000",
        fontSize: 12,
        // fontFamily: "Roboto-Regular",
        textAlign: "center",
    },

    bar: {
        marginVertical: 4,
        height: 12,
        width: 100,
        borderRadius: 10,
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
        width: 1,
        height: '100%',
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

const InitialIcon = ({ initials, name }) => {
    return (
        <View
            style={{
                backgroundColor: '#E76766',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                width: 30,
                height: 30,
                marginRight: 8,
            }}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: "bold", textTransform: 'uppercase', textAlign: 'center' }}>{initials}</Text>

        </View>

    );
};