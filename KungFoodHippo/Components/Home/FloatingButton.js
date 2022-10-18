import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
// import {useNavigation} from '@react-navigation/native';

const FloatingButton = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  // const navigation = useNavigation();
  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
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
              onPress: () => navigation.navigate('Home'),
              // console.log('Pressed cart'),
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
        />
      </Portal>
    </Provider>
  );
};

export default FloatingButton;