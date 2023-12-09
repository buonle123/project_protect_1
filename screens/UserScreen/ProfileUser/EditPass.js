import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { InputField } from '../../../components';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');
import Ionicon from 'react-native-vector-icons/Ionicons'
import InputEditPass from '../../../components/InputEditPass';

const EditPass = () => {

    const [eye, setEye] = useState(false);

    const [pass, setPass] = useState('');
    const [rPass, setRPass] = useState('');

    const updatePass = (vLue)=>{
        setPass(vLue)
    }
    const updateRPass = (vLue)=>{
        setRPass(vLue)
    }

    const save = ()=>{

    }


    return (
        <View style={[{ width: width, height: height * 0.85 }]}>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.1)', 'rgb(242, 242, 242)']}
                // ={{ x: 1, y: 2 }}
                locations={[0.5, 0.5]}
                start={{ x: -0.2, y: 0 }}
                style={[{ height: '100%' }]}
            >
                <ScrollView>
                    <View className='w-full'>
                        <Image className='mx-auto mt-10' style={[{ width: width * 0.5, height: width * 0.5 }]} source={require('../../../assets/editpass.png')} />
                    </View>
                    <InputEditPass vlue={pass} setVL={updatePass} placeholder={'Please enter pass'}/>
                    <InputEditPass vlue={rPass} setVL={updateRPass} placeholder={'Please enter re-pass'}/>

                    <View className='w-3/4 h-12 mx-auto mt-24 rounded-lg' style={[st.shadow, {backgroundColor:'rgba(242, 242, 242, 0.8)'}]}>
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

export default EditPass

