import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';


const FloatingButton = (input) => {

  return (
    <Provider>
        <FAB
        visible={input.setVisibility}
          style={{position: 'absolute',                                          
          bottom: 10,                                                    
          right: 10,}}
          position= 'absolute' 
          icon={'cart'}
          onPress={() => {
            input.navigation.navigate('Checkout');
          }}
        /></Provider>
  );
};

export default FloatingButton;