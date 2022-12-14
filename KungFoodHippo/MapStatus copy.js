import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView} from 'react-native';
import MapView, { Animated, Callout, Marker,Polyline } from 'react-native-maps';
import * as React from 'react';
import { markers } from './mapData';
import {WebView} from 'react-native-webview';
import { FAB } from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 1.335, longitude: 103.683};
const destination = {latitude: 1.329, longitude:103.625 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyC5TVAWgFHBs_ABdfzbsgzHbdJJecaQiO0';
//this File is for displaying map status (no routing)
export function MapScreen({ navigation }) {
    

  return (
    
  <View style={styles.container}>
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
          mode = 'Driving'
          timePrecision='now'
        />

      {/* <Polyline
          coordinates={[
            { latitude: 1.331, longitude: 103.681 },
            { latitude: 1.332, longitude: 103.682 },
            { latitude: 1.333, longitude: 103.683 },
            { latitude: 1.334, longitude: 103.684 },
            { latitude: 1.335, longitude: 103.685 },
            { latitude: 1.337, longitude: 103.686 }
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeWidth={6}
          interval={10}
        /> */}

        {/* <AnimatedPolyline 
          coordinates={[
            { latitude: 1.335, longitude: 103.683 },
            { latitude: 1.325, longitude: 103.653 },
            { latitude: 1.338, longitude: 103.685 },
          ]}
          interval={10} 
        /> */}

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
    
    {/* <Animated.ScrollView>
      <Text numberOfLines={1} style={styles.cardtitle}>Hi</Text>
    </Animated.ScrollView> */}
    <FAB
    icon="arrow-left"
    style={styles.fab}
    onPress={() => console.log('Pressed')}
    />

</View>



      
  );
}



const styles = StyleSheet.create({
//added styles
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: 20,
    backgroundColor:'#D60665',
    borderRadius: 30,
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
    flex: 1,
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
