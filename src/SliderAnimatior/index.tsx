import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
} from "react-native";
import Animated, {
  interpolate,
  color,
  Extrapolate,
} from "react-native-reanimated";
import { useValue } from "react-native-redash";

const { width, height } = Dimensions.get("window");

const list = [
  {
    id: 1,
    title: "Vibrant colors",
    description: "Four on-trend colorways to seamlessly suit your style.",
    color: "#999",
    src: require("../../assets/urbanears_grey.png"),
  },
  {
    id: 2,
    title: "Redefined sound",
    description: "A bold statement tuned to perfection.",
    color: "#9dcdfa",
    src: require("../../assets/urbanears_blue.png"),
  },
  {
    id: 3,
    title: "Great quality",
    description:
      "An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology",
    color: "#a1e3a1",
    src: require("../../assets/urbanears_mint.png"),
  },
  {
    id: 4,
    title: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    color: "#db9efa",
    src: require("../../assets/urbanears_pink.png"),
  },
];

const INDICATOR_SIZE = 10;
const SPACING = 10;
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  indicatorContainer: {
    bottom: 20,
    padding: 10,
    position: "absolute",
    width: width,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
  },
  indicator: {
    backgroundColor: "#000",
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING,
  },
  indicatorMotion: {
    position: "absolute",
    width: 2 * INDICATOR_SIZE + SPACING,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    backgroundColor: "#000",
    left: 0,
  },
  indicatorGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: width,
    height: 0.5 * height,
    resizeMode: "contain",
  },
  textContainer: {
    alignSelf: "flex-end",
    width: 0.8 * width,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    color: "#444",
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    color: "#bbb",
    marginVertical: 20,
    lineHeight: 22,
  },
  circle: {
    position: "absolute",
    top: 50,
    width: 0.7 * width,
    height: 0.7 * width,
    borderRadius: (0.7 * width) / 2,
    alignSelf: "center",
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
});

type ItemProps = {
  id: number;
  title: string;
  description: string;
  index: number;
  color: string;
  src: number;
  scrollX: Animated.Value<number>;
};

const Item = ({
  color,
  src,
  title,
  description,
  scrollX,
  index,
}: ItemProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = interpolate(scrollX, {
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(scrollX, {
    inputRange: [(index - 0.3) * width, index * width, (index + 0.3) * width],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateXTitle = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  return (
    <View style={[styles.container]}>
      <Animated.Image
        source={src}
        style={[styles.image, { transform: [{ scale }] }]}
      />
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
            styles.description,
            { opacity, transform: [{ translateX: translateXDescription }] },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SlideAnimation = () => {
  const scrollX = useValue(0);
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.logo}
        source={require("../../assets/ue_black_logo.png")}
      />
      <Circle scrollX={scrollX} />
      <Header />
      <AnimatedFlatList
        keyExtractor={(item: ItemProps) => item.id + ""}
        data={list}
        renderItem={({ item, index }: { item: ItemProps; index: number }) => (
          <Item {...item} scrollX={scrollX} index={index} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />

      <Pagination scrollX={scrollX} />
    </View>
  );
};

type CircleProps = {
  scrollX: Animated.Value<number>;
};
const Circle = ({ scrollX }: CircleProps) => {
  return (
    <>
      {list.map(({ id, color }, index) => {
        const scale = interpolate(scrollX, {
          inputRange: [
            (index - 0.5) * width,
            index * width,
            (index + 0.5) * width,
          ],
          outputRange: [0, 1, 0],
        });
        const opacity = interpolate(scrollX, {
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={id}
            style={[
              styles.circle,
              { backgroundColor: color, opacity, transform: [{ scale }] },
            ]}
          />
        );
      })}
    </>
  );
};

type PaginationProps = {
  scrollX: Animated.Value<number>;
};

const Pagination = ({ scrollX }: PaginationProps) => {
  const translateX = interpolate(scrollX, {
    inputRange: [-width, 0, width],
    outputRange: [-(INDICATOR_SIZE + SPACING), 0, INDICATOR_SIZE + SPACING],
  });
  return (
    <View style={[styles.indicatorContainer]}>
      <View style={styles.indicatorGroup}>
        {list.map((indicator) => (
          <View style={styles.indicator} key={indicator.id} />
        ))}
        <View style={styles.indicator} />
        <Animated.View
          style={[styles.indicatorMotion, { transform: [{ translateX }] }]}
        />
      </View>
    </View>
  );
};

export default SlideAnimation;
