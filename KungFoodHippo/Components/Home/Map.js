import * as React from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import FloatingButton from './FloatingButton'

export function Map2Screen({ navigation }) {

    return (
        <View style = {stylesM.container}>
            <Image
                source={require('../../assets/images/sushiexpress.png')}
                resizeMode="cover"
                style={{width:500, height:800, opcaity:0.5}}
            />
            <FloatingButton style={{ bottom: 100 }} />
        </View>

    );
}
const stylesM = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
})
