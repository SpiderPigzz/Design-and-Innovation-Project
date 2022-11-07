import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export function VeganCard() {
    return (

        <Card style={styles.cardSec}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ paddingVertical: 10 }}>

                        <Text style={styles.textBold}>
                            Vegan
                        </Text>

                        <View style={{ marginTop: 10 }}>

                            <Text style={styles.text}>
                                Salads and{'\n'}
                                others 15% off
                            </Text>
                        </View>
                    </View>
                    
                    <View style={{ alignSelf: 'center', marginLeft: 4 }}>

                        <ImageBackground style={[styles.Image, { justifyContent: 'center' }]} imageStyle={{ borderRadius: 10 }} source={require('../../assets/images/veganfoodv1.png')}>

                        </ImageBackground>

                    </View>

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
        //paddingVertical: 8,
        padding: 14,
        marginLeft: 12,
        marginBottom: 4,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#e2a8b7",
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
        width: 70,
        height: 70,
        //marginLeft:20,


    },


    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});