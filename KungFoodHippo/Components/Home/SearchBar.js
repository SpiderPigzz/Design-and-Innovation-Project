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
//import { styles } from "../Styles.js";

export default function Searchbar({ value, updateSearch, style}){
    const [query, setQuery] = React.useState();
    const [error, setError] = React.useState("Text String");
    

    return(
        <View style={[styles.container, style]}>
            <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                    <Image 
                        style={styles.icSearch}
                        source={require('../assets/Images/search.png')}/>
                </View>

                <TextInput
                    value={query}
                    placeholder='Search for shops and restaurants'
                    style={styles.textInput}
                    onChangeText={(text)=>{
                        var letters = /^$|^[a-zA-Z._\b ]+$/;
                        if(text.length>12)
                            setError("Query too long.")
                        else if(text.match(letters)){
                            setQuery(text)
                            updateSearch(text)
                            if (error)
                                setError(false)
                        }
                        else
                            setError("Please only enter alphabets")
                    }}
                />
                {
                    query?
                        <TouchableOpacity>
                            onPress = {()=>setQuery('')}
                            style={styles.vwClear}
                                <Image
                                    style={styles.icClear}
                                    source={require('../assets/Images/clear.png')}/>
                        </TouchableOpacity>
                        :<View style={styles.vwClear}/>
                }
            </View>
            {
                error &&
                <Text style={styles.txtError}>
                    {error}
                </Text>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    txtError:{
        marginTop:'2%',
        width:'89%',
        color:'black',
    },
    vwClear:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center',
    },
    textInput:{
        flex:1,
       // textAlign:'center',
       // backgroundColor:'green',
    },
    vwSearch:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'red',
    },
    
    icSearch:{
        height:18, width:18,
    },
    icClear:{
        height:50, width:18,
    },
    searchContainer:{
        backgroundColor:'white',
        width:'90%',
        height: 40,
        flexDirection:'row'
    },
    container:{
        height:80,
        alignItems:'center',
    },
});