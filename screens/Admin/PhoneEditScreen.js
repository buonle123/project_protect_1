import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
// import { ExpenseContext } from '../store/context/expense-context'
import ButtonIcon from "../../components/UI/ButtonIcon";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneForm from "../../components/ManagePhone/PhoneForm";
import { PhoneContext } from "../../store/phone-context";
import { deletePhone, storePhones, updataPhone } from "../../util/http";
// import OverLayLoading from '../components/UI/OverLayLoading'
const PhoneEditScreen = ({ route, navigation }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const phonesContext = useContext(PhoneContext);
  const edtPhoneId = route.params?.phoneId;
  const isEditing = !!edtPhoneId;
  const selectPhone = phonesContext.phones.find((phone) => {
    return phone.id === edtPhoneId;
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Phone" : "Add Phone",
    });
  }, [navigation, isEditing]);
  async function deleteExpenseHandler() {
    // setIsSubmiting(true)
    await deletePhone(edtPhoneId);
    phonesContext.deletePhone(edtPhoneId);
    navigation.goBack();
  }
  function cancelExpenseHandler() {
    navigation.goBack();
  }
  async function confirmExpenseHandler(phonesData) {
    // setIsSubmiting(true)
    if (isEditing) {
      await updataPhone(edtPhoneId, phonesData);
      phonesContext.updataPhone(edtPhoneId, phonesData);
    } else {
      // const id = await storeExpense(phonesData)
      const id = await storePhones(phonesData);
      phonesContext.addPhone({ ...phonesData, id });
    }
    navigation.goBack();
  }

  // if (isSubmiting) return <OverLayLoading />
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        ListHeaderComponent={() => (
          <PhoneForm
            onCancel={cancelExpenseHandler}
            onSubmit={confirmExpenseHandler}
            buttonLabel={isEditing ? "Updata" : "Add"}
            defaultValues={selectPhone}
          />
        )}
        ListFooterComponent={() =>
          isEditing && (
            <View style={styles.deleteContainer}>
              <ButtonIcon
                icon={"trash"}
                size={36}
                color={"white"}
                onPress={deleteExpenseHandler}
              />
            </View>
          )
        }
        data={[]}
        keyExtractor={() => "Fake"}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6e6",
    padding: 24,
  },
  deleteContainer: {
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    marginTop: 8,
    paddingTop: 12,
  },
});

export default PhoneEditScreen;
