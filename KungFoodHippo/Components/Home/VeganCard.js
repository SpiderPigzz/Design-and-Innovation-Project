import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export function VeganCard() {
    return (

        <Card style={styles.cardSec}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 50 }}>

                        <Text style={styles.textBold}>
                            Vegans
                        </Text>
                    </View>
                    <View style={{  alignContent: 'center',marginTop:9 }}>

                        <ImageBackground style={[styles.Image, { justifyContent: 'space-between' }]} imageStyle={{ borderRadius: 10 }} source={require('../../assets/images/veganfoodv1.png')}>

                        </ImageBackground>

                    </View>

                </View>


                <View style={{ marginTop:3}}>

                    <Text style={styles.text}>
                        Salads and others
                    </Text>
                    <Text style={styles.text}>
                        15% off
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
        fontSize: 12,
        fontWeight: "bold"
    },

    text: {
        color: '#000',
        textAlign: "left",
        fontSize: 12,
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
        width: 149,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginLeft: 10,
        marginVertical: 8,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "#85C0FC",
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
        width: 50,
        height: 50,
        marginLeft:20,
    },


    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});