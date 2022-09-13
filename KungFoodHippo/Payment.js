import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MaterialIcons, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Card, Title, Button, Paragraph, RadioButton } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import ProgressBarMultiStep from "react-native-progress-bar-multi-step";
import MapView from 'react-native-maps';


const tabs = [
  {
    title: 'Cart',
    pageNo: 1
    // onPress: e => console.log(e)
  },
  { title: 'CheckOut', pageNo: 2 },
  { title: 'Order Tracking', pageNo: 3 }
];

const Deliverytype = ({ name }) => {
  //const [type] = useState("delivery");

  return (
    <View>
      <TouchableOpacity
        style={styles.selected}>
        <Text style={styles.buttonText}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

export function PaymentScreen({ navigation }) {
  const [value, setValue] = React.useState('first');
  const [page, setPage] = useState(1);

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
        <View style={{ flexDirection: 'row' }}>
          <Deliverytype name="Contactless Delivery" type='delivery' />
          <Deliverytype name="Self Pick-up" type='pickup' />
        </View>
      </>
      <StatusBar style="auto" />

      <View style={styles.viewbox}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <MaterialIcons name="gps-fixed" size={24} color="#E76766" />
        <Text style={styles.header}>Delivery Address</Text>
        </View>
        <TouchableOpacity
          style={styles.edit}>
          <FontAwesome name="edit" size={25} color="#E76766" />
          <Text style={styles.selectedText}>Edit</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.mapbox}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: 1.348,
              longitude: 103.683,
              latitudeDelta: 0.00822,
              longitudeDelta: 0.00821,
            }}
            showsUserLocation={true} />
        </View>
        <Text style={styles.header}>Home</Text>
        <Text>Name</Text>
        <Text>Address</Text>
        <TouchableOpacity
          style={styles.add}>
          <Text style={styles.selectedText}>+ Add Delivery Instructions</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.payment}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Entypo name="wallet" size={26} color="black" />
            <Text style={styles.header}>Payment Method</Text>
          </View>
          <TouchableOpacity style={styles.edit2}>
            <FontAwesome name="edit" size={25} color="#E76766" />
            <Text style={styles.selectedText}>Edit</Text>
          </TouchableOpacity>
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch' }}>
        <View style={{ flexDirection: 'row' }}>
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
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    margin: 15,
    width: 150,
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  selected: {
    backgroundColor: "#E76766",
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 15,
    width: 150,
    elevation: 10,
    shadowColor: '#52006A',
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
    margin: 10,
    alignContent: 'flex-start',
    flexDirection: "column",
    elevation: 20,
    shadowColor: '#52006A',
  },
  mapbox: {
    margin: 10,
    borderRadius: 10,
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: "row"
  },
  map: {
    width: 275,
    height: 100,
  },
  payment: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 4,
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: "column",
    elevation: 20,
    shadowColor: '#52006A',

  },
  add: {
    backgroundColor: '#feeae9',
    marginTop: 10
  },
  edit: {
    backgroundColor: '#feeae9',
    flexDirection: 'row'
  },
  edit2: {
    backgroundColor: 'white',
    flexDirection: 'row',
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

export default App;
