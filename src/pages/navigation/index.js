import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@ui-kitten/components';
import Home from '../home';
import Splash from '../splash';
import FlashScreen from '../home/flashScreen';
import BlankScreen from '../home/blankScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const IsSecure = WrappedComponent => {
  return class ComponentHelper extends Component {
    render() {
      return (
        <View style={{flex: 1}}>
          <WrappedComponent {...this.props} />
        </View>
      );
    }
  };
};

function TabBottom() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'BULB',
          tabBarIcon: () => (
            <Icon
              name="bulb-outline"
              fill="#8F9BB3"
              style={{
                width: 32,
                height: 32,
              }}
            />
          ),
          tabBarLabelStyle: {fontSize: 12},
        }}
      />
      <Tab.Screen
        name="FlashScreen"
        component={FlashScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'SCREEN',
          tabBarIcon: () => (
            <Icon
              name="smartphone"
              fill="#8F9BB3"
              style={{
                width: 32,
                height: 32,
              }}
            />
          ),
          tabBarLabelStyle: {fontSize: 12},
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={IsSecure(Splash)}
        options={{
          headerMode: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={IsSecure(TabBottom)}
        options={{
          headerMode: false,
        }}
      />
      <Stack.Screen
        name="BlankScreen"
        component={IsSecure(BlankScreen)}
        options={{
          headerMode: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
