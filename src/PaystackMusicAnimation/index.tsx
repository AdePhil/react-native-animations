import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolate,
  Extrapolate,
  color,
} from "react-native-reanimated";
import {
  Circle,
  Text as SvgText,
  TextPath,
  TSpan,
  Text as T,
  Path,
  G,
  Svg,
} from "react-native-svg";
import { useValue, interpolateColor } from "react-native-redash";
const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_HEIGHT = height * 0.5;
const ITEM_WIDTH = width * 0.8;

const list = [
  // {
  //   id: 11,
  //   title: "Vibrant colors",
  //   description: "Four on-trend colorways to seamlessly suit your style.",
  //   color: "red",
  //   spacer: true,
  // },
  {
    id: 1,
    title: "Vibrant colors",
    description: "Four on-trend colorways to seamlessly suit your style.",
    color: "#264653",
    color1: "#c24c9b",
    color2: "#c24c60",
    month: "july",
    year: 2019,
  },
  {
    id: 2,
    title: "Redefined sound",
    description: "A bold statement tuned to perfection.",
    color: "#5ba7cd",
    color1: "#5ba7cd",
    color2: "#5b6ecd",
    month: "june",
    year: 2020,
  },
  {
    id: 3,
    title: "Great quality",
    description:
      "An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology",
    color: "#03045e",
    color1: "#c32222",
    color2: "#c32273",
    month: "may",
    year: 2020,
  },
  {
    id: 4,
    title: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    color: "tomato",
    color1: "#d6dc98",
    color2: "#b5dc98",
    month: "april",
    year: 2020,
  },
  {
    id: 5,
    title: "Redefined sound",
    description: "A bold statement tuned to perfection.",
    color: "red",
    color1: "#b99b41",
    color2: "#b99b41",
    month: "march",
    year: 2020,
  },
  {
    id: 6,
    title: "Great quality",
    description:
      "An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology",
    color: "brown",
    color1: "#3c79cd",
    color2: "#483ccd",
    month: "february",
    year: 2020,
  },
  {
    id: 7,
    title: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    color: "green",
    color1: "#ba7d40",
    color2: "#404040",
    month: "january",
    year: 2020,
  },
  {
    id: 8,
    title: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    color: "gold",
    color1: "#c8584c",
    color2: "#c84c7d",
    month: "december",
    year: 2019,
  },
  {
    id: 9,
    title: "Vibrant colors",
    description: "Four on-trend colorways to seamlessly suit your style.",
    color: "violet",
    color1: "#d6bc51",
    color2: "#aed651",
    month: "november",
    year: 2019,
  },
  {
    id: 10,
    title: "Vibrant colors",
    description: "Four on-trend colorways to seamlessly suit your style.",
    color: "pink",
    color1: "#d56039",
    color2: "#c24c60",
    month: "october",
    year: 2019,
  },
  // {
  //   id: 12,
  //   title: "Vibrant colors",
  //   description: "Four on-trend colorways to seamlessly suit your style.",
  //   color: "red",
  //   spacer: true,
  // },
];

interface PaystackMusicAnimationProps {}
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type ItemProps = {
  id: number;
  title: string;
  description: string;
  index: number;
  color: string;
  src: number;
  spacer?: boolean;
  scrollX: Animated.Value<number>;
  color1: string;
  color2: string;
};

