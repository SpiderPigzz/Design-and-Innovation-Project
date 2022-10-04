import React, {useState, useEffect} from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, Text, Appbar, Snackbar, BottomNavigation, Button, Card, Title, Paragraph } from 'react-native-paper';
import {styles} from '../Styles.js'
import { View, Image, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const reviewsURL = "http://dip.totallynormal.website/getShopRating/3";

export function ReviewCard() {

    const [isLoading, setLoading] = useState(true);
    const [overall, setOverall] = useState([]);
    const [food, setFood] = useState([]);
    const [packaging, setPackaging] = useState([]);
    const [value, setValue] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        fetch(reviewsURL)
            .then((response) => response.json())
            .then((json) => {
                setOverall(json.overall);
                setFood(json.food);
                setPackaging(json.packaging);
                setValue(json.value);
                setCount(json.count);
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
                                    value={4.8}
                                    maxValue={5}
                                    radius={32}
                                    title={'4.8'}
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
                                    value={4.8}
                                    maxValue={5}
                                    radius={32}
                                    title={'4.8'}
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
                                    value={4.8}
                                    maxValue={5}
                                    radius={32}
                                    title={'4.8'}
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
                                    value={4.8}
                                    maxValue={5}
                                    radius={32}
                                    title={'4.8'}
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