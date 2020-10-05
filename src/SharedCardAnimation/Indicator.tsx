import React from "react";
import { Animated, View, Dimensions, StyleSheet } from "react-native";
import { INDICATOR_SIZE } from "./constants";

export interface IndicatorProps {
  animatedValue: Animated.Value;
  travelData: {
    id: number;
  }[];
}

const { width, height } = Dimensions.get("window");

const Indicator: React.FC<IndicatorProps> = ({
  animatedValue,
  travelData,
}: IndicatorProps) => {
  return (
    <View style={styles.indicatorContainer}>
      {travelData.map(({ id }, index) => {
        const inputRange = [index - 1, index, index + 1];
        const opacity = animatedValue.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.indicator, { opacity }]}
            key={id}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  indicatorContainer: {
    position: "absolute",
    right: 0,
    width: 30,
    height,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "180deg" }],
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    backgroundColor: "white",
    borderRadius: INDICATOR_SIZE / 2,
    marginBottom: 10,
  },
});
