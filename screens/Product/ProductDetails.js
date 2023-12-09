import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import { CartProduct, useFavoriteProducts } from "../../context/context";
// import { dataFavorite } from '../../data/data';

const { width, height } = Dimensions.get("window");

export default function ProductDetails({ route, navigation }) {

  const { cart, setCart } = CartProduct();



  const { productItem } = route.params;
  let priceNew = productItem.priceNew.toLocaleString("en-US");
  let priceOld = productItem.priceOld.toLocaleString("en-US");
  // console.log(productItem);

  // time count down
  const [day, setday] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const targetDate = new Date("2023-12-10T00:00:00").getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const currentDate = new Date().getTime();
      const timeRemaining = targetDate - currentDate;

      if (timeRemaining <= 0) {
        setday(0);
        setHour(0);
        setMinute(0);
        setSecond(0);
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setday(days);
        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    // Clear interval khi component unmount
    return () => clearInterval(intervalId);
  }, []); // Dãy dependency rỗng để chạy effect chỉ một lần khi mount

  // heart
  // FavoriteProducts.find()
  const { favoriteProducts, setFavoriteProducts } = useFavoriteProducts();

  const checkIL = () =>
    favoriteProducts.findIndex((item) => item.title === productItem.title);

  const indexIT = checkIL();

  const [isLiked, setIsLiked] = useState(indexIT !== -1);

  const handlePress = () => {
    setIsLiked(!isLiked);

    setFavoriteProducts((prevFavoriteProducts) => {
      if (!isLiked) {
        // Nếu chưa thích, thêm productItem vào favoriteProducts
        return [...prevFavoriteProducts, productItem];
      } else {
        // Nếu đã thích, loại bỏ productItem khỏi favoriteProducts
        const updatedProducts = prevFavoriteProducts.filter(
          (item) => item.title !== productItem.title
        );
        return updatedProducts;
      }
    });
    console.log(favoriteProducts.length);
    dataFavorite = [...favoriteProducts];
  };

  // console.log(favoriteProducts.length);

  const checkCart = () => {
    let c = -1;
    if (cart.length == 0) return -1;
    else {
      c = cart.findIndex(item => {
        return item.product.title == productItem.title;
      })
    }
    return c;
  }
  const idCheckCart = checkCart();


  const [buttonText, setButtonText] = useState(idCheckCart != -1);


  const addCart = () => {
    let c = checkCart();
    let idIT = 0;
    
    if(cart.length > 0){
      idIT = (cart[cart.length-1].id+1)
    }
    const itemCart = {
      product: productItem,
      quantity: 1,
      id: idIT
    }

    setCart((l)=>{
      if(cart.length == 0){
        return [itemCart]
      } else{
        if(!buttonText){
          return [...l, itemCart]
        } else{
          const updateCart = cart.filter(item=>{
            return item.product.title != productItem.title;
          })
          return updateCart;
        }
      }
    })
    setButtonText(!buttonText);
  }

  return (
    <View className="items-center flex-1 pt-5 bg-neutral-100">
      <View
        style={{ height: height * 0.08, width: width }}
        className="flex-row items-center justify-between bg-slate-200"
      >
        <TouchableOpacity
          className="items-center justify-center w-10 h-10 ml-4 rounded-xl bg-slate-400 "
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>
            {<Ionicon name="chevron-back-outline" size={30} color={"white"} />}
          </Text>
        </TouchableOpacity>
        <View className="w-full" style={{ width: width - 56 }}>
          <Text className="text-xl font-semibold text-center text-gray-700">
            {productItem.title}
          </Text>
        </View>
      </View>

      <View style={{ height: height * 0.7 }}>
        <ScrollView>
          <View style={st.imgProduct}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
            >
              {productItem.img.map((img, index) => {
                return (
                  <View
                    key={index}
                    className="items-center justify-center"
                    style={{ height: height * 0.4, width: width }}
                  >
                    <Image className="w-60" style={st.img} source={img} />
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View
            style={st.price}
            className="flex-row bg-gray-300 justify-aroundr "
          >
            <View
              style={{ width: width * 0.5 }}
              className="items-center justify-center h-full"
            >
              <Text className="text-xl font-bold text-orange-600">
                {priceNew}₫
              </Text>
              <Text
                className="text-xs text-center text-zinc-400"
                style={{ textDecorationLine: "line-through" }}
              >
                ₫{priceOld}
              </Text>
            </View>
            <View className="items-center justify-center">
              <Text className="mb-2 text-xl font-medium text-orange-600">
                ƯU ĐÃI CÒN LẠI
              </Text>
              <View className="flex-row">
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{day}</Text>
                </View>
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{hour}</Text>
                </View>
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{minute}</Text>
                </View>
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{second}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="m-5 ">
            <View>
              <Text className="text-2xl">{productItem.title}</Text>
            </View>

            <TouchableOpacity onPress={handlePress}>
              <Ionicon
                name={isLiked ? "heart" : "heart-outline"}
                size={25}
                color={"red"}
              />
            </TouchableOpacity>

            <View className="my-4">
              <Text className="text-gray-400">
                Số lượng sản phẩm trong kho: {productItem.quantity}
              </Text>
            </View>

            <View className="justify-between w-full px-2 py-3 my-5 border border-gray-400 h-60 rounded-xl">
              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">
                  Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp
                  Lightning - Type C
                </Text>
              </View>

              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">Bảo hành chính hãng 1 năm</Text>
              </View>

              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">Giao hàng nhanh toàn quốc</Text>
              </View>

              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">Hoàn thuế cho người nước ngoài</Text>
              </View>
            </View>

            <View className="my-5">
              <Text className="my-2 text-lg font-bold">
                Thông tin sản phẩm:
              </Text>
              <Text className="text-base text-justify">
                {productItem.productInfo}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{ height: height * 0.1, width: width }}
        className="items-center "
      >
        <TouchableOpacity
          className="bg-orange-400  rounded-xl mt-4"
          style={{ width: width * 0.98 , height:"80%"}}
          onPress={() => {
            addCart()
            // navigation.navigate("OrderScreen", { productItem: productItem });
          }}
        >
          <Text className="my-auto text-xl font-medium text-center text-white">
            {buttonText ? "Xóa khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  imgProduct: {
    height: height * 0.4,
    width: width,
    backgroundColor: "white",
  },
  img: {
    // height: 100
    objectFit: "contain",
  },
  price: {
    width: width,
    height: 90,
    // backgroundColor: 'black'
  },
  itemTime: {
    width: 30,
    height: 30,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgb(234 88 12)",
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: "black",
  },
  textTime: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
  },
});
