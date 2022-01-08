import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import SearchScreen from './Screens/SearchScreen';
import ColorSchema from './utils/ColorSchema';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home Screen">
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Search Screen"
          component={SearchScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: ColorSchema.Black3,
            },
            headerTintColor: ColorSchema.White1,
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
