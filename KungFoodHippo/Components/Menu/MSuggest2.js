import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export function MSuggest2() {
    return (

        <Card style={styles.cardSec}>
            <View>

                <View style={{ marginVertical: 1, marginLeft: 2 , marginTop: 5}}>

                    <ImageBackground style={[styles.Image, { justifyContent: 'center'},{alignSelf:'center'}]} imageStyle={{ borderRadius: 10 }} source={require('../../assets/images/sushiexpress.png')}>

                    </ImageBackground>

                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={styles.textBold}>
                        SushiExpress
                    </Text>
                    
                    <Text style={styles.text}>
                        Japanese
                    </Text>
                    <Text style={styles.text}>
                        $1.70 Delivery Fee 
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
        width:120,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginLeft: 10,
        marginVertical: 8,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: '#FFEAEA' ,
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
        width: 100,
        height: 100,
    },

    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});
