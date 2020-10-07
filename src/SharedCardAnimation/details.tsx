import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";

import { StyleSheet, Image, View, Text, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { RootStackParamList, RootStackScreenProps } from "../../navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AVATAR_SIZE, height, ITEM_WIDTH, width } from "./constants";
import Avatar from "./Avatar";
import { SharedCardScreensProp } from "./container";

export interface DescTextProps {
  meta: {
    title: string;
    value: string;
    scale: string;
  }[];
}

const DescText: React.FC<DescTextProps> = ({ meta }: DescTextProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 0.6,
      }}
    >
      {meta.map(({ title, value, scale }) => {
        return (
          <View style={{ marginHorizontal: 0 }} key={value}>
            <Text style={{ color: "white", marginBottom: 15 }}>{title}</Text>
            <View
              style={{
                flexDirection: "row",
                height: AVATAR_SIZE,
                alignItems: "flex-end",
              }}
            >
              <Text style={{ color: "white", fontSize: AVATAR_SIZE }}>
                {value}
              </Text>
              <Text style={{ color: "white" }}>{scale}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export interface DetailsProps {}

const Details = ({ navigation, route }: SharedCardScreensProp<"details">) => {
  const { item } = route.params;

  const topRef = useRef<Animatable.View & View>(null);
  const bottomRef = useRef<Animatable.View & View>(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <SharedElement id={`item.${item.id}.photo`}>
        <Image
          source={{ uri: item.poster }}
          style={[styles.itemImage, StyleSheet.absoluteFillObject]}
        />
      </SharedElement>

      <Animatable.View
        ref={topRef}
        useNativeDriver={true}
        animation="fadeIn"
        duration={800}
        delay={500}
        style={[StyleSheet.absoluteFillObject]}
      >
        <LinearGradient
          colors={["rgba(0,0,0, 0.3)", "#000"]}
          locations={[0.5, 0.75]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: height,
          }}
        ></LinearGradient>
        <View
          style={{
            paddingTop: insets.top + 20,
            paddingHorizontal: (width - ITEM_WIDTH) / 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (
                topRef.current &&
                topRef.current.fadeOut &&
                bottomRef.current &&
                bottomRef.current.fadeOut
              ) {
                Promise.all([
                  topRef.current.fadeOut(300),
                  bottomRef.current.fadeOut(300),
                ]).then(() => {
                  navigation.goBack();
                });
                return;
              }
              navigation.goBack();
            }}
          >
            <Ionicons name="ios-arrow-round-back" size={25} color="white" />
          </TouchableWithoutFeedback>
          <Image
            source={require("../../assets/face2.jpg")}
            style={styles.profileImage}
          />
        </View>
      </Animatable.View>

      <View style={[styles.bottomContainer]}>
        <View style={{ alignItems: "flex-start" }}>
          <SharedElement id={`item.${item.id}.text`}>
            <Text
              style={styles.itemText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.location}
            </Text>
          </SharedElement>
        </View>

        <Animatable.View
          ref={bottomRef}
          animation="fadeIn"
          useNativeDriver={true}
          duration={800}
          delay={700}
          style={[styles.bottomRow]}
        >
          <Avatar isStacked style={{ flex: 0.3 }} />
          <DescText meta={item.meta} />
        </Animatable.View>
      </View>
    </View>
  );
};

Details.sharedElements = (route: RouteProp<RootStackParamList, "details">) => {
  const { item } = route.params;
  return [`item.${item.id}.photo`, `item.${item.id}.text`];
};
const styles = StyleSheet.create({
  itemImage: {
    resizeMode: "cover",
    width,
    height,
  },
  container: {
    flex: 1,
    backgroundColor: "#1D1C1C",
  },
  avatarContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    resizeMode: "cover",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 40,
    flex: 1,
    width: width,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarText: {
    color: "white",
    marginBottom: 15,
  },
  itemText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  profileImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
});

export default Details;
