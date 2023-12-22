import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import Field from "../../components/InforUser/Field";
import RadioCustom from "../../components/InforUser/RadioCustom";
import ButtonCustom from "../../components/UI/ButtonCustom";

const { width, height } = Dimensions.get("window");

export default function DetailInforUser() {
  const [selectedValue, setSelectedValue] = useState("Nam");
  const [input, setInput] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  function onChangeInputHandler(entered, fieldInput) {
    setInput((prevInput) => ({
      ...prevInput,
      [fieldInput]: entered,
    }));
  }
  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };
  function saveInforUserHandler() {
    const infor = {
      name: input.name,
      address: input.address,
      email: input.email,
      phone: input.phone,
    };
  }
  return (
    <View style={st.container}>
      <View style={st.bgPosi}></View>
      <View style={[st.shadow]} className="bg-white rounded-xl">
        <View style={st.inforContainer}>
          <Field
            icon={"person-outline"}
            label={"Name"}
            infor={input.name}
            data={input.name}
            setData={onChangeInputHandler}
            mode={true}
          />
          <Field
            icon={"location-outline"}
            label={"Address"}
            infor={input.address}
            data={input.address}
            setData={onChangeInputHandler}
            mode={true}
          />
          <Field
            icon={"at-outline"}
            label={"Email"}
            infor={input.email}
            data={input.email}
            setData={onChangeInputHandler}
            mode={true}
          />
          <Field
            icon={"call-outline"}
            label={"Phone"}
            infor={input.phone}
            data={input.phone}
            setData={onChangeInputHandler}
            mode={true}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>Giới tính: </Text>
            <RadioCustom
              label={"Nam"}
              value={"Nam"}
              selectedValue={selectedValue}
              onChange={handleRadioButtonChange}
            />
            <RadioCustom
              label={"Nữ"}
              value={"Nữ"}
              selectedValue={selectedValue}
              onChange={handleRadioButtonChange}
            />
            <RadioCustom
              label={"Khác"}
              value={"Khác"}
              selectedValue={selectedValue}
              onChange={handleRadioButtonChange}
            />
          </View>
          <ButtonCustom
            style={st.btnStyle}
            mode={"flat"}
            onPress={() => console.log("xóa tài khoản lun mò")}
          >
            Xóa tài khoản
          </ButtonCustom>
          <ButtonCustom
            onPress={() =>
              console.log("giỏi bay biết lưu lại thông tin lun mò")
            }
          >
            Lưu Lại
          </ButtonCustom>
        </View>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    position: "relative",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inforContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerDrawer: {},
  shadow: {
    flex: 1,
    paddingVertical: 20,
    width: "90%",

    position: "absolute",
    top: 50,
    shadowColor: "#8c8c8c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 10,
  },
  bgPosi: {
    backgroundColor: "#FE5045",
    height: 250,
    width: "100%",

    right: 0,
    borderBottomStartRadius: 75,
    borderBottomRightRadius: 75,
    top: 0,
  },
  containerStatus: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textStatus: {
    fontSize: 12,
  },
  btnStyle: {
    marginVertical: 25,
  },
});

// Đơn hàng

// <View style={{}}>
// <TouchableOpacity
//   style={{
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderTopWidth: 2,
//     paddingVertical: 10,
//     borderColor: "#ccc",
//     marginVertical: 10,
//   }}
// >
//   <Ionicon
//     name="document-text-outline"
//     size={25}
//     color={"rgb(72, 138, 242)"}
//   />
//   <Text className="mx-3 font-medium">Đơn mua</Text>
//   <Ionicon
//     onPress={ShowipAddress}
//     size={18}
//     name={
//       showipAddress
//         ? "chevron-down-outline"
//         : "chevron-forward-outline"
//     }
//     style={{
//       position: "absolute",
//       right: 0,
//     }}
//   />
// </TouchableOpacity>
// <View
//   style={{
//     flexDirection: "row",
//     justifyContent: "space-between",
//   }}
// >
//   <TouchableOpacity style={st.containerStatus}>
//     <Ionicon name="cube-outline" size={25} color={"gray"} />
//     <Text style={st.textStatus}>Chờ xác nhận </Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={st.containerStatus}>
//     <Ionicon name="file-tray-outline" size={25} color={"gray"} />
//     <Text style={st.textStatus}>Chờ lấy hàng </Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={st.containerStatus}>
//     <Ionicon name="walk-outline" size={25} color={"gray"} />
//     <Text style={st.textStatus}>Chờ giao hàng</Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={st.containerStatus}>
//     <Ionicon
//       name="shield-checkmark-outline"
//       size={25}
//       color={"gray"}
//     />
//     <Text style={st.textStatus}>Đã giao </Text>
//   </TouchableOpacity>
// </View>
// </View>
