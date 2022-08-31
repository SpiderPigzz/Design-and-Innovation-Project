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

export function TemplateScreen({ navigation }) {
    return (
        <PaperProvider theme={theme}>
            {/* START WRITING CODE BELOW!!!! */}

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