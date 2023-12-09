import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'



const styles = StyleSheet.create({

})

const Product = (item) => {
    let priceNew = item.priceNew.toLocaleString('en-US');
    let priceOld = item.priceOld.toLocaleString('en-US');
    
    return (
        <View className='w-40 h-80 items-center bg-white rounded-lg mx-2'>
            <View className='h-40 mt-6'>
                <Image className='w-36 h-36' style={{ objectFit: 'contain' }} source={item.img} />
            </View>
            <Text className='text-base font-medium'>{item.title}</Text>
            <View className='mt-3'>
                <Text className='text-blue-600 text-base'>{priceNew}₫</Text>
                <Text className='text-zinc-400 text-xs text-center' style={{ textDecorationLine: 'line-through' }}>{priceOld}₫</Text>
            </View>
        </View>
    )
}

export {Product}