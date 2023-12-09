import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constant'

const InputOrder = ({ label, icon, inputType, keyBoardType, fieldButtonLabel, fieldButtonFunction, onchange, valu }) => {
    return (
        <View style={styles.inputContainer}>
            
                <TextInput placeholder={label} keyboardType={keyBoardType} style={styles.textInput} onChangeText={onchange} value={valu}/>
            
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: 10
    },
    textInput: {
        flex: 1,
        paddingVertical: 0,
    },
})

export default InputOrder