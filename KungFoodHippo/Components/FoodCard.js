import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import {styles} from '../Styles.js'
import { StyleSheet, View, Image } from 'react-native';

export function FoodCard() {
    return (

        <Card style={styles.cardSec}>
            <Card.Content style={[styles.container, { justifyContent: 'flex-start'}]}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between'}]}>
                    <View style={[styles.container, {justifyContent: 'flex-start'}]}>
                        <Text style={[styles.backgroundText]}>Value Meal</Text>
                        <Text style={[styles.backgroundText, {fontWeight: 'normal', fontSize: 12, textAlignVertical: 'top'}]}>
                            1 pasta, 1 soup with 3pcs of {'\n'} Garlic bread and 1 can drink
                        </Text>
                        <Text style={[styles.backgroundText, {fontWeight: 'bold', fontSize: 14, textAlignVertical: 'bottom'}]}>S$17.00</Text>
                    </View>

                    <Image source={require('../assets/Pastamania-meal1.png')} style={[styles.imageIcon, {width: 90, height: 90}]}></Image>
                    
                </View>
                
            </Card.Content>
        </Card>);
}