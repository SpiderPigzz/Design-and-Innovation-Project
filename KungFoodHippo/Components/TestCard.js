import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import {styles} from '../Styles.js'

export function HippoCard() {
    return (

        <Card style={styles.cardSec}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={require('../assets/KFH.png')} style={styles.button} />
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>);
}