import { Icon } from 'react-native-elements';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import {styles} from '../../Styles.js'
import { StyleSheet, View, Image } from 'react-native';
import { RecommendedItemCard } from './RecommendedItemCard.js';

export function RecommendedOrderCard() {
    return (

        <Card style={[styles.card, {marginHorizontal:16, marginVertical:4,paddingVertical: 4,
            paddingHorizontal: 4,}]}>
            <Card.Content style={[styles.container, {justifyContent:'flex-start', backgroundColor:styles.secColor}]}>
                <View style={[styles.container, {flexDirection:'row', justifyContent:'flex-start', backgroundColor:styles.secColor}]}>
                    <Text style={[styles.backgroundText]}>People also ordered</Text>
                </View>

                <View style={[styles.container, {flexDirection:'row', justifyContent:'space-between', backgroundColor:styles.secColor}]}>
                    <RecommendedItemCard></RecommendedItemCard>
                    <RecommendedItemCard></RecommendedItemCard>
                    <RecommendedItemCard></RecommendedItemCard>
                </View>

                
            </Card.Content>
        </Card>);
}