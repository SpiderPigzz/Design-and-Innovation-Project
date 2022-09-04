import { Icon } from 'react-native-elements';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import {styles} from '../../Styles.js'
import { StyleSheet, View, Image } from 'react-native';

export function RecommendedOrderCard() {
    return (

        <Card style={[styles.card, {marginHorizontal:16, marginVertical:4,}]}>
            <Card.Content style={[styles.container, {justifyContent:'flex-start', backgroundColor:styles.secColor}]}>
                <View style={[styles.container, {flexDirection:'row', justifyContent:'flex-start', backgroundColor:styles.secColor}]}>
                    <Text style={[styles.backgroundText]}>People also odered</Text>
                </View>

                <View style={[styles.container, {flexDirection:'row', justifyContent:'space-between', backgroundColor:styles.secColor}]}>
                    <Image source={require('../../assets/food-sample-image.jpeg')} style={[styles.imageIcon]}></Image>
                    <Image source={require('../../assets/food-sample-image.jpeg')} style={[styles.imageIcon]}></Image>
                    <Image source={require('../../assets/food-sample-image.jpeg')} style={[styles.imageIcon]}></Image>
                </View>

                
            </Card.Content>
        </Card>);
}