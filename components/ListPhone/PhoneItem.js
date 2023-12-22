import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const PhoneItem = ({ item }) => {
  const navigation = useNavigation();
  let priceNew = item.priceNew.toLocaleString("en-US");
  let priceOld = item.priceOld.toLocaleString("en-US");
  function itemPressHandler() {
    navigation.navigate("PhoneEditScreen", { phoneId: item.id });
  }
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity
        key={item.id}
        onPress={itemPressHandler}
        style={{ elevation: 5 }}
      >
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={
              typeof item.imgUri[0] === "number"
                ? item.imgUri[0]
                : { uri: item.imgUri[0] }
            }
          />
          <View style={styles.description}>
            <Text style={styles.titleText}>{item.name}</Text>
            <View>
              <Text>{priceNew}₫</Text>
              <Text style={{ textDecorationLine: "line-through" }}>
                {priceOld}₫
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    paddingVertical: 15,
    marginVertical: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  img: {
    objectFit: "contain",
    height: 175,
    width: 175,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    width: "100%",
  },
  description: {
    justifyContent: "space-evenly",
    height: "100%",
    width: "100%",
  },
});
export default PhoneItem;
