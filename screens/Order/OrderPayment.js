import { View, Text, Dimensions } from "react-native";
import React from "react";
import ButtonCustom from "../../components/UI/ButtonCustom";
import PaymentBank from "../../components/UI/Status/PaymentBank";
const width = Dimensions.get("window").width;

const OrderPayment = ({ onChange }) => {
  return (
    <View
      style={{ backgroundColor: "#f8f8f8", height: width * 1.85, padding: 20 }}
    >
      <PaymentBank />
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}>
        <ButtonCustom onPress={onChange} icon={"chevron-forward-outline"}>
          THANH TOÁN HOÀN TẤT
        </ButtonCustom>
      </View>
    </View>
  );
};

export default OrderPayment;
