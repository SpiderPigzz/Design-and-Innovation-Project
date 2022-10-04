import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProgressBarMultiStep from "react-native-progress-bar-multi-step";
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

const tabs = [
    {
      title: 'Cart', pageNo: 1,
      // onPress: e => console.log(e)
      //onPress:() => navigation.navigate('Home')
    },
    { title: 'CheckOut', pageNo: 2 },
    { title: 'Order Tracking', pageNo: 3 }
  ];

export function CheckoutScreen({ navigation }) {

    const [value, setValue] = React.useState('first');
    const [page, setPage] = useState(1);

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}
            <View style={[styles.container, {backgroundColor:'white'}]}>
            <Appbar.Header style={theme.topbar}>
          <Appbar.Action icon="close" onPress={() => { }} />
          <Appbar.Content style={{fontWeight: "bold" }} title="Checkout"/>
        </Appbar.Header>
        <ProgressBarMultiStep
          progressive={true}
          page={page}
          setPage={setPage}
          tabs={tabs}
          circleStyle={{ width: 25, height: 25 }}
          lineStyle={{ width: 80 }}
          finishedBackgroundColor='#E76766'
          inProgressBackgroundColor='grey'
        />
        </View>
            <View style={[styles.container, {flex:1, flexDirection: 'column', justifyContent:'space-between'}]}>
                <Card style={[styles.cardSec, { margin: 16, flex: 0}]}>
                    <Card.Content>
                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                            <Image source={require('./assets/scooter-icon.png')} style={[styles.imageIcon, {}]}></Image>
                            <View style={[styles.container, {}]}>
                                <Text style={[styles.backgroundText, { fontWeight: 'normal' }]}>Estimated Delivery</Text>
                                <Text style={[styles.text, { fontWeight: 'bold', color:'black' }]}>ASAP (35 mins)</Text>
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

                        <Divider style={styles.divider} horizontalInset='true' bold='true' />
                        <View>
                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 16 }]}>Subtotal</Text>
                                <Text style={[styles.backgroundText, { marginRight: 16, fontSize: 16 }]}>S$17.00</Text>
                            </View>
                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 16 }]}>Delivery fee</Text>
                                <Text style={[styles.backgroundText, { marginRight: 16, fontSize: 16 }]}>S$3.00</Text>
                            </View>
                            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <Text style={[styles.backgroundText, { marginLeft: 16, fontSize: 16, textAlignVertical: 'center' }]}>Redeem 100 Hippo coins</Text>
                                <Switch style={[{ marginRight: 8 }]} />
                            </View>
                        </View>

                        <Divider style={styles.divider} horizontalInset='true' bold='true' />

                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <View style={[styles.container, { flexDirection: 'row' }]}>
                                <Button style={styles.iconPrimTint} labelStyle={{fontSize: 35}} icon={'ticket-percent-outline'}></Button>
                                <Text style={[styles.text, { marginLeft: 8, textAlignVertical: 'center' }]}>Hippo Voucher</Text>
                            </View>

                            <Button style={styles.iconPrimTint} icon={'chevron-right'}></Button>
                        </View>

                        <Divider style={styles.divider} horizontalInset='true' bold='true' />

                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <View style={[styles.container, { flexDirection: 'row' }]}>
                                <View style={[{ justifyContent: 'center' }]} >
                                    <Button style={styles.iconPrimTint}labelStyle={{fontSize: 35}} icon={'food-fork-drink'}></Button>
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
    topbar: {
        width: 400,
        height: 35,
        backgroundColor: "white", 
      },
};