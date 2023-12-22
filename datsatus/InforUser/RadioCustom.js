import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";

const RadioCustom = ({ label, imgUri, value, selectedValue, onChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(value)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: selectedValue === value ? "#046be8" : "#6f7070",
        borderRadius: 10,
      }}
    >
      <RadioButton
        color="rgb(55 128 216)"
        value={value}
        status={selectedValue === value ? "checked" : "unchecked"}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {imgUri && (
          <Image
            resizeMode="contain"
            style={{
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}
            source={{
              uri: imgUri,
            }}
          />
        )}
        <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 20 }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadioCustom;
