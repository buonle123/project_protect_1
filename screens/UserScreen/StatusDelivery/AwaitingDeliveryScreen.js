import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Orders } from '../../../context/context'
import ItemStatusNoDelete from '../../../components/ItemStatusNoDelete'

const AwaitingDelivery = () => {
  const { orderList, setOrderList } = Orders()

  const renderItem = () => {
    if (orderList == 0) {
      return (
        <View><Text></Text></View>
      )
    } else {
      return (
        orderList.map((item, i) => {
          if (item.status == "chờ lấy") {
            return (
              <ItemStatusNoDelete id={item.id} fItem={item} pricee={item.CartItem.totalAmount} list={item.CartItem.cart} />
            )
          }
        })
      )
    }
  }
  return (
    <View style={{ width: "100%", height: "100%" }} className="justify-center items-center">
      <ScrollView className="">
        {renderItem()}
      </ScrollView>
    </View>
  )
}

const st = StyleSheet.create({
  shadow: {
    shadowColor: '#8c8c8c', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 7, backgroundColor: '#ffffff',
  }
})


export default AwaitingDelivery