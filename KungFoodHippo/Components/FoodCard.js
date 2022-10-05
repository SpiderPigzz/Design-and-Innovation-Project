import * as React from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import {styles} from '../Styles.js'
import { StyleSheet, View, Image, TouchableOpacity, Modal } from 'react-native';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export function FoodCard() {
    
    const [visible, setVisible] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const add = () => setCount(prevCount => prevCount + 1);
    const subtract = () => setCount(prevCount => prevCount - 1);

    return (

        <Card style={styles.cardSec}>
            <Card.Content style={[styles.container, { justifyContent: 'flex-start'}]}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
                            <Text style={[styles.backgroundText]}>Value Meal</Text>
                            <Text style={[styles.backgroundText, {fontWeight: 'normal', fontSize: 12, textAlignVertical: 'top'}]}>
                                1 pasta, 1 soup with 3pcs of {'\n'} garlic bread and 1 can drink.
                            </Text>
                            <Text style={[styles.backgroundText, {fontSize: 14}]}>S$17.00</Text>
                        </View>

                        <Image source={require('../assets/Pastamania-meal1.png')} style={[styles.imageIcon, {width: 90, height: 90}]}></Image>
                    </View>
                </TouchableOpacity>

                <Modal transparent={true} visible={visible}>
                    <View style={{backgroundColor: "#000000aa", flex: 1, justifyContent: "center"}}>
                        <View style={{backgroundColor: "#ffffff", margin: 20, padding: 20, borderRadius: 20}}>
                            <View style={{ flexDirection: 'row', justifyContent: "center", paddingBottom: 6}}>
                                <TouchableOpacity onPress={() => setVisible(false)}>
                                    <Image
                                        source={require('../assets/Cross.png')}
                                        style={{height: 16, width: 16, left: -55}}
                                    />
                                </TouchableOpacity>
                                <Image source={require('../assets/Pastamania-meal1.png')} style={[styles.imageIcon, {width: 200, height: 120}]}></Image>   
                            </View>                            
                            
                            <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 8}}>
                                <Text style={[styles.backgroundText, {fontSize: 18}]}>Value Meal</Text>
                                <Text style={[styles.backgroundText, {fontSize: 18, fontWeight: "normal"}]}>S$17.00</Text>
                            </View>
                            
                            <Text style={[styles.backgroundText, {fontWeight: 'normal', fontSize: 12, textAlign: "center"}]}>
                                1 pasta, 1 soup with 3pcs of Garlic bread and 1 can drink.
                            </Text>
                            
                            <View style={{flexDirection: "row", justifyContent: "center", paddingVertical: 24}}>
                                <TouchableOpacity 
                                    style={{backgroundColor: "#c0c0c0", width: 36, height: 36, borderRadius: 50, justifyContent: "center"}}
                                    onPress={subtract}
                                >
                                    <Text style={[styles.buttonText, {fontSize: 30}]}>-</Text>
                                </TouchableOpacity>
                                <Text style={[styles.backgroundText, {fontSize: 24, textAlignVertical: "center", paddingHorizontal: 30}]}>{count}</Text>
                                <TouchableOpacity 
                                    style={{backgroundColor: "#E76766", width: 36, height: 36, borderRadius: 50, justifyContent: "center"}}
                                    onPress={add}
                                >
                                    <Text style={[styles.buttonText, {fontSize: 30}]}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <Button 
                                style={{backgroundColor: "#E76766", height: 50, borderRadius: 15, justifyContent: "center", marginTop: 8}}
                                >
                                    <Text style={styles.buttonText}>Add to Cart</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

            </Card.Content>
        </Card>);
}