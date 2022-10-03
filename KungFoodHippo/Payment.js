import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, ActivityIndicator, FlatList, Modal, TextInput } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Card, Title, Button, Paragraph, RadioButton, Divider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import ProgressBarMultiStep from "react-native-progress-bar-multi-step";
import MapView from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';

const url = 'http://dip.totallynormal.website/listCustomer';
const path = "listCustomer";

const tabs = [
  {
    title: 'Cart',
    pageNo: 1
    // onPress: e => console.log(e)
  },
  { title: 'CheckOut', pageNo: 2 },
  { title: 'Order Tracking', pageNo: 3 }
];

export function PaymentScreen({ navigation }) {
  const [value, setValue] = React.useState('first');
  const [page, setPage] = useState(1);

  const [delivery, setDeliveryMethod] = useState(true);
  const [instructionVisible, setInstructionVisible] = React.useState(true);
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getFromDatabase = async () => {
    try {
      const response = await fetch('http://dip.totallynormal.website/listCustomer');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFromDatabase();

  }, []);

  const toggle = () => {
    setDeliveryMethod(!delivery);
    setInstructionVisible(!instructionVisible);
  }

  return (
    <View style={[styles.container]}>
      <>
        <Appbar.Header style={styles.topbar}>
          <Appbar.Action icon="close" onPress={() => { }} />
          <Appbar.Content title="Checkout" />
        </Appbar.Header>
        <ProgressBarMultiStep
          progressive={true}
          page={page}
          setPage={setPage}
          tabs={tabs}
          circleStyle={{ width: 25, height: 25 }}
          lineStyle={{ width: 80 }}
          finishedBackgroundColor='#E76766'
          inProgressBackgroundColor='grey'
        />
        <View style={{
          flexDirection: 'row',
        }}>
          <Pressable
            onPress={toggle}
            style={({ pressed }) => [
              { backgroundColor: delivery ? '#E76766' : '#F9E6E6' },
              styles.button
            ]}>
            <Text>Delivery</Text>
          </Pressable>
          <Pressable
            onPress={toggle}
            style={({ pressed }) => [
              { backgroundColor: delivery ? '#F9E6E6' : '#E76766' },
              styles.button
            ]}>
            <Text>Pick Up</Text>
          </Pressable>
        </View>
      </>


      <Divider style={styles.divider} horizontalInset='true' bold='true' />

      <ScrollView style={{ alignSelf: 'stretch' }}>

        <View style={styles.viewbox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <MaterialIcons name="gps-fixed" size={24} color="#E76766" />
              <Text style={styles.header}> {delivery ? 'Delivery Address' : 'Pick Up Address'} </Text>
            </View>
            <View>{delivery ? (
              <TouchableOpacity
                onPress={() => (true)}
                style={styles.edit}
              >
                <FontAwesome name="edit" size={25} color="#E76766" />
                <Text style={styles.selectedText}>Edit</Text>
              </TouchableOpacity>) : null
            }
            </View>
          </View>
          <View style={styles.mapbox}>
            {delivery ? (
              <MapView style={styles.map}
                initialRegion={{
                  latitude: 1.348,
                  longitude: 103.683,
                  latitudeDelta: 0.00822,
                  longitudeDelta: 0.00821,
                }}
                showsUserLocation={true} />
            ) : (
              <MapView
              //For Yijie to input map (Restaurant Address)
              />
            )
            }
          </View>


          <View>
            <Text style={styles.header}> {delivery ? 'Home' : 'Restaurant'} </Text>
            <Text> Name</Text>
            <Text> {delivery ? 'Home Address' : 'Restaurant Address'} </Text>

            <View>
              {isLoading ? <ActivityIndicator /> : (
                <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <Text>{item.name}, {item.address}</Text>
                  )}
                />
              )}
            </View>

          </View>



          <View>{instructionVisible ? (
            <TouchableOpacity
              style={styles.add}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.selectedText}>+ Add Delivery Instructions</Text>
            </TouchableOpacity>
          ) : null}
          </View>
        </View>


        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {

              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Please input your instructions:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="Intructions"
                  keyboardType="numeric"
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>


        <View style={styles.payment}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Entypo name="wallet" size={20} color="black" />
              <Text style={styles.header}>Payment Method</Text>
            </View>
          </View>
          <RadioButton.Group style={styles.radiogroup} onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={styles.radiobutton}>
              <RadioButton value="Credit Card" />
              <Text>Credit Card</Text>
              <Image source={require('./assets/PayPal.png')} style={styles.icon} />
              <Image source={require('./assets/Mastercard.png')} style={styles.icon} />
              <Image source={require('./assets/Amex.png')} style={styles.icon} />
              <Image source={require('./assets/Visa.png')} style={styles.icon} />
            </View>
            <View style={styles.radiobutton}>
              <RadioButton value="Paylah!" />
              <Text>Paylah!</Text>
              <Image source={require('./assets/Paylah.png')} style={styles.icon} />
            </View>
            <View style={styles.radiobutton}>
              <RadioButton value="Google Pay" />
              <Text>Google Pay</Text>
              <Image source={require('./assets/GooglePay.png')} style={styles.icon} />
            </View>
          </RadioButton.Group>
        </View>

      </ScrollView>

      <Divider style={styles.divider} horizontalInset='true' bold='true' />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch' }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'baseline'
        }}>
          <Text style={styles.header}>Total</Text>
          <Text fontSize={20}>(include GST)</Text>
        </View>
        <Text style={styles.header}>S$100.00</Text>
      </View>

      <TouchableOpacity
        style={styles.order}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  topbar: {
    width: 375,
    height: 35,
    backgroundColor: "#E76766",
    alignContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    alignSelf: 'center'
  },
  button: {
    borderRadius: 20,
    margin: 20,
    width: 150,
    height: 50,
    padding: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: "black",
    textAlign: 'center',
  },
  buttonTouchable: {
    padding: 10,
    backgroundColor: "#F9E6E6",
    width: 120,
    height: 40,
    borderRadius: 30,
    flexDirection: 'column',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20
  },
  divider: {
    backgroundColor: '#b8b8b880',
    margin: 6,
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
  },
  header: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 20
  },
  viewbox: {
    padding: 10,
    backgroundColor: "#feeae9",
    borderRadius: 10,
    margin: 16,
    alignContent: 'flex-start',
    flexDirection: "column",
    elevation: 20,
    shadowColor: '#52006A',
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
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 16,
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: "column",
    elevation: 20,
    shadowColor: '#52006A',

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
    padding: 15,
    borderRadius: 25,
    margin: 5,
    width: 300,
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
});


