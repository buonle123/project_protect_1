import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const Popup = ({ isVisible, onClose, title, message, imageUrl }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {title && <Text style={styles.title}>{title}</Text>}
          {imageUrl && (
            <View style={[styles.containerImg, { marginVertical: 15 }]}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
          )}
          {message && <Text style={styles.message}>{message}</Text>}
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { width: 100 }]}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff4859",
    borderRadius: 5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerImg: {
    alignItems: "center",
  },
});

export default Popup;
