import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import ButtonCustom from "../../components/UI/ButtonCustom";
import Field from "../../components/InforUser/Field";
import RadioCustom from "../../components/InforUser/RadioCustom";
const width = Dimensions.get("window").width;

const OrderInfor = ({ price, onChange }) => {
  const [input, setInput] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    location: "",
  });

  function onChangeInputHandler(entered, fieldInput) {
    setInput((prevInput) => ({
      ...prevInput,
      [fieldInput]: entered,
    }));
  }
  return (
    <>
      <View
        style={{
          backgroundColor: "#f8f8f8",
          padding: 10,
          height: width * 1.8,
        }}
      >
        <ScrollView>
          <View style={[styles.eleBorder, {}]}>
            <View style={styles.borderField}>
              <Field
                icon={"person-outline"}
                label={"Name"}
                infor={input.name}
                data={input.name}
                setData={onChangeInputHandler}
                mode={true}
              />
            </View>
            <View style={styles.borderField}>
              <Field
                icon={"call-outline"}
                label={"Phone"}
                infor={input.phone}
                data={input.phone}
                setData={onChangeInputHandler}
                mode={true}
              />
            </View>
            <View style={styles.borderField}>
              <Field
                icon={"business-outline"}
                label={"City"}
                infor={input.city}
                data={input.city}
                setData={onChangeInputHandler}
                mode={true}
              />
            </View>
            <View style={styles.borderField}>
              <Field
                icon={"pie-chart-outline"}
                label={"District"}
                infor={input.district}
                data={input.district}
                setData={onChangeInputHandler}
                mode={true}
              />
            </View>
            <View style={styles.borderField}>
              <Field
                icon={"location-outline"}
                label={"Location"}
                infor={input.location}
                data={input.location}
                setData={onChangeInputHandler}
                mode={true}
              />
            </View>
            {/* Có thể render những sản phẩm từ đơn hàng qua đây */}
          </View>
          <View style={styles.eleBorder}>
            <Text style={{ fontSize: 16 }}>
              Quý khách Vui lòng chọn các hình thức thanh toán dưới đây:
            </Text>
            <RadioCustom
              onChange={() => console.log("Đã đã")}
              label={"Chuyển khoản ngân hàng"}
              imgUri={
                "https://cdn.scb.com.vn/picture/icon_dich_vu_hoa_don_dien_tu_6_.jpg"
              }
            />
          </View>
          <View
            style={[
              styles.eleBorder,
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Tổng cộng:</Text>
            <Text>{price} VNĐ</Text>
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <ButtonCustom onPress={onChange} icon={"chevron-forward-outline"}>
            TIẾP TỤC THANH TOÁN
          </ButtonCustom>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  borderField: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderColor: "#6f7070",
    marginVertical: 10,
  },
  eleBorder: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginVertical: 15,
    paddingVertical: 25,
    elevation: 1,
  },
});

export default OrderInfor;
