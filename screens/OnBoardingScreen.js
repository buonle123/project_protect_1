import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import { COLORS, SIZES } from "../constant/index";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import data from "../data/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OnBoardingScreen() {
  const navigation = useNavigation();
  const flatListRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const handlerViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems);
  });
  function handlerNextContent() {
    if (currentPage == data.length - 1) return;

    flatListRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  }
  function handlerBackContent() {
    if (currentPage == 0) return;

    flatListRef.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  }
  function handlerSkipContent() {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: data.length - 1,
    });
  }
  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  function renderTopSection() {
    return (
      <SafeAreaView>
        <View style={styles.topSection}>
          {/* Back button */}
          <TouchableOpacity
            style={{ padding: SIZES.base }}
            onPress={handlerBackContent}
          >
            <AntDesignIcons
              name="left"
              style={{
                fontSize: 25,
                color: COLORS.black,
                opacity: currentPage == 0 ? 0 : 1,
              }}
            />
          </TouchableOpacity>
          {/* Skip button */}
          <TouchableOpacity onPress={handlerSkipContent}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                opacity: currentPage == data.length - 1 ? 0 : 1,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  async function handlerStart() {
    await AsyncStorage.setItem("Skipped", "true");
    navigation.navigate("LoginScreen");
  }
  function renderBottomSection() {
    return (
      <SafeAreaView>
        <View style={styles.bottomSection}>
          {/* pagination */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {[...Array(data.length)].map((dot, index) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginRight: 8,
                  backgroundColor:
                    index == currentPage
                      ? COLORS.primary
                      : COLORS.primary + "50",
                }}
              ></View>
            ))}
          </View>
          {/* Next or GetStarted button */}

          {/* Show or hide next button && GetStarted button by screen */}
          {currentPage != data.length - 1 ? (
            <TouchableOpacity
              style={styles.nextBottom}
              activeOpacity={0.8}
              onPress={handlerNextContent}
            >
              <AntDesignIcons
                name="right"
                style={{ fontSize: 18, color: COLORS.white, opacity: 0.3 }}
              ></AntDesignIcons>
              <AntDesignIcons
                name="right"
                style={{ fontSize: 25, color: COLORS.white, marginLeft: -15 }}
              ></AntDesignIcons>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonGetStarted}
              onPress={handlerStart}
            >
              <Text style={styles.textButtonGetStarted}>GetStarted</Text>
              <AntDesignIcons
                name="right"
                style={{
                  fontSize: 18,
                  color: COLORS.white,
                  opacity: 0.3,
                  marginLeft: SIZES.base,
                }}
              ></AntDesignIcons>
              <AntDesignIcons
                name="right"
                style={{ fontSize: 25, color: COLORS.white, marginLeft: -15 }}
              ></AntDesignIcons>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
  function renderFlatListItem({ item }) {
    return (
      <View style={styles.containerFlatList}>
        <View style={{ alignItems: "center", marginVertical: SIZES.base * 2 }}>
          <ImageBackground source={item.img} style={styles.imageContent} />
        </View>
        <View style={styles.paddingAll}>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textDescription}>{item.description}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* TOP SECTION - Back & Skip Button */}
      {renderTopSection()}
      {/* FLAT LIST with pages */}
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatListItem}
        ref={flatListRef}
        onViewableItemsChanged={handlerViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialNumToRender={100}
        extraData={SIZES.width}
      />
      {/* BOTTOM SECTION - pagination & next or GetStarted button */}
      {renderBottomSection()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.base * 2,
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base * 2,
  },
  nextBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  containerFlatList: {
    width: SIZES.width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContent: {
    height: 335,
    width: 335,
    resizeMode: "contain",
  },
  paddingAll: {
    paddingHorizontal: SIZES.base * 4,
    paddingVertical: SIZES.base * 4,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  textDescription: {
    fontSize: 18,
    opacity: 0.4,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 24,
  },
  buttonGetStarted: {
    paddingHorizontal: SIZES.base * 2,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonGetStarted: {
    color: COLORS.white,
    fontSize: 18,
    marginLeft: SIZES.base,
  },
});
export default OnBoardingScreen;
