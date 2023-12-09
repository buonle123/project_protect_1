import React, { useContext, useEffect, useState } from "react";
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
import { InputField, CustomButtonAuth } from "../components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constant/index";
import LoginSvg from "../assets/images/imgAuth/login.svg";
import GoogleSvg from "../assets/images/imgAuth/google.svg";
import FacebookSvg from "../assets/images/imgAuth/facebook.svg";
import TwitterSvg from "../assets/images/imgAuth/twitter.svg";
import { login } from "../util/http";
import OverLayLoading from "../components/UI/OverLayLoading";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
    pass: { value: "", isValid: true },
  });

  const [isRemember, setIsRemember] = useState(false);
  const [savedLogin, setSavedLogin] = useState(false);

  async function getDataAsyncCheckBox() {
    try {
      const asyncRemember = await AsyncStorage.getItem("saveRemember");
      const asyncLogin = await AsyncStorage.getItem("saveLogin");
      setIsRemember(asyncRemember === "true");
      setSavedLogin(asyncRemember === "true");
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  }

  const authContext = useContext(AuthContext);

  const toggleRememberMe = () => {
    setIsRemember((prevIsRemember) => !prevIsRemember);
  };
  useEffect(() => {
    getDataAsyncCheckBox();
  }, [navigation]);
  useEffect(() => {
    if (isRemember && savedLogin) {
      getEmailAndPasswordData();
    }
  }, [isRemember, savedLogin, navigation]);
  function setEmailAndPasswordData(email, pass) {
    AsyncStorage.setItem("emailData", email);
    AsyncStorage.setItem("passData", pass);
    AsyncStorage.setItem("saveRemember", isRemember.toString());
    AsyncStorage.setItem("saveLogin", isRemember.toString());
    setSavedLogin(true);
  }
  async function getEmailAndPasswordData() {
    const emailData = await AsyncStorage.getItem("emailData");
    const passData = await AsyncStorage.getItem("passData");
    if (emailData && passData) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        email: { value: emailData, isValid: true },
        pass: { value: passData, isValid: true },
      }));
      setSavedLogin(true);
    }
  }
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  function changeInputHandler(entered, input) {
    setInputs((prevInput) => ({
      ...prevInput,
      [input]: { value: entered, isValid: true },
    }));
  }
  async function signInHandler(email, pass) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, pass);
      AsyncStorage.setItem("KeepLogged", JSON.stringify(token));
      if (isRemember) {
        setEmailAndPasswordData(email, pass);
      } else {
        AsyncStorage.setItem("saveRemember", "false");
        AsyncStorage.setItem("saveLogin", "false");
      }
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed", "haha");
    }
    setIsAuthenticating(false);
  }
  async function SubmitLoginHandler() {
    const isValiEmail =
      inputs.email &&
      inputs.email.value !== undefined &&
      inputs.email.value.length > 0 &&
      inputs.email.value.match(/\S+@\S+\.\S+/) !== null;
    const isValiPass =
      inputs.pass &&
      inputs.pass.value !== undefined &&
      inputs.pass.value.length > 5;
    if (!isValiEmail || !isValiPass) {
      setInputs((prevInput) => ({
        ...prevInput,
        email: {
          value: inputs.email ? inputs.email.value : "",
          isValid: isValiEmail,
        },
        pass: {
          value: inputs.pass ? inputs.pass.value : "",
          isValid: isValiPass,
        },
      }));
    }
    if (isValiEmail && isValiPass) {
      await signInHandler(inputs.email.value, inputs.pass.value);
      if (authContext.isAuthenticated) {
        navigation.navigate("HomeScreen");
      }
    }
  }
  if (isAuthenticating) {
    return <OverLayLoading />;
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView style={{ paddingHorizontal: 25 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />
        <View style={{ alignItems: "center" }}>
          <LoginSvg
            width={300}
            height={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          />
        </View>
        <Text style={styles.titleLogin}>Login</Text>
        <InputField
          label={"Email ID"}
          keyBoardType={"email-address"}
          nameInput={"email"}
          value={inputs.email.value}
          onChange={changeInputHandler}
          error={inputs.email.isValid ? null : "Please"}
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
          label={"PassWord"}
          onChange={changeInputHandler}
          error={inputs.pass.isValid ? null : "Please"}
          nameInput={"pass"}
          value={inputs.pass.value}
          inputType={"PassWord"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          fieldButtonLabel={"Forget?"}
          fieldButtonFunction={() => navigation.navigate("ForgetScreen")}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleRememberMe} style={styles.checkbox}>
            {isRemember ? (
              <Ionicons
                name="checkbox-outline"
                size={20}
                color={COLORS.primary}
              />
            ) : (
              <Ionicons name="square-outline" size={20} color="#666" />
            )}
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </TouchableOpacity>
        </View>
        <CustomButtonAuth label={"Login"} onPress={SubmitLoginHandler} />
        <Text style={styles.textLoginWith}>Or, login with...</Text>
        <View style={styles.containerLoginMedia}>
          <TouchableOpacity onPress={() => { }} style={styles.loginMedia}>
            <GoogleSvg width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }} style={styles.loginMedia}>
            <FacebookSvg width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }} style={styles.loginMedia}>
            <TwitterSvg width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerRegister}>
          <Text>New to the app? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={styles.textRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleLogin: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
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
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
