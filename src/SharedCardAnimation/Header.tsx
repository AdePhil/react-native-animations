import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { AVATAR_SIZE, ITEM_WIDTH, width } from "./constants";

interface HeaderProps {}

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TravelUp</Text>
      <Image
        source={require("../../assets/face2.jpg")}
        style={styles.profileImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: (width - ITEM_WIDTH) / 2,
    paddingTop: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    textTransform: "uppercase",
  },
  profileImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
});

export default Header;
