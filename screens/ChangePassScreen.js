import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButtonAuth, InputField } from "../components";
import { COLORS } from "../constant";
import ButtonCustom from "../components/UI/ButtonCustom";

const ChangePassScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#e9e9e9" }}
    >
      <View
        style={{
          paddingHorizontal: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.white} />
        <View
          style={{
            alignItems: "center",
            marginBottom: 30,
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 125,
              height: 125,
              marginLeft: 25,
              marginBottom: 25,
            }}
            source={require("../assets/images/imgAuth/tick.png")}
          />
          <Text>Please check your mail to change pass </Text>
          <ButtonCustom
            onPress={() => navigation.navigate("LoginScreen")}
            mode={"flat"}
          >
            Back Login
          </ButtonCustom>
          {/* <InputField label={'New PassWord'} inputType={'PassWord'} keyBoardType={'email-address'}
                    icon={<Ionicons name="lock-open-outline" size={20} color="#666" style={{ marginRight: 5 }} />} />
                <InputField label={'Confirm New PassWord'} inputType={'PassWord'} keyBoardType={'email-address'}
                    icon={<Ionicons name="lock-open-outline" size={20} color="#666" style={{ marginRight: 5 }} />} />
                <CustomButtonAuth label={'Submit'} onPress={() => { }} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonBackHome: { backgroundColor: "white" },
});

export default ChangePassScreen;
