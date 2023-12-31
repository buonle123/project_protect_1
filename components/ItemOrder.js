import InputOrder from "./InputOrder";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";

const ItemOrder = ({ icon, data, title, lable, setData }) => {
  const [showipAddress, setShowipAddress] = useState(false);

  const ShowAddress = () => {
    setShowipAddress(!showipAddress);
  };
  return (
    <View
      className="items-center w-full h-auto px-2 py-4 mt-5 rounded-xl"
      style={[st.shadow, st.container]}
    >
      <View className="flex-row justify-around">
        <View className="w-5/6">
          <Text className="mb-2 text-base">
            {icon}
            {title}
          </Text>
          <Text className="pl-2">{data}</Text>
        </View>
        <View className="items-center justify-center w-10">
          <TouchableOpacity
            onPress={() => {
              ShowAddress();
            }}
          >
            <Ionicon
              name={showipAddress ? "chevron-up" : "create-outline"}
              color={"rgb(234 88 12)"}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-5/6">
        {showipAddress && (
          <InputOrder label={lable} value={data} onchange={setData} />
        )}
      </View>
    </View>
  );
};

export default ItemOrder;

const st = StyleSheet.create({
  shadowHeader: {
    // elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "white",
  },
});
