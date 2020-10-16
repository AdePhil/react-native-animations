import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Text,
} from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { SharedCouchScreenProps } from ".";
import { INDICATOR_SIZE, ITEM_WIDTH } from "../SharedCardAnimation/constants";
import { height, ITEM_HEIGHT, width } from "./constants";
import data from "./data";

interface homeProps {}

const home = ({navigation}: SharedCouchScreenProps<"home">) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
      <Header />
      <Animated.FlatList
        style={{ flex: 1, height }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        data={data}
        bounces={false}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item: { image, id, title, price, description }, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
          });

          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 0.3) * width,
              index * width,
              (index + 0.3) * width,
            ],
            outputRange: [0, 1, 0],
          });

          const translateXTitle = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.5, 0, -width * 0.5],
          });
          const translateXDescription = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.2, 0, -width * 0.2],
          });
          return (

            <View key={id} style={styles.itemContainer}>
            <TouchableWithoutFeedback  onPress={() => navigation.navigate("details", { item: { id, image, title, price, description } })}>
              
                <Animated.View style={[styles.itemImage, {transform: [{ scale }] }]}>
                <SharedElement id={`item.${id}.image`} >
                  <Image
                      source={image}
                      style={styles.itemImage}
                      />
                  </SharedElement>
                </Animated.View>
              <View style={[styles.textContainer]}>
                <Animated.Text
                  style={[
                    styles.title,
                    { opacity, transform: [{ translateX: translateXTitle }] },
                  ]}
                >
                  {title}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.price,
                    {
                      opacity,
                      transform: [{ translateX: translateXDescription }],
                    },
                  ]}
                >
                  {price}
                </Animated.Text>
              </View>
              </TouchableWithoutFeedback>
              </View>
          );
        }}
      />
      <Pagination scrollX={scrollX} />
    </View>
  );
};

const Header = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: top }]}>
      <Fontisto name="nav-icon-grid-a" size={20} color="#0B104E" />
      <View style={styles.headerText}>
        <Text style={[styles.title]}>Result</Text>
      </View>
      <Ionicons name="ios-search" size={20} color="#0B104E" />
    </View>
  );
};

type PaginationProps = {
  scrollX: Animated.Value;
};

const Pagination = ({ scrollX }: PaginationProps) => {
  return (
    <View style={[styles.indicatorContainer]}>
      {data.map((item, i) => {
        const opacity = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.indicator, { opacity }]}
            key={item.id}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
  indicator: {
    backgroundColor: "#0B104E",
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    marginHorizontal: 5,
  },

  circle: {
    position: "absolute",
    top: -height / 2,
    backgroundColor: "#ECF3FB",
    width: height,
    height,
    borderRadius: height / 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  textContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0B104E",
  },
  price: {
    paddingVertical: 10,
    color: "#B8BAC4",
  },
  itemImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "contain",
    alignSelf: "center",
  },
  itemContainer: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default home;
