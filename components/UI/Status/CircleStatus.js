import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicon from "react-native-vector-icons/Ionicons";

const CircleStatus = ({ icon, label, dots, active }) => {
  const statusStyle = active ? styles.activeStatus : styles.nonActiveStatus;
  return (
    <View style={{ alignItems: "center" }}>
      <Ionicon name={icon} size={18} style={[styles.iconBoder, statusStyle]} />
      <Text style={[styles.labelStatus, statusStyle]}>{label}</Text>
      <View style={styles.posiDot}>
        <Text style={[styles.dotStatus, statusStyle]}>{dots}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iconBoder: { borderWidth: 1, borderRadius: 20, padding: 7 },
  labelStatus: { fontSize: 13 },
  nonActiveStatus: { color: "#6f7070", borderColor: "#6f7070" },
  activeStatus: { color: "#046be8", borderColor: "#046be8" },
  dotStatus: {
    position: "absolute",
    right: -47,
    top: 2,
    letterSpacing: 0.25,
    fontSize: 15,
    fontWeight: "500",
  },
  posiDot: {
    backgroundColor: "red",
    width: 50,
    position: "absolute",
  },
});
export default CircleStatus;
