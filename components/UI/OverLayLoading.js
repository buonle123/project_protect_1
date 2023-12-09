import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const OverLayLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={"#FF5678"} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
});
export default OverLayLoading;
