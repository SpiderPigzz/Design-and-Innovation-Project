import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as React from 'react';

export default function App() {
  return (
      <View style={styles.container}>
        {/* <MapView 
          style={styles.map} 
          initialRegion={{
            latitude: 1.348,
            longitude: 103.683,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
        }}> */}
          {/* <MapView.Marker 
           coordinate = {{latitude: 1.346, longtitude:103.684}}/> */}

        {/* </MapView> */}

        <MapView
          style={styles.map}
          initialRegion={{
          latitude: 1.348,
          longitude: 103.683,
          latitudeDelta: 0.00822,
          longitudeDelta: 0.00821,
        }}
    >
        <Marker coordinate = {{latitude: 1.347,longitude: 103.682}}
         pinColor = {"red"}
         title={"McDonald's"}
         description={"Don't know what to eat on campus? Try this!"}/>
    </MapView>
    
      </View>
      
  );
}



const styles = StyleSheet.create({

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
