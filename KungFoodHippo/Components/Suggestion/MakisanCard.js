import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export function MakisanCard() {
    return (

        <Card style={styles.cardSec}>
            <View style={{alignSelf:'center'}}>

                <View style={{ marginVertical: 1, marginLeft: 2 , marginTop: 5}}>

                    <ImageBackground style={[styles.Image, { justifyContent: 'center'},{alignSelf:'center'}]} imageStyle={{ borderRadius: 10 }} source={require('../../assets/images/makisan.png')}>
                    </ImageBackground>
                </View>

                <View style={{ marginTop: 5, alignSelf:'center' }}>
                    <Text style={styles.textBold}>
                        Makisan
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
        fontSize: 13,
        fontWeight: "bold"
    },

    text: {
        color: '#000',
        textAlign: "left",
        fontSize: 12,
    },

    cardSec: {
        width:'30%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginLeft: 10,
        marginVertical: 20,
        borderWidth: 0,
        backgroundColor: '#FFF' ,
        borderRadius: 10,
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