import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Explore from './screens/Explore';
import Bookmark from './screens/bookmark';
import ComicDetail from './screens/DetailKomik';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import IsiChapter from './screens/IsiChapter';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigator= ()=>{
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'search';
          } else if (route.name === 'Bookmark') {
            iconName = 'bookmark';
          }
          return (
          <FontAwesome5
          name={iconName}
          size={size}
          color={focused ? 'red' : color}
          />
          );
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text style={{ marginBottom: 10, color: focused ? 'red' : color }}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ unmountOnBlur: true,headerShown : false }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{ unmountOnBlur: true,headerShown : false}}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{unmountOnBlur: true,headerShown : false }}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
  
      <Stack.Navigator>
        
         <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DetailKomik" component={ComicDetail} />
        <Stack.Screen name="IsiChapter" component={IsiChapter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;