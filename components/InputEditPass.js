import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const InputEditPass = ({vlue, setVL, placeholder}) => {

    


    const [eye, setEye] = useState(true);
    return (
        <View className='mx-auto w-4/5 h-12 rounded-md pl-3 items-center my-5 flex-row' style={[st.shadow, { backgroundColor: 'rgba(242, 242, 242, 1)' }]}>
            <TouchableOpacity onPress={() => { setEye(!eye) }}>
                <Ionicon name={eye ? 'eye-off-outline' : 'eye-outline'} size={25} />
            </TouchableOpacity>
            <TextInput secureTextEntry={eye} className='ml-5 w-full' placeholder={placeholder} value={vlue} onChange={(txt)=>{setVL(txt)}}/>
        </View>
    )
}

const st = StyleSheet.create({
    shadow: {
        shadowColor: '#262626', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: '#ffffff'
    }
})

export default InputEditPass
