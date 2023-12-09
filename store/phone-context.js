import { createContext, useReducer } from "react";

export const PhoneContext = createContext({
  phones: [],
  addPhone: ({
    name,
    priceNew,
    priceOld,
    quantity,
    imgUri,
    typeProduct,
    productInfo,
  }) => {},
  setPhones: (phones) => {},
  updataPhone: (
    id,
    { name, priceNew, priceOld, imgUri, quantity, typeProduct, productInfo }
  ) => {},
  deletePhone: (id) => {},
});
function phonesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "UPDATA":
      const updatablePhoneIndex = state.findIndex(
        (phone) => phone.id === action.payload.id
      );
      const updatablephone = state[updatablePhoneIndex];
      const updataItem = { ...updatablephone, ...action.payload.data };
      const updatablePhones = [...state];
      updatablePhones[updatablePhoneIndex] = updataItem;
      return updatablePhones;
    case "DELETE":
      return state.filter((phone) => phone.id !== action.payload);
    default:
      return state;
  }
}
function PhoneContextProvider({ children }) {
  const [phonesState, dispatch] = useReducer(phonesReducer, []);

  function addPhone(phonesData) {
    dispatch({ type: "ADD", payload: phonesData });
  }
  function setPhones(phonesData) {
    dispatch({ type: "SET", payload: phonesData });
  }
  function updataPhone(id, phonesData) {
    dispatch({ type: "UPDATA", payload: { id: id, data: phonesData } });
  }
  function deletePhone(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  const value = {
    phones: phonesState,
    addPhone: addPhone,
    setPhones: setPhones,
    updataPhone: updataPhone,
    deletePhone: deletePhone,
  };
  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
}

export default PhoneContextProvider;
