import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export function CardTitle() {
    return (

        <Card style={styles.cardSec}>
            <View>
                <View style={{alignSelf:'center'}}>
                    <Text style={styles.text}>
                        Because you have eaten 
                    </Text>
                    <Text style={[styles.text,{alignSelf:'center'}]}>
                        Genkin sushi ... 
                    </Text>
                </View>
            </View>
        </Card>);
}



export const styles = StyleSheet.create({
   
    textBold: {
        color: '#FFF',
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold"
    },

    text: {
        color: '#FFF',
        textAlign: "left",
        fontSize: 20,
    },

    cardSec: {
        borderRadius: -10,
        width:'100%',
        bottom:25,
        paddingVertical: 8,
        backgroundColor: '#E76766' ,
        flexDirection: 'row',
    },

    primColor: "#E76766",

    secColor: "#E76766"

});