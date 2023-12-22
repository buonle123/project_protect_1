import { View, Text, Image } from "react-native";
import React from "react";

const Rank = ({ point }) => {
  return (
    <View
      style={{
        backgroundColor: "#cccc",
        width: "100%",
        height: 85,
        borderRadius: 25,
        padding: 15,
        flexDirection: "row",
      }}
    >
      <View style={{ justifyContent: "center" }}>
        <Image
          height={65}
          width={65}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/473/473406.png",
          }}
        />
      </View>
      <View style={{ justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {point} Điểm - {"Bạc"}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "400", flexWrap: "wrap" }}>
          {"Bạn cần 99999 Điểm nữa để lên hạng tiếp theo"}
        </Text>
      </View>
    </View>
  );
};

export default Rank;