const PaystackMusicAnimation = () => {
  const scrollX = useValue<number>(0);
  return (
    <View style={styles.container}>
      <Background scrollX={scrollX} />
      <Indicator scrollX={scrollX} />

      <Svg
        position="absolute"
        height={width}
        width={width}
        viewBox="0 0 300 300"
      >
        <G id="circle">
          <Circle
            r={width * 0.3}
            x={150}
            y={176}
            fill="none"
            stroke="#fff"
            strokeWidth={0}
            transform="rotate(-145)"
          />
        </G>
        <SvgText fill="#fff" fontSize="45" fontWeight={"bold"}>
          <TextPath href="#circle">
            <TSpan dx={0} dy={-20}>
              March 2012
            </TSpan>
          </TextPath>
        </SvgText>
      </Svg>

      <AnimatedFlatList
        data={list}
        keyExtractor={(item: ItemProps) => item.id + ""}
        horizontal
        renderItem={({ item, index }: { index: number; item: ItemProps }) => (
          <Item {...item} scrollX={scrollX} index={index} />
        )}
        decelerationRate={0}
        initialScrollIndex={0}
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

const Item = ({
  color,
  color1,
  color2,
  scrollX,
  year,
  month,
  spacer,
  index,
}: ItemProps) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH + SPACING * 2,
    index * ITEM_WIDTH + SPACING * 2,
    (index + 1) * ITEM_WIDTH + SPACING * 2,
  ];
  const translateY = interpolate(scrollX, {
    inputRange,
    outputRange: [0, -30, 0],
  });
  const opacity = interpolate(scrollX, {
    inputRange: [
      (index - 1) * ITEM_WIDTH + SPACING * 2,
      index * ITEM_WIDTH + SPACING * 2,
      (index + 1) * ITEM_WIDTH + SPACING * 2,
    ],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const mid = Math.floor(list.length / 2);
  // const rotate = mid === index ? 0 : index > mid ? index * 0.01 : -index * 0.01;

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          width: ITEM_WIDTH,
          height: height * 0.7,
        },
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <LinearGradient
        colors={[color1, color2]}
        style={[
          // styles.itemContainer,
          {
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            borderRadius: 10,
          },
        ]}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: 1,
              flex: 1,
              justifyContent: "flex-end",
            },
          ]}
        >
          <Image
            source={require("../../assets/spotify.png")}
            style={{
              width: ITEM_WIDTH,
              height: 80,
              resizeMode: "cover",
              opacity: 0.12,
            }}
          />
        </View>
      </LinearGradient>
      <View>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.year}>{year}</Text>
      </View>
    </Animated.View>
  );
};

interface BackgroundProps {
  scrollX: Animated.Value<number>;
}

const Background = ({ scrollX }: BackgroundProps) => {
  return (
    <>
      {list.map(({ color1, id }, index) => {
        const opacity = interpolate(scrollX, {
          inputRange: [
            (index - 1) * ITEM_WIDTH + SPACING * 2,
            index * ITEM_WIDTH + SPACING * 2,
            (index + 1) * ITEM_WIDTH + SPACING * 2,
          ],
          outputRange: [0, 0.5, 0],
        });
        return (
          <Animated.View
            key={id}
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: color1,
                opacity,
              },
            ]}
          ></Animated.View>
        );
      })}
    </>
  );
};

interface IndicatorProps {
  scrollX: Animated.Value<number>;
}

const Indicator = ({ scrollX }: IndicatorProps) => {
  return (
    <View style={styles.indicatorContainer}>
      {list.map(({ id, color1 }, index) => {
        const height = interpolate(scrollX, {
          inputRange: [
            (index - 1) * ITEM_WIDTH + SPACING * 2,
            index * ITEM_WIDTH + SPACING * 2,
            (index + 1) * ITEM_WIDTH + SPACING * 2,
          ],
          outputRange: [20, 40, 20],
          extrapolate: Extrapolate.CLAMP,
        });
        const backgroundColor = interpolateColor(scrollX, {
          inputRange: [
            (index - 1) * ITEM_WIDTH + SPACING * 2,
            index * ITEM_WIDTH + SPACING * 2,
            (index + 1) * ITEM_WIDTH + SPACING * 2,
          ],
          outputRange: ["rgba(1, 27, 51, 0.2)", color1, "rgba(1,27,51,.2)"],
        });
        return (
          <Animated.View
            style={[styles.indicator, { backgroundColor, height }]}
            key={id}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    position: "absolute",
    bottom: 20,
    width: width,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  indicator: {
    width: 5,
    borderRadius: 20,
    height: 20,
    backgroundColor: "rgba(1,27,51,.2)",
    marginHorizontal: 10,
  },
  itemContainer: {
    marginHorizontal: SPACING,
    // overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    // backgroundColor: "green",
    paddingTop: 35,
  },
  container: {
    paddingTop: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    width: width,
    height: height,
  },
  month: {
    textAlign: "center",
    paddingTop: 50,
    lineHeight: 1.2,
    fontSize: 40,
    fontWeight: "bold",
  },
  year: {
    textAlign: "center",
    paddingTop: 15,
    fontSize: 20,
  },
});

export default PaystackMusicAnimation;
