import { View, Text, ScrollView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AwaitingConFirm, AwaitingDelivery, AwatingGoods, SuccsesScreen } from "../screens";

const Tab = createMaterialTopTabNavigator();
const TopTabNavigation = () => {
  return (
    <View style={[{flex: 1}]}>
      <View className='justify-center items-center bg-slate-300' style={[{height: "0%", }]}>
        <Text className='text-white font-bold text-base'>Trạng thái đơn hàng</Text>
      </View>
      <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#FF5678",
        },
        tabBarActiveTintColor: "#FF5678",
        tabBarInactiveTintColor: "gray",
        tabBarShowIcon: true,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 150,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          textTransform: "none",
        },
        style: {
          // backgroundColor: ,
        },
        
      }}
    >
      <Tab.Screen
        name="AwaitingConfirm"
        component={AwaitingConFirm}
        options={{
          tabBarLabel: "Chờ xác nhận",
        }}
      />
      <Tab.Screen
        name="Awaiting Goods"
        component={AwatingGoods}
        options={{
          tabBarLabel: "Chờ lấy hàng",
        }}
      />
      <Tab.Screen
        name="Awaiting Delivery"
        component={AwaitingDelivery}
        options={{
          tabBarLabel: "Chờ giao hàng",
        }}
      />
      <Tab.Screen
        name="Succses"
        component={SuccsesScreen}
        options={{
          tabBarLabel: "Giao hàng thành công",
        }}
      />
    </Tab.Navigator>
    </View>
  );
};
export default TopTabNavigation;
