import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const NotiScreen = ({
  iconImg,
  title,
  message,
  labelBtn,
  onPress,
  idOrder,
  labelClick,
  labelPress,
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image style={{ width: 175, height: 175 }} source={iconImg} />
        <Text style={{ color: "#00bf15", fontWeight: "bold", fontSize: 24 }}>
          {title}
        </Text>
        <Text
          style={{
            color: "#3327",
            fontSize: 16,
            textAlign: "center",
            marginVertical: 5,
          }}
        >
          {message}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            textAlign: "center",
            marginVertical: 5,
            fontWeight: "bold",
          }}
        >
          Mã đơn hàng: {idOrder}
        </Text>
        <TouchableOpacity onPress={labelPress}>
          <Text
            style={{
              color: " rgb(55 128 216)",
              fontSize: 16,
              textAlign: "center",
              marginVertical: 5,
              fontWeight: "500",
            }}
          >
            {labelClick}
          </Text>
        </TouchableOpacity>
      </View>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
          <Text style={styles.labelBtn}>{labelBtn}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#2378de",
    width: "80%",
    padding: 15,
    borderRadius: 7,
    marginBottom: 25,
  },
  labelBtn: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
});
export default NotiScreen;
