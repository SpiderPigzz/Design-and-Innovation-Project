import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, ActivityIndicator, FlatList, Modal, TextInput } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Card, Title, Button, Paragraph, RadioButton, Divider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import ProgressBarMultiStep from "react-native-progress-bar-multi-step";
import MapView, { Animated, Callout, Marker, Polyline } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import { userContext } from './App.js';




const tabs = [
  {
    title: 'Cart',
    pageNo: 1
    // onPress: e => console.log(e)
  },
  { title: 'CheckOut', pageNo: 2 },
  { title: 'Order Tracking', pageNo: 3 }
];

export function PaymentScreen({ navigation, route }) {
  const [value, setValue] = React.useState('first');
  const [page, setPage] = useState(1);

  const [delivery, setDeliveryMethod] = useState(true);
  const [instructionVisible, setInstructionVisible] = React.useState(true);

  const [newAddress, setAddress] = React.useState(null);
  const [postalCode, setPostalCode] = React.useState(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [newAddressVisible, setNewAddressVisible] = useState();

  const [instruction, setInstruction] = React.useState(null);
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);
  const [newInstructionVisible, setNewInstructionVisible] = React.useState(false);

  const { userEmail, userName, userToken } = useContext(userContext);
  const [isLoading, setLoading] = useState(true);
  //const [orderData, setOrderData] = useState();
  const [customerName, setCustomerName] = useState();
  const [shopName, setShopName] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  const [shopAddress, setShopAddress] = useState();


  const { totalCheckout } = route.params;

  const getOrderFromDatabase = async () => {
    try {
      const response = await fetch('http://dip.totallynormal.website/getOrderAddress/' + userEmail);
      const json = await response.json();
      //setOrderData(json[0]);
      setCustomerName(json[0]['customer.name']);
      setShopName(json[0]['shop.name']);
      setCustomerAddress(json[0]['customer.address']);
      setShopAddress(json[0]['shop.address']);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrderFromDatabase();
  }, []);

  const toggle = () => {
    setDeliveryMethod(!delivery);
    setInstructionVisible(!instructionVisible);
  }

  return (

    <View style={[styles.container]}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Pressable
          onPress={toggle}
          style={({ pressed }) => [
            { backgroundColor: delivery ? '#E76766' : '#F9E6E6', elevation: delivery ? 5 : 0 },
            styles.button
          ]}>
          <Text style={{ fontWeight: delivery ? "bold" : "normal", fontSize: 16 }} >Delivery</Text>
        </Pressable>
        <Pressable
          onPress={toggle}
          style={({ pressed }) => [
            { backgroundColor: delivery ? '#F9E6E6' : '#E76766', elevation: delivery ? 0 : 5 },
            styles.button
          ]}>
          <Text style={{ fontWeight: delivery ? "normal" : "bold", fontSize: 16 }} >Pick Up</Text>
        </Pressable>
      </View>



      <Divider style={styles.divider} horizontalInset='true' bold='true' />

      <ScrollView style={{ alignSelf: 'stretch' }}>

        <View style={styles.viewbox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="gps-fixed" size={24} color="#E76766" />
              <Text style={[styles.header, { marginLeft: 4 }]}> {delivery ? 'Delivery Address' : 'Pick Up Address'} </Text>
            </View>
            <View>{delivery ? (
              <TouchableOpacity
                onPress={() => setAddressModalVisible(!addressModalVisible)}
                style={[styles.edit, { right: -10 }]}
              >
                <Button labelStyle={{ fontSize: 25 }} icon="square-edit-outline">
                  <Text style={styles.selectedText}>Edit</Text>
                </Button>

              </TouchableOpacity>) : null}
            </View>
          </View>



          <Modal
            multiline={true}
            animationType="fade"
            transparent={true}
            visible={addressModalVisible}
            onRequestClose={() => {
              setAddressModalVisible(!addressModalVisible);
            }}
          >
            <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }}>

              <View style={styles.modalView}>
                <TouchableOpacity
                  style={[styles.buttonNavigation, { alignSelf: 'flex-start' }]}
                  onPress={() => setAddressModalVisible(false)}
                >
                  <Image
                    source={require('./assets/Cross.png')}
                    style={{ height: 16, width: 16 }}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>Please input your new address:</Text>
                <TextInput
                  style={styles.addressInput}
                  onChangeText={setAddress}
                  value={newAddress}
                  placeholder="eg. 42 nanyang avenue"
                />
                <Text style={styles.modalText}>Please input the postal code:</Text>
                <TextInput
                  style={styles.addressInput}
                  onChangeText={setPostalCode}
                  value={postalCode}
                  //convert postal code to lat and long
                  placeholder="eg. 685478"
                  keyboardType='numeric'
                />
                <Pressable
                  style={[styles.modalButton]}
                  onPress={() =>
                    setAddressModalVisible(!addressModalVisible) +
                    setNewAddressVisible(newAddress)
                  }
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </Modal>


          <View style={styles.mapbox}>
            {delivery ? (
              newAddressVisible ? (
                <MapView
                //For Yijie to input map (Change Address)

                />
              ) : (<MapView style={styles.map}
                initialRegion={{
                  latitude: 1.348,
                  longitude: 103.683,
                  latitudeDelta: 0.00822,
                  longitudeDelta: 0.00821,
                }}
                showsUserLocation={true} >
                <Marker coordinate={{ latitude: 1.347, longitude: 103.682 }}
                  pinColor={"red"}
                  title={"Home"}
                  description={"Yes this is you"}>
                </Marker>
              </MapView>

              )
            ) : (
              <MapView
              //For Yijie to input map (Restaurant Address)
              />
            )
            }
          </View>


          <View>
            <Text style={styles.header}> {delivery ? (<Text> {newAddressVisible ? 'New Address' : 'Home'}</Text>) : 'Restaurant'} </Text>
            <View>
              {isLoading ? <ActivityIndicator /> : (
                <Text style={styles.smallText}> {delivery ? "  " + customerName : shopName} </Text> //This one need to get the value using json['key'] because the key got '.' so the phone is confused when you put data.customer.name
              )}
            </View>
            <View>
              {isLoading ? <ActivityIndicator /> : (
                <Text style={styles.smallText}> {delivery ? (<Text> {newAddressVisible ? newAddress : " " + customerAddress}</Text>) : shopAddress} </Text>
              )}
            </View>

          </View>



          <View>{instructionVisible ? (
            <TouchableOpacity
              style={styles.add}
              onPress={() => setInstructionModalVisible(true)}
            >
              <Text style={styles.selectedText}>
                {newInstructionVisible ? 'Instructions:' + instruction : '+ Add Delivery Instructions'}
              </Text>
            </TouchableOpacity>
          ) : null}
          </View>
        </View>



        <Modal
          animationType="fade"
          transparent={true}
          visible={instructionModalVisible}
          onRequestClose={() => {
            setInstructionModalVisible(!instructionModalVisible);
          }}
        >
          <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={[styles.buttonNavigation, { alignSelf: 'flex-start' }]}
                onPress={() => setInstructionModalVisible(false)}
              >
                <Image
                  source={require('./assets/Cross.png')}
                  style={{ height: 16, width: 16 }}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>Please input your instructions:</Text>
              <TextInput
                style={styles.instructionInput}
                onChangeText={setInstruction}
                value={instruction}
                placeholder="Intructions"
              />
              <Pressable
                style={[styles.modalButton]}
                onPress={() =>
                  setInstructionModalVisible(!instructionModalVisible) +
                  setNewInstructionVisible(true)
                }
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>



        <View style={styles.payment}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="wallet" size={20} color="black" />
            <Text style={[styles.header, { marginLeft: 8 }]}>Payment Method</Text>
          </View>
          <RadioButton.Group style={styles.radiogroup} onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={styles.radiobutton}>
              <RadioButton value="Credit Card" />
              <Text style={styles.smallText}>Credit Card</Text>
              <Image source={require('./assets/PayPal.png')} style={styles.icon} />
              <Image source={require('./assets/Mastercard.png')} style={styles.icon} />
              <Image source={require('./assets/Amex.png')} style={styles.icon} />
              <Image source={require('./assets/Visa.png')} style={styles.icon} />
            </View>
            <View style={styles.radiobutton}>
              <RadioButton value="Paylah!" />
              <Text style={styles.smallText}>Paylah!</Text>
              <Image source={require('./assets/Paylah.png')} style={styles.icon} />
            </View>
            <View style={styles.radiobutton}>
              <RadioButton value="Google Pay" />
              <Text style={styles.smallText}>Google Pay</Text>
              <Image source={require('./assets/GooglePay.png')} style={styles.icon} />
            </View>
          </RadioButton.Group>
        </View>

      </ScrollView>

      <Divider style={styles.divider} horizontalInset='true' bold='true' />

      <View style={{ marginBottom: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.backgroundText, {}]}>Total</Text>
            <Text style={[styles.infoText, { marginHorizontal: 4 }]}>(includes GST)</Text>
          </View>
          <Text style={styles.text}>{"S$"}{totalCheckout}</Text>
        </View>

        {/*<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch' }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.header}>Total</Text>
            <Text fontSize={20}>(include GST)</Text>
          </View>
          <Text style={styles.header}>S${totalCheckout}</Text>
        </View>*/}

        <TouchableOpacity
          style={styles.order}
          onPress={() => navigation.navigate('Cooking')}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  smallText: {
    fontSize: 15,
  },
  modalView: {
    flex: 0,
    margin: 20,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 20,
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
  modalText: {
    margin: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',

  },

  modalButton: {
    backgroundColor: "#E76766",
    marginTop: 16,
    padding: 14,
    height: 50,
    width: 120,
    //elevation: 10,
    //shadowColor: '#52006A',
    borderRadius: 15,
  },
  instructionInput: {
    height: 48,
    width: '100%',
    margin: 6,
    paddingLeft: 14,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 5,
    //textAlign: 'left'
  },
  addressInput: {
    height: 48,
    width: '100%',
    margin: 6,
    paddingLeft: 14,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 5,
  },
  topbar: {
    width: 375,
    height: 35,
    backgroundColor: "white",
    alignContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    //flexDirection: "column",
    //alignSelf: 'center'
  },
  button: {
    borderRadius: 30,
    margin: 10,
    width: 150,
    height: 50,
    padding: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: "white",
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  divider: {
    backgroundColor: '#b8b8b880',
    margin: 8,
    alignSelf: 'stretch'
  },
  selected: {
    backgroundColor: "#E76766",
    margin: 15,
    borderRadius: 20,
    width: 150,
    elevation: 10,
    shadowColor: '#52006A',
    height: 50,
    padding: 15,
  },
  selectedText: {
    color: "#E76766",
    fontSize: 15,
  },
  header: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewbox: {
    margin: 16,
    padding: 14,
    backgroundColor: "#feeae9",
    borderRadius: 10,
    //alignContent: 'flex-start',
    flexDirection: "column",
    elevation: 3,
    //shadowColor: '#52006A',
  },
  mapbox: {
    margin: 10,
    borderRadius: 10,
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexDirection: "row"
  },
  map: {
    width: 300,
    height: 150,
  },
  payment: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0000001A",
    //alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: "column",
    elevation: 3,
    //shadowColor: '#52006A',

  },
  add: {
    marginTop: 10

  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  order: {
    backgroundColor: "#E76766",
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 15,
    //width: 300,
  },
  cardSec: {
    marginTop: 20,
    paddingVertical: 60,
    paddingHorizontal: 180,
    marginHorizontal: 30,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 10
  },

  radiogroup: {
    flexDirection: "col",
  },

  radiobutton: {
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
  },

  icon: {
    flexDirection: "row",
    flexWrap: 'wrap',
    alignItems: 'center',
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },

  text: {
    color: "black",
    fontSize: 14,
    // fontFamily: "Roboto-Regular",
    fontWeight: "bold",
    textAlignVertical: 'bottom'
  },

  backgroundText: {
    color: "#000000",
    fontSize: 20,
    // fontFamily: "Roboto-Regular",
    fontWeight: "bold",
    textAlignVertical: 'bottom'
  },

  infoText: {
    color: "grey",
    fontSize: 12,
    // fontFamily: "Roboto-Regular",
    textAlignVertical: 'bottom'
  },

});


