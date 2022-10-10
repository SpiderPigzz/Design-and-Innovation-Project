import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import MapView, { Animated, Callout, Marker,Polyline } from 'react-native-maps';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { markers } from './mapData';
import {WebView} from 'react-native-webview';
import { FAB, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';
import * as Progress from 'react-native-progress';
import { decay } from 'react-native-reanimated';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

const origin = {latitude: 1.335, longitude: 103.683};
const destination = {latitude: 1.329, longitude:103.625 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyC5TVAWgFHBs_ABdfzbsgzHbdJJecaQiO0';
const url = 'http://dip.totallynormal.website/';
const path = "listShop";

export function MapScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url + path)
        .then((response) => response.json())
        .then((json) => {
          for (var i = 0; i < json.length; i++) {
            json[i]['address'] = 'http://dip.totallynormal.website/getShop/' + json[i]['ID'];
            // console.log(json[i]['address'])
            console.log(json[i]['description'])
        }
        setData(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <Marker coordinate = {{latitude: 1.347,longitude: 102.682}}
         pinColor = {"red"}
         title={item.name}
         description={item.description}/>
  );

  return (  
  <View style={styles.container}>

            {isLoading ? (<ActivityIndicator />) : (
              // <View>
              //   <FlatList
              //   data={data}
              //   keyExtractor={({ id }, index) => id}
              //   renderItem={({ item }) => (
              //     <Text>{item.name}</Text>
              //   )}
              //   />
              //   </View>

              <MapView
                  style={styles.map}
                  initialRegion={{
                  latitude: 1.348,
                  longitude: 103.683,
                  latitudeDelta: 0.00822,
                  longitudeDelta: 0.00821,
                }}
                showsUserLocation={true}
                followsUserLocation={true}>
                  
                    <FlatList
                      data={data}
                      keyExtractor={({ id }, index) => id}
                      renderItem={({ item }) => (
                        <Marker coordinate = {{latitude: 1.347,longitude: 103.682}}
                          pinColor = {"red"}
                          title={item.name}
                          description={item.description}/>
                      )}
                    />

                </MapView>
                
                
                
                )
            }
     
    <MapView
          style={styles.map}
          initialRegion={{
          latitude: 1.348,
          longitude: 103.683,
          latitudeDelta: 0.00822,
          longitudeDelta: 0.00821,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          >

            

       <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#D60665"
          optimizeWaypoints={true}
          mode = 'DRIVING'
          timePrecision='now'
        />



       <Marker coordinate = {{latitude: 1.347,longitude: 103.682}}
         pinColor = {"red"}
         title={"McDonald's"}
         description={"Don't know what to eat on campus? Try this!"}>
          
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.tooltip_name}>Fat Bob Thai Food</Text>
              <View
                style={{
                  borderBottomColor: '#FCD077',
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.tooltip_description}>Bob's Favorite Place</Text>

              <View>
                    <WebView style={{ height: 120 , width: 250, }} source={{uri: 'https://travelandleisureasia.com/wp-content/uploads/2021/10/Thai-Dishes.png'}} />
              </View>


            </View>
          </View>
          <View style={styles.arrowBorder}/>
          <View sytle={styles.arrow}/>
        </Callout>
      </Marker>

      <Marker coordinate = {{latitude: 1.344,longitude: 103.681}}
         pinColor = {"red"}
         title={"McDonald's"}
         description={"Don't know what to eat on campus? Try this!"}>
          
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.tooltip_name}>71 Connect</Text>
              <View
                style={{
                  borderBottomColor: '#FCD077',
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.tooltip_description}>Grab a Coffee, Cool Dog</Text>
              
              <View>
                    <WebView style={styles.tooltip_image} source={{uri: 'https://www.tastingtable.com/img/gallery/20-different-types-of-coffee-explained/intro-1659544996.jpg'}} />
              </View>

              
            </View>
          </View>
          <View style={styles.arrowBorder}/>
          <View sytle={styles.arrow}/>
        </Callout>
      </Marker>

      

      <Marker coordinate = {{latitude: 1.349,longitude: 103.683}}
         pinColor = {"red"}
         title={"McDonald's"}
         description={"Don't know what to eat on campus? Try this!"}>
          
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.tooltip_name}>McDonald's</Text>
              <View
                style={{
                  borderBottomColor: '#FCD077',
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.tooltip_description}>NTU Students' Favorite Place</Text>
              {/* <Image 
                style={styles.tooltip_image}
                source={require('./assets/mcd.jpg')}
              /> */}

              <View>
                    <WebView style={styles.tooltip_image} source={{uri: 'https://cdn.foodadvisor.com.sg/uploads/images/image_default_5625f71ea9013077.jpg'}} />
              </View>
          </View>
          </View>
          <View style={styles.arrowBorder}/>
          <View sytle={styles.arrow}/>
        </Callout>
      </Marker>
    </MapView>
    
    
    <FAB
      icon="arrow-left"
      style={styles.fab}
      onPress={() => console.log('Pressed')}
    />

    
  <View
    style={{
      position: 'absolute',
      bottom: 20,
      left:10,
      right:10,
      alignItems:'flex-start',
      justifyContent:'center',
      backgroundColor: 'rgba(255, 255, 255, 0.99)',
      borderRadius:10,
    }}>
      <Text style={{padding:10, color:'grey', fontSize:16}}>Estimated Arrival</Text>
      
      <View style={{flexDirection:'column', alignItems:'flex-start', paddingLeft:10}}>
      <Text style={{paddingBottom:10, color:'black',fontSize:30, fontWeight:'bold'}}>45-55 Minutes</Text>  
      <Progress.Bar 
              size={30} 
              style={styles.ProgressBar}
              indeterminate={true}
              width={200}
              borderWidth={3}
              height={10}
              borderRadius={10}
              animationType='timing'
              color="#D60665"
        />
        <Text style={{padding:20}}>Your order from 71 Connect is on it's way!</Text>
  
        </View>
      
    </View>
    
</View>

      
  );
}



const styles = StyleSheet.create({
//added styles
  deliverycard:{
    backgroundColor: 'black',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: 20,
    backgroundColor:'#D60665',
    borderRadius: 30,
  },
  ProgressBar:{
    position:'relative',
  },
  bubble: {
    flexDirection: 'column',
    alighSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#D60665',
    borderWidth: 0.5 ,
    padding: 5,
    elevation: 2,
  },

  tooltip_name: {
    fontSize: 16,
    marginBottom: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    color: "#D60665",
  },

  tooltip_description: {
    fontSize: 14,
    marginBottom: 5,
    alignItems: 'center',
    color: 'black',
  },

  arrow:{
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
    elevation: 40,
    shadowColor: '#fff',
  },


  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#E76766',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },

  tooltip_image: {
    width: 250,
    height: 120,
    resizeMode: 'cover',
    flexDirection:'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    elevation: 10,
    borderRadius: 10,
    padding: 2,
  },

  scroll_card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 220,
    width: Dimensions.get("window")*0.8,
    overflow: "hidden",
  },

  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },

  textContent: {
    flex: 2,
    padding: 10,
  },

  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },

  cardDescription: {
    fontSize: 12,
    color: "#444",
  },

//added styles
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

text: {
    marginTop: 8,
    paddingVertical: 8,
    color: "#E76766",
    textAlign: "center",
    fontSize: 30,
    // fontFamily: "Roboto-Regular",
    fontWeight: "bold"
},

buttontext: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    // fontFamily: "Roboto-Regular",
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
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
    borderWidth: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 5
},

primColor: "#E76766",

secColor: "#E76766"
});
