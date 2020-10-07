import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedCardNavigationProps } from ".";
import { AVATAR_SIZE, ITEM_WIDTH, width } from "./constants";

interface HeaderProps {}

const Header = () => {
  const navigation = useNavigation<SharedCardNavigationProps>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.heading}>TravelUp</Text>
      </TouchableOpacity>
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
