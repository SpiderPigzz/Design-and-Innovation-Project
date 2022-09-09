import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Icon } from "react-native-elements";
import { SIZES, COLORS, FONTS } from '../constants/theme1';
export default function Homepage() {
    return (
        <View style={{ flexDirection: "row", height: '50' }}>
            <TouchableOpacity>
                style={{
                    width: 50,
                    paddingLeft: SIZES.paddingLeft * 2,
                    justifyContent: 'center',

                }}
                <Image
                    source={nearby}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

});