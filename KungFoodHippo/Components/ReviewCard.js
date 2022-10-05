import React, {useState, useEffect} from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import {styles} from '../Styles.js'
import { View, Image, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const reviewsURL = "http://dip.totallynormal.website/getShopRating/3";

export function ReviewCard() {

    const [isLoading, setLoading] = useState(true);
    const [overall, setOverall] = useState();
    const [food, setFood] = useState();
    const [packaging, setPackaging] = useState();
    const [value, setValue] = useState();
    const [count, setCount] = useState();

    useEffect(() => {
        fetch(reviewsURL)
            .then((response) => response.json())
            .then((json) => {
                setOverall(json[0].overall);
                setFood(json[0].food);
                setPackaging(json[0].packaging);
                setValue(json[0].value);
                setCount(json[0].count);
                //console.log(food);
            })
            .catch((error) => alert(error))
            .finally(() => setLoading(false));
    }, []);

    return (

        <Card style={[styles.card, {marginBottom: 8, paddingHorizontal: 0, paddingVertical: 0}]}>
            <Card.Content>
                {isLoading ? (<ActivityIndicator/>) : (
                    <View>
                        <View style={{flexDirection: "row", paddingBottom: 6}}>
                            <Text style={{fontWeight: "bold", color: "#E76766", paddingRight: 10}}>Reviews</Text>
                            <Text style={{fontStyle: "italic", paddingLeft: 10}}>{count} ratings</Text>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 4}}>
                            <View style={{alignItems: "center"}}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={overall}
                                    maxValue={5}
                                    radius={32}
                                    title={overall}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={6}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={6}
                                />
                                <Text>Overall</Text>
                            </View>

                            <View  style={{alignItems: "center"}}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={food}
                                    maxValue={5}
                                    radius={32}
                                    title={food}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={6}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={6}
                                />
                                <Text>Food</Text>
                            </View>

                            <View style={{alignItems: "center"}}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={packaging}
                                    maxValue={5}
                                    radius={32}
                                    title={packaging}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={6}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={6}
                                />
                                <Text>Packaging</Text>
                            </View>

                            <View style={{alignItems: "center"}}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={value}
                                    maxValue={5}
                                    radius={32}
                                    title={value}
                                    titleFontSize={20}
                                    titleColor={'#000000'}
                                    inActiveStrokeColor={'#F5C2C2'}
                                    inActiveStrokeWidth={6}
                                    activeStrokeColor={'#E76766'}
                                    activeStrokeWidth={6}
                                />
                                <Text>Value</Text>
                            </View>
                            
                        </View>
                    
                    </View>
                )}
                
                
            </Card.Content>
        </Card>
    );
}