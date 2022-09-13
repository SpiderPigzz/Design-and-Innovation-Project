import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, Divider, Switch } from 'react-native-paper';
import { styles } from './Styles.js'
import { BillCard } from './Components/Checkout/BillCard';
import { RecommendedOrderCard } from './Components/Checkout/RecommendedOrderCard';
import { HippoCard } from './Components/TestCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

export function CheckoutScreen({ navigation }) {
    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View style={[styles.container, {flex:1, flexDirection: 'column', justifyContent:'space-between'}]}>
                <Card style={[styles.cardSec, { margin: 16, flex: 3}]}>
                    <Card.Content>
                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                            <Image source={require('./assets/scooter-icon.png')} style={[styles.imageIcon, {}]}></Image>
                            <View style={[styles.container, {}]}>
                                <Text style={[styles.backgroundText, { fontWeight: 'normal' }]}>Estimated Delivery</Text>
                                <Text style={styles.text}>ASAP (35 mins)</Text>
                                <Text style={[styles.text, { fontWeight: 'normal' }]}>Change</Text>
                            </View>
                        </View>



                    </Card.Content>
                </Card>

                <View style={[styles.container, { flex: 1, marginBottom:4, flexDirection: 'row', justifyContent: "space-between", }]}>
                    <Text style={[styles.backgroundText, { marginLeft: 16 }]}>Order</Text>
                    <Text style={[styles.text, { marginRight: 16 }]}>Add Items</Text>
                </View>

                <View style={[styles.container, {flex: 15}]}>
                    <ScrollView>

                        <BillCard></BillCard>
                        <BillCard></BillCard>

                        <Divider style={styles.divider} horizontalInset='true' bold='true' />

                        <RecommendedOrderCard></RecommendedOrderCard>

                        <View>
                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 14 }]}>Subtotal</Text>
                                <Text style={[styles.backgroundText, { marginRight: 16, fontSize: 14 }]}>S$17.00</Text>
                            </View>
                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 14 }]}>Delivery fee</Text>
                                <Text style={[styles.backgroundText, { marginRight: 16, fontSize: 14 }]}>S$3.00</Text>
                            </View>
                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 14, textAlignVertical: 'center' }]}>Redeem 100 Hippo coins</Text>
                                <Switch style={[{ marginRight: 8 }]} />
                            </View>
                        </View>

                        <Divider style={styles.divider} horizontalInset='true' bold='true' />

                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <View style={[styles.container, { flexDirection: 'row' }]}>
                                <Button style={styles.iconPrimTint} icon={'ticket-percent-outline'}></Button>
                                <Text style={[styles.text, { marginLeft: 8, textAlignVertical: 'center' }]}>Hippo Voucher</Text>
                            </View>

                            <Button style={styles.iconPrimTint} icon={'chevron-right'}></Button>
                        </View>

                        <Divider style={styles.divider} horizontalInset='true' bold='true' />

                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <View style={[styles.container, { flexDirection: 'row' }]}>
                                <View style={[{ justifyContent: 'center' }]} >
                                    <Button style={styles.iconPrimTint} icon={'food-fork-drink'}></Button>
                                </View>

                                <Text style={[styles.backgroundText, { marginLeft: 8, textAlignVertical: 'center', fontSize: 14 }]}>Cutlery</Text>
                            </View>
                            <Switch style={[{ marginRight: 8 }]} />
                        </View>
                        <Text style={[styles.infoText, { marginHorizontal: 16, }]}>We won’t bring cutlery. Thanks for helping us to reduce waste.</Text>
                    </ScrollView>

                </View>

                <Divider style={styles.divider} horizontalInset='true' bold='true' />

                <View style={[styles.container, {flex: 3, marginBottom: 8}]}>

                    <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }]}>
                        <View style={[styles.container, { flexDirection: 'row' }]}>
                            <Text style={[styles.backgroundText, {}]}>Total</Text>
                            <Text style={[styles.infoText, { marginHorizontal: 4 }]}>(include GST)</Text>
                        </View>
                        <Text style={styles.text}>S$19.00</Text>
                    </View>

                    <Button style={[styles.button, { marginHorizontal: 16, borderRadius: 15 }]} android_ripple={{ color: 'white', borderless: false }}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </Button>

                </View>



            </View>

        </PaperProvider >
    );
}

const theme = {
    DefaultTheme,
    colors: {
        primary: styles.primColor,
        secondary: styles.secColor,
    },
};