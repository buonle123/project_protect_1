import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import ItemCart from "../../components/ItemCart";
import Ionicon from "react-native-vector-icons/Ionicons";
import { CartProduct } from "../../context/context";
const { width, height } = Dimensions.get("window");

export default function ShoppingCartScreen({ navigation }) {
  const { cart, setCart } = CartProduct();
  const [selectType, setSelectType] = useState("Tất cả");
  const updateSelectType = (it) => {
    setSelectType(it);
  };
  useEffect(() => {
    setAmount(() => {
      let amount = 0;
      cart.forEach((item, i) => {
        amount += item.product.priceNew * item.quantity;
      });
      return amount;
    });
  }, [cart]);
  const [totalAmount, setAmount] = useState(() => {
    let amount = 0;
    cart.forEach((item, i) => {
      amount += item.product.priceNew * item.quantity;
    });
    return amount;
  });
  const renderCart = () => {
    if (cart.length == 0) {
      return (
        <View className="items-center justify-center w-full h-full my-5">
          <Image
            className="w-60 h-60"
            source={require("../../assets/null.png")}
          />
        </View>
      );
    } else {
      return cart.map((item, i) => {
        return (
          <ItemCart
            product={item}
            id={item.id}
            amount={totalAmount}
            setAmount={setAmount}
            navigation={navigation}
          />
        );
      });
    }
  };

  const buy = () => {
    const c = {
      cart: cart,
      totalAmount: totalAmount,
    };
    console.log(c);
    navigation.navigate("OrderScreen", { CartItem: c });
  };

  return (
    <View className="flex-1">
      <View
        style={{ width: width }}
        className="flex-row items-center justify-center h-5 p-2 bg-slate-400 "
      ></View>

      <View style={{ height: height * 0.93 }} className="">
        <View className="flex-row items-center justify-between w-full my-5">
          <Text className="ml-5 text-lg font-medium">Cart</Text>
          <TouchableOpacity
            className="mr-5"
            onPress={() => {
              navigation.navigate("SettingUser", { screen: "Buy" });
            }}
          >
            <Ionicon name="cart-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View className="w-11/12 mx-auto h-4/5 rounded-xl" style={[]}>
          <ScrollView style={[{ height: "90%" }]}>{renderCart()}</ScrollView>

          {totalAmount > 0 && (
            <TouchableOpacity
              className="h-full mt-4 bg-orange-400 rounded-xl"
              style={{ width: "100%", height: "10%" }}
              onPress={() => {
                buy();
              }}
            >
              <Text className="my-auto text-xl font-medium text-center text-white">
                Mua ngay: {totalAmount.toLocaleString("en-US")}₫
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  shadow: {
    shadowColor: "rgb(115, 115, 115)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
});
