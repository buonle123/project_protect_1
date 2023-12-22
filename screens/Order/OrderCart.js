import { View, Text, Dimensions } from "react-native";
import React from "react";
import ButtonCustom from "../../components/UI/ButtonCustom";
const width = Dimensions.get("window").width;
const OrderCart = ({ onChange }) => {
  return (
    <View
      style={{ backgroundColor: "#f8f8f8", height: width * 1.85, padding: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ letterSpacing: -1, color: "#6f7070" }}>
          ------------------------------
        </Text>
        <Text style={{ color: "#6f7070", marginHorizontal: 10 }}>
          Phụ kiện đi kèm
        </Text>
        <Text style={{ letterSpacing: -1, color: "#6f7070" }}>
          ------------------------------
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}>
        <ButtonCustom onPress={onChange} icon={"chevron-forward-outline"}>
          THÔNG TIN THANH TOÁN
        </ButtonCustom>
      </View>
    </View>
  );
};

export default OrderCart;
