import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, ActivityIndicator, FlatList, Pressable, Modal, TouchableOpacity } from 'react-native';
import MapView, { Animated, Callout, Marker, Polyline } from 'react-native-maps';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { markers } from './mapData';
import { WebView } from 'react-native-webview';
import { FAB, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { userContext } from './App.js';
import MapViewDirections from 'react-native-maps-directions';
import * as Progress from 'react-native-progress';
import { decay } from 'react-native-reanimated';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

//const origin = { latitude: 1.335, longitude: 103.683 };
const destination = { latitude: 1.329, longitude: 103.625 };

const GOOGLE_MAPS_APIKEY = 'AIzaSyC5TVAWgFHBs_ABdfzbsgzHbdJJecaQiO0';
const url = 'http://dip.totallynormal.website/';
const orderAddressPath = "getOrderAddress/";
const coordinatePath = "getOrderLocation/";
const convertor = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const key = '&key=AIzaSyC5TVAWgFHBs_ABdfzbsgzHbdJJecaQiO0';

const orderAddress = 'http://dip.totallynormal.website/getOrderLocation/'



// convetor + 'item.address' + key
export function MapScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([]);
  var locationArray = [];
  const [modalVisible, setModalVisible] = useState(false);
  const [listShops, setListShop] = useState({});
  const [shouldShow, setShouldShow] = useState(true);
  const [homeAddress, setHomeAddress] = useState({});
  const { userEmail, userName, userToken } = useContext(userContext);
  const isFocused = useIsFocused();

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const getMapData = async () => {
    await fetch(url + orderAddressPath + userEmail)
      .then((response) => response.json())
      .then(async (json) => {
        await fetch(convertor + json[0]['customer.address'] + key)
          .then((addressResponse) => addressResponse.json())
          .then((convertedAddress) => {
            setHomeAddress(convertedAddress['results'][0]['geometry']['location']);
            console.log(convertedAddress['results'][0]['geometry']['location'])
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        setData(json[0]['shop.name']);
        console.log(json);
        return json
        // console.log(json);
      })
      .then(async (json) => {
        // for (var i = 0; i < json.length; i++) {
        //   var location = await fetch(convertor + json[i]['address'].replace('#', '') + key)
        //   .then((response) => {
        //     return response.json()})
        //   .then((googleJson) =>{
        //     locationArray.push(googleJson['results'][0]['geometry']['location']);
        //   })
        // setData([json]))
        //}
        await fetch(url + coordinatePath + userEmail)
          .then((response) => response.json())
          .then((json) => {
            setPosition(json);
            return json
            // console.log(json);
          })


        //return (locationArray);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false)
      });
  }
  //for extracting address
  useEffect(() => {
    if (isFocused) {
      getMapData();
    }
    setShouldShow(true);
    setModalVisible(false);
  }, [isFocused]);

  // useEffect(() => {
  //   fetch(convertor + data[0]['address'] + key)
  //     .then((response) => response.json())
  //     .then((convetedAddress) => {
  //       setData([convetedAddress]);
  //       console.log(convertedAddress)
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  const DeliveryStatus = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 10,
          right: 10,
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.99)',
          borderRadius: 10,
          padding: 16,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: "column", alignItems: 'flex-start' }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>Estimated Arrival</Text>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>45-55 Minutes</Text>
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
          </View>
  
          <Pressable
            // style={[styles.button, styles.buttonOpen]}
            onPress={() => { setModalVisible(true), setShouldShow(false) }}>
            <View style={{ padding: 10, }}>
              <Image style={{ paddingTop: 10, resizeMode: 'cover', height: 100, width: 100, }}
                source={require('./assets/images/delivery.gif')} />
            </View>
          </Pressable>
  
        </View>
  
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 10 }}>
          <Text style={{ padding: 5, paddingLeft: 0, fontSize: 16, fontStyle: 'italic' }}>{userName}, Your order is on it's way!</Text>
        </View>
  
      </View>
  
    );
  };

  return (
    <View style={styles.container}>

      {isLoading ? (<ActivityIndicator />) : (
        <MapView
          style={styles.map}
          key={isLoading}
          onMapReady={isLoading}
          initialRegion={{
            latitude: 1.348,
            longitude: 103.683,
            latitudeDelta: 0.00822,
            longitudeDelta: 0.00821,
          }}
          showsUserLocation={true}
          followsUserLocation={true}>
          {data.map((shop, index) => {
            try {
              return (
                <Marker coordinate={{ latitude: position[index]["lat"], longitude: position[index]["long"] }}
                  key={shop}
                  pinColor={"red"}
                  title={shop}
                  description={shop}>
                  <Callout tooltip
                    onPress={() => navigation.navigate('Listing')}>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.tooltip_name}>{shop}</Text>
                        <View
                          style={{
                            borderBottomColor: '#FCD077',
                            borderBottomWidth: 1,
                          }}
                        />
                        <Text style={styles.tooltip_description}>{shop.description}</Text>
                        <View>
                          <WebView style={styles.tooltip_image} source={{ uri: 'https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000' }}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View sytle={styles.arrow} />
                  </Callout>
                </Marker>
              )
            }
            catch {

            }
          })}

          <Marker coordinate={{ latitude: homeAddress["lat"], longitude: homeAddress["lng"] }}
            pinColor={"green"}>
          </Marker>

          {/* <Marker coordinate={{ latitude: 1.344, longitude: 103.681 }}
            pinColor={"red"}
            title={"McDonald's"}
            description={"Don't know what to eat on campus? Try this! NTU students' favorite."}>
            <Callout tooltip
              onPress={() => navigation.navigate('Listing')}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.tooltip_name}>71 Connect</Text>
                  <View
                    style={{
                      borderBottomColor: '#FCD077',
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text style={styles.tooltip_description}>Believe the power of coffee!☕ Student-Owned Cafe At NTU With Lor Bak And Gyudon Bowls From $7</Text>
                  <View>
                    <WebView style={styles.tooltip_image} source={{ uri: 'https://www.tastingtable.com/img/gallery/20-different-types-of-coffee-explained/intro-1659544996.jpg' }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.arrowBorder} />
              <View sytle={styles.arrow} />
            </Callout>
          </Marker>

          <Marker coordinate={{ latitude: 1.349, longitude: 103.683 }}
            pinColor={"red"}
            title={"McDonald's"}
            description={"Don't know what to eat on campus? Try this! NTU students' favorite."}>
            <Callout tooltip
              onPress={() => navigation.navigate('Listing')}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.tooltip_name}>McDonald's</Text>
                  <View
                    style={{
                      borderBottomColor: '#FCD077',
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text style={styles.tooltip_description}>NTU Students' Favorite Place.😁🐔 No need to say more you know a big Mac can make your day.</Text>
                  <View>
                    <WebView style={styles.tooltip_image} source={{ uri: 'https://cdn.foodadvisor.com.sg/uploads/images/image_default_5625f71ea9013077.jpg' }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.arrowBorder} />
              <View sytle={styles.arrow} />
            </Callout>
          </Marker>

          <Marker coordinate={{ latitude: 1.2797723975657078, longitude: 103.8415368190478 }}
            pinColor={"green"}
            title={"McDonald's"}
            description={"Don't know what to eat on campus? Try this! NTU students' favorite."}>
            <Callout tooltip
              onPress={() => navigation.navigate('Listing')}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.tooltip_name}>Unagi Tei Japanese Restaurant</Text>
                  <View
                    style={{
                      borderBottomColor: '#FCD077',
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text style={styles.tooltip_description}>Japan Food Cllectionが運営する、和食店 Did you know that eel is good for preventing summer fatigue? 🤫Charcoal-grilled eel has crispy skin and fluffy flesh. Let's eat eel and become energeti</Text>
                  <View>
                    <WebView style={styles.tooltip_image} source={{ uri: 'https://2.bp.blogspot.com/-52pT1gIWghE/Wd7bTfkofMI/AAAAAAAAaXY/RbwZLyWDckM-c9Lxf8mtMDttq6TZIZstACLcBGAs/s1600/Man%2BMan%2BUnagi%2BDUO%2BGalleria%2B13.JPG' }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.arrowBorder} />
              <View sytle={styles.arrow} />
            </Callout>
          </Marker> */}

          {position.map((shop, index) => {
            try {

              if (position.length > 0 && position != null) {
                if (index > 0) {
                  return (
                    <MapViewDirections
                      origin={{ latitude: position[index - 1]["lat"], longitude: position[index - 1]["long"] }}
                      destination={{ latitude: position[index]["lat"], longitude: position[index]["long"] }}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={5}
                      strokeColor="#F194FF"
                      optimizeWaypoints={true}
                      mode='DRIVING'
                      timePrecision='now'
                    />
                  )
                }

                else if (index == 0) {
                  console.log(position[0]);
                  return (
                    <MapViewDirections
                      origin={{ latitude: homeAddress["lat"], longitude: homeAddress["lng"] }}
                      destination={{ latitude: position[index]["lat"], longitude: position[index]["long"] }}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={5}
                      strokeColor="#F194FF"
                      optimizeWaypoints={true}
                      mode='DRIVING'
                      timePrecision='now'
                    />
                  );
                }
              }
            }
            catch {

            }
          }
          )}

          {/* <MapViewDirections
            origin={{ latitude: homeAddress["lat"], longitude: homeAddress["lng"] }}
            destination={{ latitude: position[0]["lat"], longitude: position[0]["long"] }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#F194FF"
            optimizeWaypoints={true}
            mode='DRIVING'
            timePrecision='now'
          /> */}

          {/* <MapViewDirections
            origin={{ latitude: 1.34415, longitude: 103.6800792 }}
            destination={{ latitude: 1.3542608, longitude: 103.6876753 }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#F194FF"
            optimizeWaypoints={true}
            mode='DRIVING'
            timePrecision='now'
          />

          <MapViewDirections
            origin={{ latitude: 1.3542608, longitude: 103.6876753 }}
            destination={{ latitude: 1.3576474, longitude: 103.8824703 }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#F194FF"
            optimizeWaypoints={true}
            mode='DRIVING'
            timePrecision='now'
          /> */}

        </MapView>
      )
      }

      <TouchableOpacity
        style={[styles.buttonNavigation, { position: "absolute", left: 16, top: 8 }]}
        activeOpacity={0.85}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('./assets/ArrowLeft.png')}
          style={[styles.iconPrimTint, { height: 18, width: 18, }]}
        />
      </TouchableOpacity>

      {/*<FAB
        color='#E76766'
        icon="arrow-left"
        style={styles.fab}
        onPress={() => navigation.goBack()}
      />*/}
      {shouldShow ? <DeliveryStatus/> : null}

          
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}>
              <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }}>
                <View style={styles.modalView}>
                  <Image style={{ paddingTop: 10, resizeMode: 'cover', height: 100, width: 100, }}
                    source={require('./assets/images/thumbsupgif.gif')} />
                  <Text style={styles.modalText}>Your delivery is here! 😘</Text>
                  <Text style={styles.modalText}>Thanks for shopping with Hippo</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { setModalVisible(!modalVisible), navigation.navigate('Home') }}>
                    <Text style={styles.textStyle}>Go to Home</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          

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
    textAlign: "center",
    fontSize: 16,
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
    marginVertical: 4,
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

  buttonNavigation: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    width: 42,
    height: 42,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
    elevation: 5,
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

  iconPrimTint: {
    tintColor: "#E76766",
  },

  primColor: "#E76766",

  secColor: "#E76766"
});
