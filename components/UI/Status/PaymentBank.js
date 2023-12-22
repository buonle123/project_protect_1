import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import RadioCustom from "../../InforUser/RadioCustom";

const PaymentBank = () => {
  const [selectedValue, setSelectValue] = useState("VietTinBank");
  function handlerRadioButtonChange(value) {
    setSelectValue(value);
  }
  function HandlerQRCodeChange({ value }) {
    switch (value) {
      case "VietinBank":
        return (
          <Image
            style={styles.img}
            source={require("../../../assets/images/Payment/paymentVtb.png")}
          />
        );
      case "BIDV":
        return (
          <Image
            style={styles.img}
            source={require("../../../assets/images/Payment/paymentBIDV.png")}
          />
        );
      case "Vietcombank":
        return (
          <Image
            style={styles.img}
            source={require("./../../../assets/images/Payment/paymentVCB.png")}
          />
        );
      case "VPBank":
        return (
          <Image
            style={styles.img}
            source={require("./../../../assets/images/Payment/paymentVPBank.png")}
          />
        );
      default:
    }
  }
  return (
    <View>
      <View>
        <RadioCustom
          label={"VietinBank"}
          selectedValue={selectedValue}
          value={"VietinBank"}
          imgUri={
            "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VietinBank-CTG-Te.png"
          }
          onChange={handlerRadioButtonChange}
        />
        <RadioCustom
          label={"BIDV"}
          selectedValue={selectedValue}
          value={"BIDV"}
          imgUri={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_BIDV.svg/2560px-Logo_BIDV.svg.png"
          }
          onChange={handlerRadioButtonChange}
        />
        <RadioCustom
          label={"Vietcombank"}
          selectedValue={selectedValue}
          value={"Vietcombank"}
          imgUri={
            "https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank.png"
          }
          onChange={handlerRadioButtonChange}
        />
        <RadioCustom
          label={"VPBank"}
          selectedValue={selectedValue}
          value={"VPBank"}
          imgUri={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/VPBank_logo.svg/2560px-VPBank_logo.svg.png"
          }
          onChange={handlerRadioButtonChange}
        />
      </View>
      <View style={{ alignItems: "center", marginVertical: 25 }}>
        <HandlerQRCodeChange value={selectedValue} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    height: 250,
    width: 250,
  },
});

export default PaymentBank;
