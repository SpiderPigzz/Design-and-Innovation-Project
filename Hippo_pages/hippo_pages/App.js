import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
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
         description={"Don't know what to eat on campus? Try this!"}>
          
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.tooltip_name}>McDonald's</Text>
              <Text> NTU Students' Favorite Place</Text>
              <Image 
                style={styles.tooltip_image}
                source={require('./assets/mcd.jpg')}
              />
            </View>
          </View>
          <View style={styles.arrowBorder}/>
          <View sytle={styles.arrow}/>

        </Callout>

        </Marker>

        
    </MapView>
    
      </View>
      
  );
}



const styles = StyleSheet.create({
//added styles
  bubble: {
    flexDirection: 'column',
    alighSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
  },

  tooltip_name: {
    fontSize: 16,
    marginBottom: 5,
  },

  arrow:{
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
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
    width: 120,
    height: 80,
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
