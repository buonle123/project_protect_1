import { FavoriteProductsProvider } from "./context/context";
import PhoneContextProvider from "./store/phone-context";
import AuthContextProvider from "./store/auth-context";
import Navigation from "./navigation/Navigation";
import DetailInforUser from "./screens/UserScreen/DetailInforUser";
import { OrderScreen } from "./screens";
import OrderStatus from "./components/UI/OrderStatus";
import Order from "./components/UI/Status/Orde1r";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <PhoneContextProvider>
          <FavoriteProductsProvider>
            <Navigation />
          </FavoriteProductsProvider>
        </PhoneContextProvider>
      </AuthContextProvider>
    </>
  );
}
