import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import CircleStatus from "./Status/CircleStatus";

const OrderStatus = ({ active }) => {
  const status = [
    {
      icon: "cart-outline",
      label: "Đặt hàng",
      dots: "...........",
      type: active === 1 || active === 2 || active === 3 || active === 4,
    },
    {
      icon: "man-outline",
      label: "Thông tin đặt hàng",
      dots: "...........",
      type: active === 2 || active === 3 || active === 4,
    },
    {
      icon: "card-outline",
      label: "Thanh toán",
      dots: "...........",
      type: active === 3 || active === 4,
    },
    {
      icon: "chevron-down-circle-outline",
      label: "Hoàn tất đặt hàng",
      dots: "",
      type: active === 4,
    },
  ];

  return (
    <View style={styles.container}>
      {status.map((item, index) => {
        return (
          <CircleStatus
            key={index}
            icon={item.icon}
            label={item.label}
            dots={item.dots}
            active={item.type}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    backgroundColor: "#c8daf0",
    height: 70,
    width: "100%",
    padding: 10,
    flexDirection: "row",
  },
});
export default OrderStatus;
