import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import InputEditUser from '../../../components/InputEditUser'
const { width, height } = Dimensions.get('window')

const EditUser = () => {

  const [usName, editName] = useState('');
  const [mail, editmail] = useState('');
  const [phone, editphone] = useState('');


  const save = ()=>{
    
  }




  return (
    <View style={[{ width: width, height: height * 0.85 }]}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.1)', 'rgb(242, 242, 242)']}
        // ={{ x: 1, y: 2 }}
        locations={[0.5, 0.5]}
        start={{ x: -0.5, y: 0.3 }}
        style={[{ height: '100%' }]}
      >
        <ScrollView>
          <View className='w-full items-center mt-10'>
            <Image style={[{ width: width * 0.5, height: width * 0.5 }]} source={require('../../../assets/editUser.png')} />
          </View>

          <InputEditUser Icon={'person-outline'} placeholder={'new name'} vlue={usName} onChange={editName}/>
          <InputEditUser Icon={'mail-outline'} placeholder={'mail'} vlue={mail} onChange={editmail}/>
          <InputEditUser Icon={'call-outline'} placeholder={'phone'} vlue={phone} onChange={editphone}/>
          {/* <InputEditUser Icon={'person-outline'} placeholder={'new name'} /> */}

          <View className='w-3/4 h-12 mx-auto rounded-lg mt-10 mb-20' style={[st.shadow, { backgroundColor: 'rgba(242, 242, 242, 0.8)' }]}>
            <TouchableOpacity className='w-full h-full' onPress={save}>
              <Text className='m-auto text-lg font-semibold'>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const st = StyleSheet.create({
  shadow: {
    shadowColor: '#262626', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: '#ffffff'
  }
})

export default EditUser

