import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer } from 'react-native-paper';
import { styles } from './Styles.js'
import { FoodCard } from './Components/FoodCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export function StoreScreen({ navigation }) {
    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View>
                <Image source={require('./assets/Pastamania.png')} style={{ height: 160, width: null }} />
                <TouchableOpacity style={[styles.buttonTouchable, { position: "absolute", left: 10, top: 5, backgroundColor: "#ffffff", width: 40, borderRadius: 50, alignContent: "center" }]}>
                    <Button icon={"arrow-left"} />
                </TouchableOpacity>
            </View>

            <View style={[styles.container, { paddingHorizontal: 16 }]}>
                <View style={[styles.container, { flexDirection: "row", justifyContent: "space-between" }]}>
                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Pastamania</Text>
                    <Text style={[styles.innerText, { textAlignVertical: "bottom" }]}>More info</Text>
                </View>

                <View style={[styles.container, { flexDirection: "row", justifyContent: "flex-start" }]}>
                    <Button icon={"map-marker-outline"}></Button>
                    <Text style={{ textAlignVertical: "center" }}>Lot One    |    1.8km away</Text>
                </View>

                <View style={[styles.container, { flexDirection: "row", justifyContent: 'space-around' }]}>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                        <Button icon={"star"}></Button>
                    <Text style={{ textAlignVertical: "center" }}> 300+ ratings</Text>
                </View>

                <View style={[styles.container, { flexDirection: "row", justifyContent: "space-between" }]}>
                    <Text style={{ fontWeight: "bold" }}>Delivery: 30 min</Text>
                    <Text style={[styles.innerText, { textAlignVertical: "bottom" }]}>Change</Text>
                </View>

                {/* navigation tab here */}
                <ScrollView horizontal={true}>
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


                <ScrollView>
                    <Text style={[styles.backgroundText, { textAlign: "left", fontSize: 24, textAlignVertical: "bottom" }]}>Set Meal</Text>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                    <FoodCard></FoodCard>
                </ScrollView>

            </View>
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