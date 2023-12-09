import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment/src/moment'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { dataProduct } from '../data/data'
import { Swipeable } from 'react-native-gesture-handler'
import { Orders } from '../context/context'

const {width, height} = Dimensions.get('window')

const ItemStatus = ({ fItem, title, timeOrder, product, id, amount, setAmount, pricee, list }) => {

    const { orderList, setOrderList } = Orders()

    const price = pricee.toLocaleString("en-US")




    moment.locale('vi');
    const t = new Date()

    const [check, setCheck] = useState(false);

    // const day = t.getDay(), month = t.getMonth() + 1, year = t.getFullYear(), hour = t.getHours(), mi = t.getMinutes();
    // const fullTime = `${day}/${month}/${year} ${hour}:${mi}`

    const [showItem, setShowItem] = useState(false)

    const deleteItem = (i) => {
        if (orderList.length == 0) { setOrderList([]); return }
        const VT = orderList.findIndex((item) => {
            return item.id == i
        })


        let list = [...orderList]
        list.splice(VT, 1);
        setOrderList(list)
    }


    const right = () => {
        return (
            <View className='w-1/4 h-full justify-center items-center'>
                <TouchableOpacity className='justify-center items-center w-20 h-20 rounded-xl' key={id} style={[st.shadow]} onPress={() => { deleteItem(id) }}>
                    <Text className='text-red-500 text-base font-semibold'>Hủy đơn</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const showProduct = () => {
        return list.map((item, i) => {
            return (
                <View style={[{ width: "100%" }]} className="justify-center rounded-lg my-2">
                    <View className='justify-center flex-row py-2  mx-auto' style={[st.shadow, { width: "95%" }]}>
                        <View >
                            <Image style={[{width: width*0.25, height: width*0.25}]} source={item.product.img[0]}/>
                        </View>
                        <View style={{ textAlign: 'justify', lineHeight: 20, width: "60%"}}>
                            <Text className='mb-4'>Sản phẩm: {item.product.title}</Text>
                            <Text className='mb-4'>Số lượng: {item.quantity}</Text>
                        </View>
                    </View>
                </View>
            )
        })
    }




    return (
        <Swipeable renderRightActions={right} key={id}>
            <View className=' mx-auto my-5 py-3 rounded-xl px-2 flex-row justify-between' style={[st.shadow, { width: '95%' }]}>

                <View style={[{ width: "100%" }]} >
                    <View className='flex-row justify-between items-center'>
                        <View>
                            <Text className='text-base my-1 font-semibold'>Đơn hàng: {title}</Text>
                            <Text className='text-zinc-400'>{timeOrder}</Text>

                        </View>
                        <View>
                            <View className='justify-center items-center w-10'>
                                <TouchableOpacity onPress={() => { setShowItem(!showItem) }}>
                                    <Ionicon name={showItem ? 'chevron-up' : 'chevron-down'} color={'rgb(234 88 12)'} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {showItem && (
                        <>
                            <View className='mx-3'>
                                <Text><Text className='font-medium'>Tên người nhận:</Text> "{fItem.yName}"</Text>
                                <Text className='my-2'><Text className='font-medium'>Địa chỉ nhận hàng:</Text> "{fItem.address}"</Text>
                                <Text className='mb-5'><Text className='font-medium'>SĐT:</Text> "{fItem.phone}"</Text>
                            </View>
                            <View>{showProduct()}</View>
                        </>
                    )}
                    <Text className='text-red-400 mt-5 text-xl'>price: {price}₫</Text>
                </View>
            </View>
        </Swipeable>
    )
}

const st = StyleSheet.create({
    shadow: {
        shadowColor: '#8c8c8c', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 7, backgroundColor: '#ffffff',
    }
})

export default ItemStatus

