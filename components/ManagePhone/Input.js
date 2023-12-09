import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({ label, style, invalid, textInputConfig }) => {
    const inputStyle = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyle.push(styles.multilineText)
    }
    if (invalid) {
        inputStyle.push(styles.errorInput)
    }
    return (
        <View style={[styles.inputcontainer, style]}>
            <Text style={[styles.label, invalid && styles.errorLabel]}>{label}</Text>
            <TextInput style={inputStyle} {...textInputConfig} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputcontainer: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    label: {
        color: '#111',
        marginLeft: -10
    },
    input: {
        backgroundColor: '#f4f4f4',
        marginTop: 8,
        padding: 6,
        borderRadius: 8,
    },
    multilineText: {
        minHeight: 120,
        textAlignVertical: 'top'
    },
    errorLabel: {
        color: 'white'
    },
    errorInput: {
        backgroundColor: '#fef422'
    }
})

export default Input