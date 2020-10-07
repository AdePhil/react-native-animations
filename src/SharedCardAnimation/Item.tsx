import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
// import { travelData } from "../../data";
import { ITEM_HEIGHT, ITEM_WIDTH, VISIBLE_ITEMS } from "./constants";
import * as React from "react";
import { SharedCardNavigationProps } from "./container";

export interface ItemProps {
  index: number;
  poster: string;
  id: number;
  animatedValue: Animated.Value;
  selectedIndex: number;
  location: string;
  travelData: {}[];
}

const Item = ({
  id,
  poster,
  index,
  animatedValue,
  selectedIndex,
  location,
  travelData,
}: ItemProps) => {
  const navigation = useNavigation<SharedCardNavigationProps<"index">>();
  const inputRange = [index - 1, index, index + 1];

  const translateY = animatedValue.interpolate({
    inputRange: [index - 1 / VISIBLE_ITEMS, index, index + 1 / VISIBLE_ITEMS],
    outputRange: [-11, 0, 11],
  });

  const opacity = animatedValue.interpolate({
    inputRange,
    outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
  });

  const scale = animatedValue.interpolate({
    inputRange,
    outputRange: [0.89, 1, 1.1],
  });
  return (
    <Animated.View
      style={[
        styles.itemContainer,
        { opacity, transform: [{ translateY }, { scale }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("details", { item: travelData[selectedIndex] })
        }
      >
        <SharedElement id={`item.${id}.photo`}>
          <Image source={{ uri: poster }} style={styles.itemImage} />
        </SharedElement>
        <SharedElement id={`item.${id}.text`}>
          <Text style={styles.itemText} numberOfLines={1} adjustsFontSizeToFit>
            {location}
          </Text>
        </SharedElement>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    position: "absolute",
  },
  itemImage: {
    resizeMode: "cover",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
  },
  itemText: {
    fontSize: 25,
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default Item;
