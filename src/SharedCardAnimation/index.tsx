import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  Text,
  Image,
} from "react-native";
import {
  Directions,
  FlingGestureHandler,
  FlingGestureHandlerStateChangeEvent,
  State,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { categories, travelData } from "../../data";
import Item, { ItemProps } from "./Item";
import Indicator from "./Indicator";
import {
  INDICATOR_SIZE,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  width,
  height,
} from "./constants";
import * as Animatable from "react-native-animatable";
import Header from "./Header";
import Avatar from "./Avatar";

interface IndexProps {}

const Index = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const animatedIndex = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [categoryId, setCategoryId] = useState(1);
  const cardsRef = useRef<Animatable.View & View>(null);
  const categoryIndicatorRef = useRef<Animatable.View & View>(null);
  const filteredTravelData = travelData.filter(
    ({ categoryId: id }) => id === categoryId
  );

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: animatedIndex,
      useNativeDriver: true,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }).start();
  });

  const setActiveIndex = React.useCallback((activeIndex) => {
    animatedIndex.setValue(activeIndex);
    setSelectedIndex(activeIndex);
  }, []);

  const updateCategory = useCallback((index) => {
    setActiveIndex(0);
    setCategoryId(index);
    if (
      cardsRef.current &&
      cardsRef.current.fadeIn &&
      categoryIndicatorRef.current &&
      categoryIndicatorRef.current.fadeIn
    ) {
      cardsRef.current.fadeIn(700);
      categoryIndicatorRef.current?.fadeIn(300);
    }
  }, []);

  const moveUp = (ev: FlingGestureHandlerStateChangeEvent) => {
    if (ev.nativeEvent.state === State.END) {
      if (selectedIndex === filteredTravelData.length - 1) return;
      setActiveIndex(selectedIndex + 1);
    }
  };

  const moveDown = (ev: FlingGestureHandlerStateChangeEvent) => {
    if (ev.nativeEvent.state === State.END) {
      if (selectedIndex === 0) return;
      setActiveIndex(selectedIndex - 1);
    }
  };
  return (
    <FlingGestureHandler
      key="UP"
      direction={Directions.UP}
      onHandlerStateChange={moveUp}
    >
      <FlingGestureHandler
        key="DOWN"
        direction={Directions.DOWN}
        onHandlerStateChange={moveDown}
      >
        <SafeAreaView
          style={[styles.container, { flex: 1, backgroundColor: "#1D1C1C" }]}
        >
          <StatusBar style="light" />
          <Image
            source={require("../../assets/t2.png")}
            style={[
              StyleSheet.absoluteFillObject,
              { width, height, opacity: 0.04 },
            ]}
          />
          <Header />
          <View>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id + ""}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      updateCategory(item.id);
                    }}
                  >
                    <View
                      key={item.id}
                      style={{
                        alignItems: "center",
                        paddingVertical: 20,
                        paddingLeft: (width - ITEM_WIDTH) / 2,
                        marginTop: 0,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: item.id === categoryId ? "#FFD600" : "white",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.name}
                        </Text>
                        {item.id === categoryId && (
                          <Animatable.View
                            ref={categoryIndicatorRef}
                            animation="fadeIn"
                            duration={1000}
                            style={{
                              width: INDICATOR_SIZE,
                              height: INDICATOR_SIZE,
                              borderRadius: INDICATOR_SIZE / 2,
                              alignSelf: "center",
                              backgroundColor: "#FFD600",
                              marginTop: 10,
                            }}
                          ></Animatable.View>
                        )}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
          <Animatable.View
            ref={cardsRef}
            style={{ flex: 1 }}
            animation="fadeIn"
            duration={1000}
          >
            <FlatList
              data={filteredTravelData}
              keyExtractor={(item) => item.id + ""}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignSelf: "center",
              }}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = {
                  zIndex: filteredTravelData.length - index,
                  left: -ITEM_WIDTH / 2,
                  top: -ITEM_HEIGHT / 2,
                };
                return (
                  <View style={[style, newStyle]} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({
                item,
                index,
              }: {
                item: ItemProps;
                index: number;
              }) => (
                <Item
                  {...item}
                  index={index}
                  selectedIndex={selectedIndex}
                  animatedValue={animatedValue}
                  travelData={filteredTravelData}
                />
              )}
            />
            <View
              style={{
                paddingHorizontal: (width - ITEM_WIDTH) / 2,
                flex: 0.15,
              }}
            >
              <Avatar style={{ paddingBottom: 10 }} />
            </View>
          </Animatable.View>

          <Indicator
            animatedValue={animatedValue}
            travelData={filteredTravelData}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Index;
