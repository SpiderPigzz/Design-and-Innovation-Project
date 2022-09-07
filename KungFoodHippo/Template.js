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
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();


export function TemplateScreen({ navigation }) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
        iosClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
        androidClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
        webClientId: '409793276708-3q6gqf67nek5gtiftjo9ojl9kklq0s3k.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}

            <Button
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            >LOGIN PLS</Button>
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