import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  OnBoardingScreen,
  LoginScreen,
  RegisterScreen,
  ForgetScreen,
  ChangePassScreen,
} from "../screens";
import User from "./User";
import { AuthContext } from "../store/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import AdminDrawer from "./AdminDrawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

function AuthStack() {
  const [skipped, setSkipped] = useState(false);
  async function skipInit() {
    const skip = await AsyncStorage.getItem("Skipped");
    setSkipped(skip === "true");
  }
  useEffect(() => {
    skipInit();
  }, [skipInit, skipped]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!skipped && (
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      )}
      <Stack.Screen name="Admin" component={AdminDrawer} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
      <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
    </Stack.Navigator>
  );
}
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={User} />
    </Stack.Navigator>
  );
}
function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Admin" component={AdminDrawer} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const authContext = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState(false);
  async function retriveData() {
    try {
      const data = await AsyncStorage.getItem("KeepLogged");
      setIsLogged(data);
    } catch (error) {}
  }
  useEffect(() => {
    retriveData();
  }, []);
  return (
    <NavigationContainer>
      {authContext.isAuthenticated || isLogged ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
