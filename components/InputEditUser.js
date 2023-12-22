import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";

const InputEditUser = ({ vlue, setVL, placeholder, Icon, onChange }) => {
  const [eye, setEye] = useState(true);
  return (
    <View
      className="flex-row items-center w-4/5 h-12 pl-3 mx-auto my-5 rounded-md"
      style={[st.shadow, { backgroundColor: "rgba(242, 242, 242, 1)" }]}
    >
      <TouchableOpacity
        onPress={() => {
          setEye(!eye);
        }}
      >
        <Ionicon name={Icon} size={25} />
      </TouchableOpacity>
      <TextInput
        secureTextEntry={false}
        className="w-full ml-5"
        placeholder={placeholder}
        value={vlue}
        onChange={(txt) => {
          onChange(txt);
        }}
      />
    </View>
  );
};

const st = StyleSheet.create({
  shadow: {
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: "#ffffff",
  },
});

export default InputEditUser;
