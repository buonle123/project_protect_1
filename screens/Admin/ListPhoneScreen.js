import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { dataProduct } from "../../data/data";
import PhoneItem from "../../components/ListPhone/PhoneItem";
import { PhoneContext } from "../../store/phone-context";
import { fetchPhones } from "../../util/http";

const ListPhoneScreen = () => {
  const phonesContext = useContext(PhoneContext);

  useEffect(() => {
    async function getPhones() {
      const phones = await fetchPhones();
      phonesContext.setPhones(phones);
    }
    getPhones();
  }, []);
  function listPhone(itemData) {
    const item = itemData.item;
    return <PhoneItem item={item} />;
  }
  console.log(phonesContext.phones);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={phonesContext.phones}
        keyExtractor={(itemData) => itemData.id}
        renderItem={listPhone}
      />
    </View>
  );
};

export default ListPhoneScreen;
