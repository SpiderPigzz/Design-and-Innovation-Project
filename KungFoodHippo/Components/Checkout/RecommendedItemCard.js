import { Icon } from 'react-native-elements';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { styles } from '../../Styles.js'
import { StyleSheet, View, Image } from 'react-native';


export function RecommendedItemCard() {
    return (

        <Card style={[styles.cardSec, { marginHorizontal: 2, marginTop: 4,
            paddingVertical: 0,
            paddingHorizontal: 0}]}>
            <Card.Content style={[{ justifyContent: 'center' }]}>
            <Text style={[styles.backgroundText, {alignSelf:'center', fontSize:10}]}>Crispy Chicken</Text>
            <View style={[{flexDirection:'row'}]}>

            <Image source={require('../../assets/food-sample-image.jpeg')} style={[styles.imageIcon, {width: 35, height:30, borderRadius: 2}]}></Image>
            <Text style={[styles.infoText, {fontSize:6, color:'#878787'}]}>S$4.50</Text>

            </View>
            
            </Card.Content>
        </Card>);
}