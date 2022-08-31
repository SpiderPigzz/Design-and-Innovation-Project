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
import { TemplateScreen } from './Template.js';
import { DemoScreen } from './Demo.js';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';


export default function KungFoodHippo() {
  const [active, setActive] = React.useState('');

  return (

    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Menu.Navigator initialRouteName="Home">
          <Menu.Screen name="Home" component={TemplateScreen} />
          <Menu.Screen name="Notifications" component={DemoScreen} />
          <Menu.Screen name="Hello" component={DemoScreen} />
        </Menu.Navigator>
      </NavigationContainer>

    </PaperProvider>

    
  );
}


const Menu = createDrawerNavigator();


const theme = {
  DefaultTheme,
  colors: {
    primary: styles.primColor,
    secondary: styles.secColor,
  },
};


