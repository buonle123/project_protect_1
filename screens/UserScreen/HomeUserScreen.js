import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { Product } from '../../components/style';
import { dataProduct, imgSliderHome } from "../../data/data";
import { AuthContext } from "../../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OverLayLoading from "../../components/UI/OverLayLoading";

const { width, height } = Dimensions.get("window");

export default function HomeUser({ navigation }) {
  const authContext = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isLoging, setIsLoging] = useState(false);
  const updateSeach = (vl) => {
    setSearch(vl);
    // console.log(vl);
    if (vl.trim() == "") {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };

  const scrollProduct = useRef();

  const [indexSlide, setindexSlide] = useState(0);
  const scrollRef = useRef();

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      setindexSlide(slide);
    }
  };

  const autoSlide = () => {
    setTimeout(() => {
      let i = (indexSlide + 1) % imgSliderHome.length;
      setindexSlide(i);
      dotClick(i);
    }, 4000);
  };
  // autoSlide();

  const dotClick = (index) => {
    setindexSlide(index);
    const scrollX = width * index;
    scrollRef.current.scrollTo({
      animated: true,
      x: scrollX,
    });
  };

  const dots = imgSliderHome.map((i, index) => (
    <TouchableOpacity
      key={index}
      className="items-center justify-center h-12 mx-2"
      onPress={() => dotClick(index)}
    >
      <Text
        className={`text-6xl h-12 font-thin ${indexSlide === i.id
            ? "text-black font-extralight"
            : "text-gray-300 font-thin"
          }`}
        onPressIn={() => { }}
      >
        -
      </Text>
    </TouchableOpacity>
  ));

  // title

  const [pagination, setPagination] = useState([
    {
      id: 7,
      title: "iPhone",
    },
    {
      id: 8,
      title: "iPad",
    },
    {
      id: 9,
      title: "Macbook",
    },
  ]);
  const [activeId, setActiveId] = useState(0);

  const setActiveTitle = (id) => {
    setActiveId(id);
    let index = id;
    if (index === 7) {
      scrollProduct.current.scrollTo({
        animated: true,
        y: 150,
      });
    } else if (index === 8) {
      scrollProduct.current.scrollTo({
        animated: true,
        y: 550,
      });
    } else if (index === 9) {
      scrollProduct.current.scrollTo({
        animated: true,
        y: 1000,
      });
    }
  };

  const logOut = async () => {
    setIsLoging(true);
    await AsyncStorage.setItem("KeepLogged", "");
    authContext.logOut();
    setIsLoging(false);
  };
  if (isLoging) {
    return <OverLayLoading />;
  }

  const Product = (item, index) => {
    let priceNew = item.priceNew.toLocaleString("en-US");
    let priceOld = item.priceOld.toLocaleString("en-US");
    const navigateToProductDetails = () => {
      // Truyền item qua màn hình 'ProductDetails'
      navigation.navigate("ProductDetails", { productItem: item });
    };
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigateToProductDetails();
        }}
        className="items-center mx-2 bg-white rounded-lg w-44 h-80"
        style={{
          elevation: 5,
          shadowColor: "black",
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}
      >
        <View className="h-40 mt-6">
          <Image
            className="w-36 h-36"
            style={{ objectFit: "contain" }}
            source={item.img[0]}
          />
        </View>
        <View className="h-16">
          <Text className="text-base font-medium">{item.title}</Text>
        </View>
        <View className="mt-3">
          <Text className="text-base text-blue-600">{priceNew}₫</Text>
          <Text
            className="text-xs text-center text-zinc-400"
            style={{ textDecorationLine: "line-through" }}
          >
            {priceOld}₫
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 mt-5">
      <View
        style={{ flex: 0.08 }}
        className="flex-row items-center justify-between p-2 bg-slate-200"
      >
        <TouchableOpacity
          className="items-center justify-center w-10 h-10 rounded-xl bg-slate-400 "
          onPress={() => {
            logOut();
          }}
        >
          <Text style={{ fontSize: 20 }} transform={[{ rotate: "180deg" }]}>
            {<MaterialIcons name="logout" size={20} color={"white"} />}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center h-full w-72">
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={updateSeach}
            className="w-9/12 px-2 mx-2 border-2 border-solid rounded-lg h-4/6 border-slate-400"
          />

          <TouchableOpacity>
            <Ionicon
              name="search-outline"
              color={"rgb(148, 163, 184)"}
              size={36}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="" style={{ flex: 0.9 }}>
        <View
          className="flex-row items-center justify-center h-10 my-2 border-slate-400 "
          style={{}}
        >
          {pagination.map((item) => {
            const id = item.id;
            return (
              <TouchableOpacity
                key={id}
                className={`mx-2 w-20 justify-center items-center rounded-xl ${id == activeId ? "bg-slate-300" : ""
                  }`}
                onPress={() => setActiveTitle(id)}
              >
                <Text
                  className={`text-lg font-medium ${activeId == item.id ? "text-white" : "text-gray-700"
                    }`}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView
          className="h-5/6"
          ref={scrollProduct}
          scrollEventThrottle={16}
          onScroll={({ nativeEvent }) => {
            // onChangeSetIndex(nativeEvent);
            const categoryIndex = nativeEvent.contentOffset.y;
            // console.log(categoryIndex)
            if (categoryIndex <= 150) {
              setActiveId(7);
            } else if (categoryIndex <= 550) {
              setActiveId(8);
            } else {
              setActiveId(9);
            }
          }}
        >
          {/* SLIDER */}
          <View
            className="items-center justify-center w-full "
            style={{ flex: 0.9 }}
          >
            <View className="h-48">
              <ScrollView
                onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                className="bg-white "
                ref={scrollRef}
                scrollEventThrottle={32}
              >
                {imgSliderHome.map((img, index) => {
                  return (
                    <View
                      key={index}
                      className="items-center justify-center"
                      style={{ width: width }}
                    >
                      <Image
                        className="object-contain"
                        style={st.img}
                        source={img.img}
                      />
                    </View>
                  );
                })}
              </ScrollView>
              <View
                className="flex-row items-center justify-center "
                style={{ width: width }}
              >
                {dots}
              </View>
            </View>
          </View>

          <View className="items-center p-5 bg-">
            {showSearch ? (
              <>
                <View
                  className="items-center mt-5 justify-"
                  style={{ width: width * 0.9, height: height * 0.5 }}
                >
                  <View className="flex-row items-center w-full">
                    <Text className="text-base">Từ khóa: "{search}" </Text>
                    <TouchableOpacity
                      className="ml-2 bg-black rounded-full"
                      onPress={() => {
                        setShowSearch(false);
                        setSearch("");
                      }}
                    >
                      <Ionicon name="close" color={"white"} size={14} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ width: width * 0.91, height: height * 0.5 }}
                    className="mt-5"
                  >
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      className="h-52"
                    >
                      {(() => {
                        const filteredProducts = dataProduct.filter((item) =>
                          item.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        );

                        // Kiểm tra xem có sản phẩm nào thỏa mãn hay không
                        if (filteredProducts.length === 0) {
                          return (
                            <View className="items-center w-full">
                              <Text className="text-center">
                                Không tìm thấy sản phẩm!!
                              </Text>
                            </View>
                          );
                        }

                        // Trả về mảng sản phẩm thỏa mãn điều kiện
                        return filteredProducts.map((item, i) =>
                          Product(item, i)
                        );
                      })()}
                    </ScrollView>
                  </View>
                </View>
              </>
            ) : (
              <>
                {/* iphone */}
                <View
                  className="items-center justify-center mt-5"
                  style={{ width: width * 0.9, height: height * 0.5 }}
                >
                  <Text className="mb-5 text-2xl font-medium">iPhone</Text>
                  <View
                    style={{ width: width * 0.91, height: height * 0.5 }}
                    className=""
                  >
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      className="h-52"
                    >
                      {/* product */}
                      {dataProduct.map((item, i) => {
                        if (item.typeProduct == "iphone") {
                          return Product(item, i);
                        }
                      })}
                    </ScrollView>
                  </View>
                </View>

                {/* iPad */}
                <View
                  className="items-center justify-center mt-10"
                  style={{ width: width * 0.9, height: height * 0.5 }}
                >
                  <Text className="mb-5 text-2xl font-medium">iPad</Text>
                  <View
                    style={{ width: width * 0.91, height: height * 0.5 }}
                    className=""
                  >
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      className="h-52"
                    >
                      {/* product */}
                      {dataProduct.map((item, i) => {
                        if (item.typeProduct == "iPad") {
                          return Product(item, i);
                        }
                      })}
                    </ScrollView>
                  </View>
                </View>

                {/* Macbook */}
                <View
                  className="items-center justify-center mt-10"
                  style={{ width: width * 0.9, height: height * 0.5 }}
                >
                  <Text className="mb-5 text-2xl font-medium">Macbook</Text>
                  <View
                    style={{ width: width * 0.91, height: height * 0.5 }}
                    className=""
                  >
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      className="h-52"
                    >
                      {/* product */}
                      {dataProduct.map((item, i) => {
                        if (item.typeProduct == "macbook") {
                          return Product(item, i);
                        }
                      })}
                    </ScrollView>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const st = StyleSheet.create({
  shadowHeader: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text_logo: {
    fontFamily: "cursive",
  },
  img: {
    width: width,
    height: "100%",
  },
});
