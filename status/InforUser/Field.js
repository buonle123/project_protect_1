import { View, Text, TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import InputOrder from "../InputOrder";

const Field = ({
  icon,
  label,
  infor,
  data,
  setData,
  mode,
  navigation,
  logout,
}) => {
  const [showField, setShowField] = useState(false);

  const ShowField = () => {
    setShowField(!showField);
  };
  return (
    <View className="my-3" style={{}}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          {
            mode ? ShowField() : navigation();
          }
        }}
      >
        <Ionicon
          name={icon}
          size={25}
          color={logout ? " rgb(55 128 216)" : " rgb(234 88 12)"}
        />
        <Text className="mx-3" style={{ fontSize: 16 }}>
          {mode ? label + ":" : label} {infor}
        </Text>
        {!logout && (
          <Ionicon
            size={18}
            name={
              showField ? "chevron-down-outline" : "chevron-forward-outline"
            }
            style={{
              position: "absolute",
              right: 0,
            }}
          />
        )}
      </TouchableOpacity>
      <View style={{ marginHorizontal: 40 }}>
        {showField && (
          <InputOrder label={label} value={data} onChange={setData} />
        )}
      </View>
    </View>
  );
};

export default Field;
