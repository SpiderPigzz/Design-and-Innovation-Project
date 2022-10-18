import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';


const FloatingButton = (input) => {

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
        <FAB.Group
        visible={input.setVisibility}
          style={{position: 'absolute',                                          
          bottom: 10,                                                    
          right: 10,}}
          open={open}
          position= 'absolute' 
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'cart',
              label: 'Cart',
              onPress: () => {input.navigation.navigate('Checkout')},
            },
            {
              icon: 'heart',
              label: 'Favourites',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'chat',
              label: 'Hippo Bot',
              onPress: () => console.log('Pressed bot'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              
            }
          }}
        /></Provider>
  );
};

export default FloatingButton;