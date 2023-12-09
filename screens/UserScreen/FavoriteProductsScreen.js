import { View, Text, ScrollView, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { SelectList } from 'react-native-dropdown-select-list';
import { StackView } from '@react-navigation/stack';
import { useFavoriteProducts } from '../../context/context';
import { imgSliderHome } from '../../data/data';
const { width, height } = Dimensions.get('window');

export default function FavoriteProductsScreen({ navigation }) {

  const [indexSlide, setindexSlide] = useState(0);
  const scrollRef = useRef();

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      setindexSlide(slide)
    }
  }


  // autoSlide();

  const dotClick = (index) => {
    setindexSlide(index);
    const scrollX = width * index;
    scrollRef.current.scrollTo({
      animated: true,
      x: scrollX,
    })
  };


  const dots = imgSliderHome.map((i) => (
    <TouchableOpacity key={i.id} className='items-center justify-center h-12 mx-2' onPress={() => dotClick(i.id)}>
      <Text
        className={`text-6xl h-12 font-thin ${indexSlide === i.id ? 'text-black font-extralight' : 'text-white font-thin'
          }`}
        onPressIn={() => {
        }}
      >
        -
      </Text>
    </TouchableOpacity>
  ));


  // select list
  const dataSL = ['Tất cả', 'iphone', 'iPad', 'Macbook']
  const [selectType, setselectType] = useState(dataSL[0]);


  // console.log(selectType);

  // item

  const { favoriteProducts, setFavoriteProducts } = useFavoriteProducts();




  const updateSelect = (it) => {
    console.log(it);
    setselectType(it);

    // setArrItems(FavoriteProducts);
  };

  const renderItems = () => {

    const Item = (item, index) => {
      return (
        <TouchableOpacity key={index} className='my-2' onPress={() => { navigation.navigate('ProductDetails', { productItem: item }) }}>
          <View className='flex-row items-center justify-around w-full h-24 mx-auto bg-white rounded-2xl' style={st.shadow}>
            <Image className='w-16 h-16' source={item.img[0]} />
            <View className='w-2/4'><Text>{item.title}</Text></View>
            <TouchableOpacity key={item.title} onPress={() => { deleteI(item.title) }}>
              <Ionicon name='trash' size={35} color={'rgb(300 31 100)'} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    }

    if (favoriteProducts.length == 0) {
      return (
        <View className='items-center justify-center w-full my-5'>
          <Image className='w-60 h-60' source={require('../../assets/null.png')}/>
        </View>
      )
    } else {
      if (selectType == "Tất cả") {
        return (favoriteProducts.map((item, index) => {
          return (
            Item(item, index)
          )
        }))
      } else {
        return (favoriteProducts.map((item, index) => {
          Item(item, index)
        }))
      }
    }
  };





  const deleteI = (tt) => {
    const arrN = [...favoriteProducts];
    const vt = arrN.findIndex((item, index) => {
      return item.title == tt;
    })
    console.log(vt);
    setselectType(selectType)
    arrN.splice(vt, 1);
    setFavoriteProducts(arrN)
  }



  return (
    <View className='items-center flex-1 bg-neutral-400 '>
      {/* <View style={{ height: height * 0.1, width: width }} className='flex-row items-center justify-center p-2 bg-slate-400 '>
        <Text className='text-xl font-semibold text-center text-white'>favoriteProducts</Text>
      </View> */}
      <View className='items-center justify-start w-full h-auto bg-white' style={{ flex: 0.9999 }}>
        <View>

          <View className='h-56 pt-5 bg-slate-400'>
            <ScrollView
              onScroll={({ nativeEvent }) => onChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              className='bg-white '
              ref={scrollRef}
              scrollEventThrottle={32}
            >
              {imgSliderHome.map((img, index) => {
                return (
                  <View key={index} className='items-center justify-center' style={{ width: width }}>
                    <Image className='object-contain' style={st.img} source={img.img} />
                  </View>
                )
              })}

            </ScrollView>
            <View className='flex-row items-center justify-center ' style={{ width: width }}>
              {dots}
            </View>
          </View>

          <View className='my-5 '>
            <Text className='text-xl font-medium text-center'>Favorite Product</Text>
            <View className='w-2/4 px-5 my-5'>
              <SelectList placeholder='Tất Cả' data={dataSL} setSelected={updateSelect} />
            </View>

            <View className='w-full h-56'>
              <ScrollView style={{ width: width }}>
                
                {renderItems()}
              </ScrollView>
            </View>
          </View>
        </View>

      </View>
      {/* <ion-icon name="trash-outline"></ion-icon> */}

    </View>
  )
}

const st = StyleSheet.create({
  img: {
    width: width,
    height: "100%"
  },
  shadow: {

    elevation: 1,
    shadowColor: 'black',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: width * 0.95,
    marginTop: 5,
    borderWidth: 0.2,
    borderColor: 'rgb(243 244 246)'
  }
})
