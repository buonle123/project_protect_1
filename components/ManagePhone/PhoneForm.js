import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { Dimensions } from "react-native";
import ButtonCustom from "../UI/ButtonCustom";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window");
const PhoneForm = ({ onCancel, onSubmit, buttonLabel, defaultValues }) => {
  const [open, setOpen] = useState(false);
  const [valueType, setValueType] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const [inputs, setInputs] = useState({
    name: { value: defaultValues ? defaultValues.name : "", isValid: true },
    priceNew: {
      value: defaultValues ? defaultValues.priceNew.toString() : "",
      isValid: true,
    },
    priceOld: {
      value: defaultValues ? defaultValues.priceOld.toString() : "",
      isValid: true,
    },
    quantity: {
      value: defaultValues ? defaultValues.quantity.toString() : "",
      isValid: true,
    },

    productInfo: {
      value: defaultValues ? defaultValues.productInfo : "",
      isValid: true,
    },
  });
  function inputChangeValue(inputIndentifier, enteredValue) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIndentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const phonesData = {
      name: inputs.name.value,
      priceNew: +inputs.priceNew.value,
      priceOld: +inputs.priceOld.value,
      quantity: +inputs.quantity.value,
      imgUri: imgUrl,
      typeProduct: valueType,
      productInfo: inputs.productInfo.value,
    };
    const isValiName = phonesData.name.length > 0;
    const isValiPriceNew =
      !isNaN(phonesData.priceNew) && phonesData.priceNew > 0;
    const isValiPriceOld =
      !isNaN(phonesData.priceOld) && phonesData.priceOld > 0;
    const isValiQuantity =
      !isNaN(phonesData.quantity) && phonesData.quantity > 0;
    const isValiProductInfo = phonesData.productInfo.length > 0;

    if (
      !isValiName ||
      !isValiPriceNew ||
      !isValiPriceOld ||
      !isValiQuantity ||
      !isValiProductInfo
    ) {
      Alert.alert("Invalid Input", "Please check your input Value");
      setInputs((currentInput) => {
        return {
          name: { value: currentInput.name.value, isValid: isValiName },
          priceNew: {
            value: currentInput.priceNew.value,
            isValid: isValiPriceNew,
          },
          priceOld: {
            value: currentInput.priceOld.value,
            isValid: isValiPriceOld,
          },
          quantity: {
            value: currentInput.quantity.value,
            isValid: isValiQuantity,
          },
          productInfo: {
            value: currentInput.productInfo.value,
            isValid: isValiProductInfo,
          },
        };
      });
      return;
    }
    onSubmit(phonesData);
  }
  const formIsInvalid =
    !inputs.name.isValid ||
    !inputs.priceNew.isValid ||
    !inputs.priceOld.isValid ||
    !inputs.quantity.isValid ||
    !inputs.productInfo.isValid;
  async function openLib() {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        console.error("Permission to access media library was denied");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        // Use the first asset's URI
        if (result.assets && result.assets.length > 0) {
          setImgUrl(result.assets.map((asset) => asset.uri));
        }
      }
    } catch (error) {
      console.error("Error opening image library:", error);
    }
  }

  function renderImgs() {
    if (imgUrl.length === 0) return;
    return imgUrl.map((img, i) => {
      return (
        <View key={i}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{
              uri: img,
            }}
          />
        </View>
      );
    });
  }
  return (
    <View style={styles.containerInput}>
      <Text style={styles.title}>Your Phone</Text>
      <View style={styles.containerPickerImg}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {renderImgs()}
        </ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={openLib}>
            <View style={styles.buttonCircleAdd}>
              <Text style={styles.iconAdd}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Input
        style={styles.rowInput}
        invalid={!inputs.name.isValid}
        label={"Name"}
        textInputConfig={{
          onChangeText: inputChangeValue.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <Input
        style={styles.rowInput}
        invalid={!inputs.priceNew.isValid}
        label={"Price New"}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeValue.bind(this, "priceNew"),
          value: inputs.priceNew.value,
        }}
      />
      <Input
        style={styles.rowInput}
        invalid={!inputs.priceOld.isValid}
        label={"Price Old"}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeValue.bind(this, "priceOld"),
          value: inputs.priceOld.value,
        }}
      />
      <Input
        style={styles.rowInput}
        invalid={!inputs.quantity.isValid}
        label={"Quantity"}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeValue.bind(this, "quantity"),
          value: inputs.quantity.value,
        }}
      />
      <Text style={{ marginLeft: 7, marginTop: 6, marginBottom: 8 }}>
        Type Product
      </Text>
      <DropDownPicker
        open={open}
        value={valueType}
        items={[
          { label: "Iphone", value: "Iphone" },
          { label: "Ipad", value: "Ipad" },
          { label: "MacBook", value: "MacBook" },
        ]}
        itemSeparatorStyle={{ borderRadius: 8 }}
        dropDownContainerStyle={{ borderRadius: 8, marginLeft: 15 }}
        onSelectItem={(item) => {
          setValueType(item.value);
          setOpen(false);
        }}
        onPress={() => {
          setOpen(!open);
        }}
        containerStyle={{ width: "100%", paddingHorizontal: 15 }}
      />
      <Input
        label={"Product Info"}
        invalid={!inputs.productInfo.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeValue.bind(this, "productInfo"),
          value: inputs.productInfo.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input value - please check entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <ButtonCustom style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </ButtonCustom>
        <ButtonCustom style={styles.button} onPress={submitHandler}>
          {buttonLabel}
        </ButtonCustom>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerInput: {},
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 8,
  },
  img: {
    minHeight: width * 0.5, // Set a maximum height
    minWidth: width * 0.5,
    maxHeight: width * 0.5, // Set a maximum height
    maxWidth: width * 0.5,
    alignSelf: "center",
  },
  containerPickerImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCircleAdd: {
    marginTop: 25,
    backgroundColor: "#ff4859",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconAdd: {
    color: "white",
    fontSize: 24,
  },
});

export default PhoneForm;
