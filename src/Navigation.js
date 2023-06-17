import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home/Home';
import Inspection from './Inspection/Inspection';
import Stay from './Stay/Stay';
import Move from './Move/Move';

import {ImageModal} from './ImageModal/ImageModal';
import Test from './Test';
import Search from './Search/Search';

const Stack = createNativeStackNavigator();

const Navigation = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Stay"
          component={Stay}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Move"
          component={Move}
          options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen
          name="Inspection"
          component={Inspection}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
