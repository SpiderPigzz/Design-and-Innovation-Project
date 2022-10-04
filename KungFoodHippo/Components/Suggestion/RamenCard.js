import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export function RamenCard() {
    return (

        <Card style={styles.cardSec}>
            <View>
                <View style={{ marginTop: 5}}>

                    <ImageBackground style={[styles.Image, { marginLeft:20},{alignSelf:'center'}]} imageStyle={{ borderRadius: 3 }} source={require('../../assets/images/ramenjw.png')}>
                    </ImageBackground>
                </View>

                <View style={{marginLeft:20, marginTop: 10}}>
                    <Text style={styles.textBold}>
                        Takagi Ramen(Jurong West)
                    </Text>
                    <Text style={styles.text}>
                        $15 Japanese
                    </Text>
                </View>
            </View>
        </Card>);
}



export const styles = StyleSheet.create({
   
    textBold: {
        color: '#000',
        textAlign: "left",
        fontSize: 15,
        fontWeight: "bold"
    },

    text: {
        color: '#716767',
        textAlign: "left",
        fontSize: 12,
    },

    cardSec: {
        width:'100%',
        bottom:25,
        paddingVertical: 8,
        backgroundColor: '#E76766' ,
        flexDirection: 'row',
        alignSelf:'center',
        backgroundColor: '#FFF' ,
        borderRadius: -10,
    },
    Image: {
        
        width: '95%',
        height: 110,
    },


    cardAlign: {
        flexDirection: 'row',
    },
    primColor: "#E76766",

    secColor: "#E76766"

});