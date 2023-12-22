import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Field from "../../../components/InforUser/Field";
import Ionicon from "react-native-vector-icons/Ionicons";
import Rank from "../../../components/Ranker/Rank";

export default function HomeProfileUser() {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 15, backgroundColor: "white" }}
      >
        {/* Avatar - name - phone */}
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.containerImg}
            source={{
              uri: "https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2023/10/22/rb9qqph9p25xoloseelboy0gg5o0kem47rojgczy27xjvstmfu7fckdm9s6hmi21hjibo9xqxb0u80-1696520026011118970012-1697940999439698204216-0-0-671-1280-crop-16979416206401146705732.jpg",
            }}
          />
          <View style={styles.containerPickImg}>
            <TouchableOpacity style={styles.boderPicker}>
              <Ionicon name="camera-reverse-outline" size={20} />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{"Suzy"}</Text>
            <Text style={{ fontSize: 18, fontWeight: "300" }}>
              {"0826196779"}
            </Text>
          </View>
          <Rank point={"99999"} />
        </View>

        {/* Field Navi */}
        <View style={{ padding: 25 }}>
          <Field
            icon={"person-circle-outline"}
            label={"Thông tin tài khoản"}
            navigation={() => {
              console.log("haha");
            }}
          />
          <Field
            icon={"git-branch-outline"}
            label={"Hệ thống của tôi"}
            navigation={() => {
              console.log("haha");
            }}
          />
          <Field
            icon={"medal-outline"}
            label={"Điểm thưởng"}
            mode={true}
            navigation={() => {
              console.log("haha");
            }}
          />
          <Field
            icon={"help-buoy-outline"}
            label={"Đổi thưởng"}
            navigation={() => {
              console.log("haha");
            }}
          />
          <Field
            icon={"location-outline"}
            label={"Địa chỉ nhận hàng"}
            navigation={() => {
              console.log("haha");
            }}
          />
          <Field
            icon={"reader-outline"}
            label={"Đơn đặt hàng"}
            navigation={() => {
              console.log("haha");
            }}
          />
          <Field
            icon={"lock-closed-outline"}
            label={"Đổi mật khẩu"}
            navigation={() => {
              console.log("haha");
            }}
          />
          <Field
            icon={"stopwatch-outline"}
            label={"Lịch sử đánh giá sản phẩm"}
          />
          <Field
            icon={"log-out-outline"}
            label={"Đăng xuất"}
            logout={true}
            navigation={() => console.log("haha")}
          />
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  containerImg: {
    height: 115,
    width: 115,
    borderRadius: 115,
  },
  containerPickImg: {
    height: 115,
    width: 115,
    borderRadius: 115,
    position: "absolute",
  },
  boderPicker: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f8f8f8",
    padding: 7,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#ddd",
  },
});
