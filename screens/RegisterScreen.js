import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constant/index";
import RegisterSvg from "../assets/images/imgAuth/registration.svg";
import GoogleSvg from "../assets/images/imgAuth/google.svg";
import FacebookSvg from "../assets/images/imgAuth/facebook.svg";
import TwitterSvg from "../assets/images/imgAuth/twitter.svg";
import { CustomButtonAuth, InputField } from "../components";
import { createUser } from "../util/http";
import OverLayLoading from "../components/UI/OverLayLoading";
import { AuthContext } from "../store/auth-context";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    fullName: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    pass: { value: "", isValid: true },
    rPass: { value: "", isValid: true },
  });
  const authContext = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  function changeInputHandler(entered, input) {
    setInputs((prevInput) => ({
      ...prevInput,
      [input]: { value: entered, isValid: true },
    }));
  }
  async function signUpHandler(email, pass) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, pass);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed", "Could not log your in");
    }
    setIsAuthenticating(false);
  }
  function SubmitRegisterHandler() {
    const isValiFullname = inputs.fullName.value.length > 0;
    const isValiEmail =
      inputs.email.value.length > 0 && inputs.email.value.match(/\S+@\S+\.\S+/);
    const isValiPhone = inputs.phone.value.length >= 10;
    const isValiPass = inputs.pass.value.length > 5;
    const isValiRpass =
      inputs.rPass.value.length > 5 && inputs.rPass.value === inputs.pass.value;
    if (
      !isValiEmail ||
      !isValiPhone ||
      !isValiPass ||
      !isValiRpass ||
      !isValiFullname
    ) {
      setInputs((prevInput) => ({
        ...prevInput,
        fullName: {
          value: inputs.fullName.value,
          isValid: isValiFullname,
        },
        email: {
          value: inputs.email.value,
          isValid: isValiEmail,
        },
        phone: {
          value: inputs.phone.value,
          isValid: isValiPhone,
        },
        pass: {
          value: inputs.pass.value,
          isValid: isValiPass,
        },
        rPass: {
          value: inputs.rPass.value,
          isValid: isValiRpass,
        },
      }));
    } else signUpHandler(inputs.email.value, inputs.pass.value);
  }
  if (isAuthenticating) {
    return <OverLayLoading />;
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />
        <View style={{ alignItems: "center" }}>
          <RegisterSvg
            width={300}
            height={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          />
        </View>
        <Text style={styles.titleRegister}>Register</Text>

        <InputField
          label={"Full Name"}
          nameInput={"fullName"}
          value={inputs.fullName.value}
          onChange={changeInputHandler}
          error={inputs.fullName.isValid ? null : "please"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={"Email ID"}
          nameInput={"email"}
          onChange={changeInputHandler}
          value={inputs.email.value}
          keyBoardType={"email-address"}
          error={inputs.email.isValid ? null : "please"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={"Phone Number"}
          value={inputs.phone.value}
          nameInput={"phone"}
          onChange={changeInputHandler}
          keyBoardType={"numeric"}
          error={inputs.phone.isValid ? null : "please"}
          icon={
            <Ionicons
              name="call-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={"Pass word"}
          value={inputs.pass.value}
          nameInput={"pass"}
          onChange={changeInputHandler}
          inputType={"PassWord"}
          error={inputs.pass.isValid ? null : "please"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={"Confirm PassWord"}
          nameInput={"rPass"}
          value={inputs.rPass.value}
          onChange={changeInputHandler}
          inputType={"PassWord"}
          error={inputs.rPass.isValid ? null : "please"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <CustomButtonAuth label={"Register"} onPress={SubmitRegisterHandler} />
        <Text style={styles.textLoginWith}>Or, Register with other...</Text>

        <View style={styles.containerLoginMedia}>
          <TouchableOpacity onPress={() => {}} style={styles.loginMedia}>
            <GoogleSvg width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.loginMedia}>
            <FacebookSvg width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.loginMedia}>
            <TwitterSvg width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerRegister}>
          <Text>Already register?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.textRegister}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleRegister: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
  textLogin: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
  textLoginWith: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  containerLoginMedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  loginMedia: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  containerRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  textRegister: {
    color: COLORS.primary,
    fontWeight: "700",
    marginLeft: 5,
  },
  calendarInput: {
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
});

export default RegisterScreen;

//   function toggleDatePicker() {
//     setOpen(!open);
//   }
//   function onChangeDate({ type }, selectedDate) {
//     console.log(type);
//     console.log(selectedDate);
//     if (type == "set") {
//       const currentDate = selectedDate;
//       setDate(currentDate);
//       if (Platform.OS === "android") {
//         toggleDatePicker();
//         setDobLabel(currentDate.toDateString());
//       }
//     } else {
//       console.log("non");
//       toggleDatePicker();
//     }
//   }

{
  /* <View style={styles.calendarInput}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={toggleDatePicker}>
            <Text style={{ color: "#666" }}>{dobLabel}</Text>
          </TouchableOpacity>
        </View> */
}
{
  /* {open && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChangeDate}
            maximumDate={new Date()}
            minimumDate={new Date("1960-01-01")}
          />
        )} */
}
