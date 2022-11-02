import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export function HalalCard() {
    return (

        <Card style={styles.cardSec}>
            <View>

                <View style={{ marginVertical: 4, marginLeft: 2 , marginTop: 10,}}>

                    <ImageBackground style={[styles.Image, { justifyContent: 'center'},{alignContent:'center'}]} imageStyle={{ borderRadius: 10 }} source={require('../../assets/images/halalfood.png')}>

                    </ImageBackground>

                </View>

                <View style={{ marginTop: 25 }}>
                    <Text style={styles.textBold}>
                        Halal Food{'\n'}
                    </Text>
                    
                    <Text style={styles.text}>
                        (Free delivery){'\n'}
                        Everyday up to{'\n'}
                        20% off
                    </Text>

                </View>



            </View>


        </Card>);
}



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        justifyContent: 'center',
    },

    textBold: {
        color: '#000',
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold"
    },

    text: {
        color: '#000',
        textAlign: "left",
        fontSize: 13,
    },

    dealText: {
        color: "#FFFFFF",
        textAlign: "left",
        fontSize: 8,
        fontWeight: "bold"
    },

    timeText: {
        color: "#000000",
        textAlign: "left",
        fontSize: 8,
        fontWeight: "bold"
    },

    button: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 0,
        backgroundColor: "#E76766",
        // fontFamily: "Roboto-Regular",
        borderRadius: 5,
    },

    buttonSec: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 0,
        backgroundColor: "#FFFFFF",
        // fontFamily: "Roboto-Regular",
        borderRadius: 5,
    },

    card: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#E76766",
        borderRadius: 5,
    },

    cardSec: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 8,
        elevation: 3,
        backgroundColor: "#fc9b95",
        borderRadius: 10

    },

    dealCard: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#E76766",
        borderRadius: 5,
        zIndex: 1
    },


    Image: {
        flex: 1,
        height: 120,
    },


    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});