import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeUser, OrderScreen, ProductDetails } from '../screens'

const stack = createStackNavigator();
export default function HomeUserStack() {
  return (
        <stack.Navigator screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
          <stack.Screen name='HomeUserSC' component={HomeUser}/>
          <stack.Screen name='ProductDetails' component={ProductDetails}/>
          <stack.Screen name='OrderScreen' component={OrderScreen}/>
        </stack.Navigator>
  )
}