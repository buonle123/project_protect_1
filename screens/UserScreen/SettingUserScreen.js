import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('window')

export default function SettingUserScreen() {
  return (
    <View style={[st.container]} className='bg-white'>
      <View style={st.headerDrawer} className='items-center mt-5'>
        <Image className='w-40 h-40 ' style={[st.shadow, {}]} transform={[{ rotate: "0deg" },]} source={require('../../assets/images/imgOnBoarding/Enjoy.png')} />
        <Text className='my-2 text-base font-semibold'>Hello Nguyễn Văn Dũng!</Text>
      </View>

      <View style={[st.shadow, { width: '90%', height: '50%' }]} className='bg-white rounded-xl mt-5'>
        <ScrollView className='px-2 py-2'>
          <View className='my-5'>
          </View>
          <View className='my-5'>
            <Text className='font-medium'><Ionicon name='at-outline' size={25} color={' rgb(234 88 12)'} />Email: </Text>
          </View>
          <View className='my-5'>
            <Text className='font-medium'><Ionicon name='call-outline' size={25} color={' rgb(234 88 12)'} />Phone: </Text>
          </View>
          <View className='my-5'>
            <Text className='font-medium'><Ionicon name='person-outline' size={25} color={' rgb(234 88 12)'} />Name: </Text>
          </View>

        </ScrollView>
        
      </View>
    </View>
  )
}


const st = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: height * 0.93,
    // backgroundColor: '#fffff',
    // marginTop: '5%'
  },
  headerDrawer: {

  },
  shadow: {
    shadowColor: '#8c8c8c', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: '#ffffff'
  }
})