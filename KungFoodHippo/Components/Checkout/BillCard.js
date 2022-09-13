import { Icon } from 'react-native-elements';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { styles } from '../../Styles.js'
import { StyleSheet, View, Image } from 'react-native';

export function BillCard() {
    return (

        <Card style={[styles.cardSec, { marginHorizontal: 16 }]}>
            <Card.Content style={[styles.container, { justifyContent: 'flex-start' }]}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                    <Text style={[styles.backgroundText]}>Value Meal</Text>
                    <Button style={styles.iconPrimTint} icon='application-edit-outline'></Button>
                    <Text style={[styles.text]}>Edit</Text>
                </View>

                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={[styles.container, { flexDirection: 'row',}]}>
                        <Image source={require('../../assets/food-sample-image.jpeg')} style={[styles.imageIcon]}></Image>
                        <Text style={[styles.backgroundText, { fontWeight: 'normal', fontSize: 10, textAlignVertical: 'top', marginHorizontal: 8 }]}>1 Pasta{'\n'}3 Garlic</Text>
                    </View>

                    <Text style={[styles.text, { textAlignVertical: 'top' }]}>S$17.00</Text>
                </View>


            </Card.Content>
        </Card>);
}