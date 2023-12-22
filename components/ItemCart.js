import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment/src/moment";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Swipeable } from "react-native-gesture-handler";
import { CartProduct } from "../context/context";

const ItemCart = ({ product, id, amount, setAmount, navigation }) => {
  const { cart, setCart } = CartProduct();

  const p = product.quantity * product.product.priceNew;
  const price = p.toLocaleString("en-US");

  const [quant, setQuantity] = useState(1);

  moment.locale("vi");
  const t = new Date();

  const [check, setCheck] = useState(false);

  // const day = t.getDay(), month = t.getMonth() + 1, year = t.getFullYear(), hour = t.getHours(), mi = t.getMinutes();
  // const fullTime = `${day}/${month}/${year} ${hour}:${mi}`

  const [showItem, setShowItem] = useState(false);

  const deleteItemCart = (i) => {
    console.log(cart[0].id);
    const vt = cart.findIndex((item) => {
      return item.id == i;
    });
    let list = [...cart];
    list.splice(vt, 1);
    setCart(list);
    console.log(vt);
    navigation.reset({
      index: 0,
      routes: [{ name: "ShoppingCart" }],
    });
  };

  const right = () => {
    return (
      <View className="items-center justify-center w-1/4 h-full">
        <TouchableOpacity
          className="items-center justify-center w-20 h-20 rounded-xl"
          key={id}
          style={[st.shadow]}
          onPress={() => {
            deleteItemCart(id);
          }}
        >
          <Text className="text-base font-semibold text-red-500">Hủy đơn</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const editQuantity = (i) => {
    const q = quant + i;
    if (q == 0) {
      return;
    } else if (q > product.product.quantity) {
      return;
    } else {
      const list = [...cart];
      setQuantity(q);
      product.quantity = q;
      const findIndexx = cart.findIndex((it, i) => {
        return it.id == id;
      });
      list.splice(findIndexx, 1, product);
      setCart(list);
      console.log(id);
    }
    // console.log(`${quant}+${i} = ${quant+i} ${quant} ${q}`);
    // console.log(cart[0]);
  };

  useEffect(() => {
    const list = [...cart];
    setAmount(() => {
      let amount = 0;
      list.forEach((item, i) => {
        amount += item.product.priceNew * item.quantity;
      });
      return amount;
    });
  }, [cart, editQuantity]);

  return (
    <Swipeable renderRightActions={right} key={id}>
      <View
        className="flex-row justify-between px-2 py-3 mx-auto my-5 rounded-xl"
        style={[st.shadow, { width: "95%" }]}
      >
        {/* <View className='items-center justify-center' style={[{width:"15%"}]}>
                    <TouchableOpacity className="items-center justify-center w-10 h-10 bg-white" style={[st.shadow]} onPress={()=>{setCheck(!check)}}>
                        {check && (
                            <Ionicon name='checkmark' size={30} color={'red'}/>
                        )}
                    </TouchableOpacity>
                </View> */}
        <View style={[{ width: "95%" }]}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="my-1 text-base font-semibold">
                Sản Phẩm: {product.product.title}
              </Text>
              <Text className="text-zinc-400">
                Số Lượng: {product.quantity}
              </Text>
            </View>
            <View>
              <View className="items-center justify-center w-10">
                <TouchableOpacity
                  onPress={() => {
                    setShowItem(!showItem);
                  }}
                >
                  <Ionicon
                    name={showItem ? "chevron-up" : "chevron-down"}
                    color={"rgb(234 88 12)"}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {showItem && (
            <View className="flex-row items-center justify-center mt-2">
              <Image
                className="w-24 mx-2 h-28"
                source={product.product.img[0]}
              />
              <View className="justify-center w-3/6">
                <Text className="mb-4">
                  Product in stock: {product.product.quantity}
                </Text>
                <Text className="mb-4">
                  Price: {product.product.priceNew.toLocaleString("en-US")}₫
                </Text>
                <View
                  className="flex-row items-center justify-center rounded bg-slate-300"
                  style={{ width: "65%" }}
                >
                  <TouchableOpacity
                    className="items-center justify-center "
                    onPress={() => {
                      editQuantity(-1);
                    }}
                  >
                    <Ionicon name="remove" size={25} />
                  </TouchableOpacity>
                  <Text className="mx-5 text-lg">{product.quantity}</Text>

                  <TouchableOpacity
                    className="items-center justify-center "
                    onPress={() => {
                      editQuantity(1);
                    }}
                  >
                    <Ionicon name="add" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <Text className="mt-5 text-xl text-red-400">price: {price}₫</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const st = StyleSheet.create({
  shadow: {
    shadowColor: "#8c8c8c",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    backgroundColor: "#ffffff",
  },
});

export default ItemCart;
