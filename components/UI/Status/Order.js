import { StatusBar } from "react-native";
import React, { useState } from "react";
import OrderStatus from "../OrderStatus";
import { SafeAreaView } from "react-native";
import OrderCart from "../../../screens/Order/OrderCart";
import OrderInfor from "../../../screens/Order/OrderInfor";
import OrderPayment from "../../../screens/Order/OrderPayment";
import OrderComplete from "../../../screens/Order/OrderComplete";
import Popup from "../../Popup";
const Order = () => {
  const [isActive, setIsActive] = useState(1);
  const [showPopup, setShowPopup] = useState(true);
  function increasePage() {
    setIsActive(isActive + 1);
  }
  function PageSwitchHanlder({ page }) {
    switch (page) {
      case 1:
        return <OrderCart onChange={increasePage} />;
      case 2:
        return <OrderInfor onChange={increasePage} />;
      case 3:
        return <OrderPayment onChange={increasePage} />;
      case 4:
        return <OrderComplete onChange={increasePage} />;
      default:
        return (
          <Popup
            title={"Bạn đã tất quá trình đặt hàng"}
            isVisible={showPopup}
            onClose={() => {
              setShowPopup(false);
              setIsActive(1);
            }}
          />
        );
    }
  }
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <OrderStatus active={isActive} />
      <PageSwitchHanlder page={isActive} />
    </SafeAreaView>
  );
};

export default Order;
