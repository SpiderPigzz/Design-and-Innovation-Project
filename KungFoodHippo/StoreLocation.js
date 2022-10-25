import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, ActivityIndicator, FlatList, Pressable, Modal } from 'react-native';
import MapView, { Animated, Callout, Marker, Polyline } from 'react-native-maps';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { markers } from './mapData';
import { WebView } from 'react-native-webview';
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

const origin = { latitude: 1.335, longitude: 103.683 };
const destination = { latitude: 1.329, longitude: 103.625 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyC5TVAWgFHBs_ABdfzbsgzHbdJJecaQiO0';
const url = 'http://dip.totallynormal.website/';
const path = "listShop";
const convertor = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const key = '&key=AIzaSyC5TVAWgFHBs_ABdfzbsgzHbdJJecaQiO0';

// convetor + 'item.address' + key
export function StoreLocationScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([]);
  var locationArray = [];
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  const { shopAddress, shopID, shopName, shopDescription } = route.params;


  //for extracting address
  useEffect(() => {
    getAddress();
  }, [shopAddress]);

  const getAddress = async () => {
    fetch(convertor + String(shopAddress).replace('#', '') + key)
      .then((response) => response.json())
      .then((json) => {
        console.log(shopAddress);
        console.log(json['results'][0]['geometry']['location']);
        setPosition([json['results'][0]['geometry']['location']]);
        return json
        // console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false)
      });
  };

  return (
    <View style={styles.container}>

      {isLoading ? (<ActivityIndicator />) : (
        <MapView
          style={styles.map}
          key={isLoading}
          initialRegion={{
            latitude: position[0]["lat"],
            longitude: position[0]["lng"],
            latitudeDelta: 0.00822,
            longitudeDelta: 0.00821,
          }}
          showsUserLocation={true}
          followsUserLocation={true}>
          {
            
              position.map(positions => {
                return (
                  <Marker coordinate={{ latitude: positions["lat"], longitude: positions["lng"] }}
                    key={shopID}
                    pinColor={"red"}
                    title={shopName}
                    description={shopDescription}>
                    <Callout tooltip
                      onPress={() => navigation.goBack()}>
                      <View>
                        <View style={styles.bubble}>
                          <Text style={styles.tooltip_name}>{shopName}</Text>
                          <View
                            style={{
                              borderBottomColor: '#FCD077',
                              borderBottomWidth: 1,
                            }}
                          />
                          <Text style={styles.tooltip_description}>{shopDescription}</Text>
                          <View>
                            <WebView style={styles.tooltip_image} source={{ uri: 'https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000' }}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.arrowBorder} />
                      <View sytle={styles.arrow} />
                    </Callout>
                  </Marker>)
              })
            }
      
            </MapView>)}



      <FAB
        color='#E76766'
        icon="arrow-left"
        style={styles.fab}
        onPress={() => navigation.navigate('Store', {shopID: shopID})}
      />

      </View>



  );
}



const styles = StyleSheet.create({
  //added styles

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    flex: 0,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#E76766",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16
  },

  fab: {
    position: 'absolute',
    margin: 10,
    left: 0,
    top: 20,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  ProgressBar: {
    position: 'relative',
  },
  bubble: {
    flexDirection: 'column',
    alighSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#D60665',
    borderWidth: 0.5,
    padding: 5,
    elevation: 2,
  },

  tooltip_name: {
    fontSize: 16,
    marginBottom: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    color: "#D60665",
    width: 250,
  },

  tooltip_description: {
    fontSize: 12,
    marginBottom: 5,
    alignItems: 'center',
    color: 'black',
    width: 250,
  },

  arrow: {
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
    flexDirection: 'column',
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
    width: Dimensions.get("window") * 0.8,
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
