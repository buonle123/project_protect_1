import axios from "axios";
const BACKEND_URL =
  "https://project-one-mobile-b24d6-default-rtdb.firebaseio.com";
const API_KEY = "AIzaSyChTFUWBHGXKwn73idhHKjC_vmsKMxBD40";
export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
// export async function forgetPassWordByEmail(email) {
//   const response = await axios.post(
//     "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
//       API_KEY,
//     { email: email, requestType: "PASSWORD_RESET" }
//   );
//   console.log(!!response.data);
//   return response.data.oobCode;
// }

export async function forgetPassWordByEmail(email) {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
        API_KEY,
      { email: email, requestType: "PASSWORD_RESET" }
    );
    console.log("Response from forgetPassWordByEmail:", response.data);
    return response.data.oobCode;
  } catch (error) {
    console.error(
      "Error in forgetPassWordByEmail:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function resetPassWordResponse(oobCode, newPassWord) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=" +
      API_KEY,
    { oobCode: oobCode, newPassWord: newPassWord }
  );
}

export async function storePhones(phonesData) {
  const response = await axios.post(BACKEND_URL + "/phones.json", phonesData);
  const id = response.data.name;
  return id;
}
export async function fetchPhones() {
  const response = await axios.get(BACKEND_URL + "/phones.json");

  const phones = [];
  console.log(response.data);
  for (const key in response.data) {
    const phonesObj = {
      id: key,
      name: response.data[key].name,
      priceNew: response.data[key].priceNew,
      priceOld: response.data[key].priceOld,
      quantity: response.data[key].quantity,
      typeProduct: response.data[key].typeProduct,
      productInfo: response.data[key].productInfo,
    };
    phones.push(phonesObj);
  }
  return phones;
}

export function updataPhone(id, phonesData) {
  return axios.put(BACKEND_URL + `/phones/${id}.json`, phonesData);
}
export function deletePhone(id) {
  return axios.delete(BACKEND_URL + `/phones/${id}.json`);
}
