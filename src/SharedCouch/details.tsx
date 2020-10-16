import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import {  SharedCouchScreensProp, StackParamList } from ".";
import { height, ITEM_HEIGHT, ITEM_WIDTH, width } from "./constants";
import * as Animatable from 'react-native-animatable';
interface detailsProps {}

const Details = ({ navigation, route }:SharedCouchScreensProp<"details">) => {
  const { top } = useSafeAreaInsets();
  const { item } = route.params;
  const { title, id, description, price, image } = item;
  const scale = {
    0: {scale: 0.5, height: 0},
    1: {scale: 1, height: height * 0.4}
  }
  return (
    <View style={styles.container}>
    <View style={styles.circle}></View>
    <Animatable.View
      duration={500}
      animation={scale}
      style={styles.halfCircle}></Animatable.View>
    <View
      style={styles.box}></View>
    
    <View style={[styles.iconContainer, { paddingTop: top }]} >
      <TouchableWithoutFeedback onPress={() => navigation.navigate("home")}>
        <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableWithoutFeedback>
    </View>
    
    <SharedElement id={`item.${id}.image`} style={styles.itemImage}>
       <Image
        source={image}
        resizeMode="contain"
    />
   </SharedElement>
    
    <View
      style={styles.groupText}>
    <View style={styles.textContainer}>
          <Animatable.Text
            duration={700}
            delay={500}
            animation="fadeIn"
            style={styles.smallText}>
        chair143
      </Animatable.Text>
      <Animatable.View
        duration={500}
        delay={550}
        animation="fadeIn"
        style={styles.priceTitle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </Animatable.View>
          <Animatable.View
        duration={500}
        delay={550}
        animation="fadeIn"
          >
        <Text style={styles.smallText}>
          {description}
        </Text>
      </Animatable.View>
      </View>
        <Animatable.View
        duration={500}
        delay={550}
        animation="fadeIn">
          <TouchableOpacity  style={styles.button} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Buy</Text>
        <Ionicons name="ios-arrow-round-forward" size={24} color="white" />
      </TouchableOpacity>
      </Animatable.View>
      </View>
  </View>);
};


Details.sharedElements = (route: RouteProp<StackParamList, "details">) => {
  const { item } = route.params;
  return [`item.${item.id}.image`, ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
    position: "absolute",
    width,
    zIndex: 2,
    top: 0
  },
   circle: {
    position: "absolute",
    top: -height / 2,
    backgroundColor: "#ECF3FB",
    width: height,
    height: height,
    borderRadius: height,
  },
  halfCircle: {
    width ,
    height: height* 0.2 ,
    position: "absolute",
    borderRadius:  height,
    backgroundColor: 'white',
    top: (height * 0.5 - height * 0.4 * 0.5)
  }, 
  box: {
    width: width / 2,
    height: height * 0.25,
    position: "absolute",
    top: (height * 0.5 - height * 0.4 * 0.5),
    backgroundColor: 'white',
    left: 0
  },
  itemImage: {
    width: ITEM_WIDTH * 2,
    height: ITEM_HEIGHT * 1.5,
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: - ITEM_WIDTH * 0.4,
    top: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0B104E",
  },
  groupText: {
    flex: 0.4,
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  textContainer: {
    paddingHorizontal: 40,
  },
  smallText: {
    paddingVertical: 10,
    color: "#B8BAC4",
  },
  priceTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20

  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0B104E",
  },
  button: {
    width: "100%",
    backgroundColor: "#0B104E",
    opacity: 0.6,
    borderRadius: 40,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  buttonText: {
    color: 'white',
    marginRight: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold'
    
  }
});

export default Details;
