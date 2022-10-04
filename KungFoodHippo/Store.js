import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow } from 'react-native-paper';
import { styles } from './Styles.js'
import { FoodCard } from './Components/FoodCard.js';
import { ReviewCard } from './Components/ReviewCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export function StoreScreen({navigation}){

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View>
                <Image source={require('./assets/Pastamania.png')} style={{ height: 160, width: null }} />
                <TouchableOpacity 
                    style={[styles.buttonTouchable, { position: "absolute", left: 10, top: 5, backgroundColor: "#ffffff", width: 40, borderRadius: 50, alignContent: "center" }]}
                    onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('./assets/ArrowLeft.png')}
                            style={[styles.iconPrimTint, {height: 16, width: 16, }]}
                        />
                </TouchableOpacity>
            </View>

            <View style={[styles.container, { paddingHorizontal: 16 , paddingVertical: 8}]}>
                <View style={{ flexDirection: "row"}}>
                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Pastamania</Text>
                    
                </View>

                <ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingVertical: 4 }}>
                            <Image
                                source={require('./assets/locationpin.png')}
                                style={[styles.iconPrimTint, {height: 18, width: 12, alignSelf: "center"}]}
                            />
                            <Text style={{ textAlignVertical: "center" }}>   Lot One    |    1.8km away</Text>
                        </View>
                        <Text style={[styles.innerText, { textAlignVertical: "center" }]}>More info</Text>
                    </View>
                    

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingVertical: 4 }}>
                            <Image
                            source={require('./assets/Time.png')}
                            style={[styles.iconPrimTint, {height: 16, width: 16, alignSelf: "center"}]}
                            />
                            <Text style={{fontWeight: "bold", textAlignVertical: "center"}}>  Delivery: 30 min</Text>
                        </View>
                        <Text style={[styles.innerText, { textAlignVertical: "center" }]}>Change</Text>
                    </View>

                    <ReviewCard></ReviewCard>

                    {/* navigation tab here */}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Set Meal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Popular</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Appetisers</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Pasta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text>Pizza</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Set Meal</Text>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>

                </ScrollView>
            </View>
            
            {/*<ScrollView style={{backgroundColor: "#ffffff", paddingHorizontal: 16}}>
                <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Set Meal</Text>
                <FoodCard></FoodCard>
                <FoodCard></FoodCard>
            </ScrollView>*/}
        </PaperProvider>
    );
}

const theme = {
    DefaultTheme,
    colors: {
        primary: styles.primColor,
        secondary: styles.secColor,
    },
};
