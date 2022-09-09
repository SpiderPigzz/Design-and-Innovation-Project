import { ScrollView } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import {styles} from '../Styles.js'

export function CategoriesCard() {
    return (
        <ScrollView>
            <Card style={styles.cardSec}>
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={require('../assets/images/foodDeliveryRect.png')} style={styles.button} />
            <Card.Cover source={require('../assets/images/food_delivery.png')} />
            
        </Card>
        </ScrollView>
        
    );
}