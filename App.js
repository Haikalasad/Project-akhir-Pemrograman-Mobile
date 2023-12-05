import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import ComicDetail from './screens/DetailKomik';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
  
      <Stack.Navigator>
        <Stack.Screen
          name="ComicList"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ComicDetail" component={ComicDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
