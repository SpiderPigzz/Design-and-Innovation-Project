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
import { COLORS } from "../../constants/theme1";

const Button =({title, onPress=()=>{}}) =>{
    return(
        <TouchableOpacity
            onPress={onPress}
            style={{height:55, width:'100%', backgroundColor: COLORS.white,
            justifyContent:'center',
            alignItems:'center',
           }}>
            <Text style={{color:COLORS.primary, fontWeight:'Medium', fontSize: 15}}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;