import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { SIZES, COLORS, FONTS } from './constants/theme1';
import * as Font from 'expo-font';
import { useState } from 'react';
import { DrawerActions, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Surface, Title, Paragraph, Drawer, shadow, Portal, Provider } from 'react-native-paper';
import { CardTitle } from './Components/Suggestion/CardTitle.js';
import { RamenCard } from './Components/Suggestion/RamenCard.js';
import { AjiyaCard } from './Components/Suggestion/AjiyaCard.js';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { colors } from 'react-native-elements';
import { IchibanCard } from './Components/Suggestion/IchibanCard';
import { MakisanCard } from './Components/Suggestion/MakisanCard';
import { JinjiaCard } from './Components/Suggestion/JinjiaCard';
import { SExpressCard } from './Components/Suggestion/SExpressCard';
import FloatingButton from './Components/Home/FloatingButton'
export function SuggestionScreen({ navigation }) {
    const [value, setValue] = useState()
    function updateSearch(value) {
        console.log(value);
    }

    return (
        
        <SafeAreaView style={style1.container}>
            <FloatingButton/>
            <CardTitle></CardTitle>
            <View style={{ marginTop: 15 }}>
                <RamenCard></RamenCard>
            </View>
            <View style={{ marginTop: 15 }}>
                <IchibanCard></IchibanCard>
            </View>

            <View style={{ marginHorizontal: 20 }}>
                <Text style={style1.textBold}>
                    More of what you like
                </Text>
            </View>
            
            <ScrollView
                horizontal={true} showsHorizontalScrollIndicator={false}>
                <MakisanCard></MakisanCard>
                <AjiyaCard></AjiyaCard>
                <JinjiaCard></JinjiaCard>
                <SExpressCard></SExpressCard>
            </ScrollView>
            
        </SafeAreaView>
        // <PaperProvider theme={theme}>
        //   <View style={style.searchBoxWrapper}>
        //         <TextInput placeholder={'Search for shops and restaurants'}/>
        //         <Image source={require('./assets/images/search.png')}/>
        ///     </View>

        //   </PaperProvider>
    );
}
const style1 = StyleSheet.create({
    
    container: {
        backgroundColor: '#fff',
        flex: 10,
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});
//const theme = {
   // DefaultTheme,
   // colors: {
  //      primary: styles.primColor,
  ////      secondary: styles.secColor,
  //  },
//};
