import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer } from 'react-native-paper';
import { styles } from './Styles.js'
import { HippoCard } from './Components/TestCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

export function DemoScreen({ navigation }) {
    const [buttonText, setButtonText] = useState('Click');
    function handleClick() {
        setButtonText('New text');
    }

    return (
        <PaperProvider theme={theme}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Title" />
                <Appbar.Action icon="calendar" onPress={() => { }} />
                <Appbar.Action icon="magnify" onPress={() => { }} />
            </Appbar.Header>


            <SafeAreaView style={styles.container}>


                <Text style={styles.text}>{buttonText}</Text>
                <Button style={styles.button} android_ripple={{ color: 'white', borderless: false }} onPress={() => handleClick()}>
                    <Text style={styles.buttontext}>TEST</Text>
                </Button>

                <Card flex={1} style={styles.card}>
                    <Card.Content>
                        <Paragraph style={styles.paragraph}>
                            React Native Card View for Android and IOS using
                            "react-native-elements"
                        </Paragraph>
                    </Card.Content>
                </Card>
                <HippoCard flex={10}></HippoCard>
            </SafeAreaView>
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