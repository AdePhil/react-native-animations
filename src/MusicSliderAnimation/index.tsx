import React from "react";
import { View, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import { useValue } from "react-native-redash";

const { width, height } = Dimensions.get("window");

interface indexProps {}

const list = [
  {
    id: 5,
    title: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    color: "#db9efa",
    spacer: true,
    src: require("../../assets/face4.jpg"),
  },
  {
    id: 1,
    title: "Vibrant Music",
    description: "Four on-trend colorways to seamlessly suit your style.",
    color: "#999",
    src: require("../../assets/face1.jpg"),
  },
  {
    id: 2,
    title: "Redefined Music",
    description: "A bold statement tuned to perfection.",
    color: "#9dcdfa",
    src: require("../../assets/face2.jpg"),
  },
  {
    id: 3,
    title: "Great Music",
    description:
      "An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology",
    color: "#a1e3a1",
    src: require("../../assets/face3.jpg"),
  },
  {
    id: 4,
    title: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    color: "#db9efa",
    src: require("../../assets/face4.jpg"),
  },
  {
    id: 6,
    title: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    color: "#db9efa",
    spacer: true,
    src: require("../../assets/face1.jpg"),
  },
];

const POSTER_SIZE = 0.8 * width;
const SPACING = 0;
const SPACER_ITEM_SIZE = (width - POSTER_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
type PosterProps = {
  id: number;
  title: string;
  description: string;
  index: number;
  color: string;
  src: number;
  scrollX: Animated.Value<number>;
  spacer?: boolean;
};
const MusicSliderAnimation = () => {
  const scrollX = useValue<number>(0);
  return (
    <View style={styles.container}>
      <FullPoster scrollX={scrollX} />
      <AnimatedFlatList
        keyExtractor={(item: PosterProps) => item.id + ""}
        data={list}
        renderItem={({ item, index }: { item: PosterProps; index: number }) => (
          <Poster {...item} scrollX={scrollX} index={index} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={POSTER_SIZE}
        bounces={false}
        decelerationRate={0}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const Poster = ({ scrollX, src, spacer, index }: PosterProps) => {
  const inputRange = [
    (index - 2) * POSTER_SIZE,
    (index - 1) * POSTER_SIZE,
    index * POSTER_SIZE,
  ];
  // const opacity = interpolate({
  //   inputRange,
  //   outputRange: [0.8, 1, 0],
  // });
  if (spacer) {
    return (
      <View
        style={{
          width: SPACER_ITEM_SIZE,
        }}
      >
        <Image
          source={src}
          style={{
            height: 0.5 * height,
            resizeMode: "cover",
            width: POSTER_SIZE,
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.posterContainer}>
      <View
        style={{
          marginHorizontal: SPACING,
          padding: SPACING * 2,
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 34,
        }}
      >
        <Image source={src} style={styles.poster} />
      </View>
    </View>
  );
};

type FullPosterProps = {
  scrollX: Animated.Value<number>;
};
const FullPoster = ({ scrollX }: FullPosterProps) => {
  return (
    <>
      {list.map(({ id, src, spacer }, index) => {
        const translateX = interpolate(scrollX, {
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0, 0.2, 0],
        });
        if (spacer) {
          return (
            <View
              style={{
                width: SPACER_ITEM_SIZE,
              }}
            >
              {/* <Image
                source={src}
                style={{
                  height: 0.5 * height,
                  resizeMode: "cover",
                  width: POSTER_SIZE,
                }}
              /> */}
            </View>
          );
        }
        return (
          <Animated.View
            key={id}
            style={[{ position: "absolute", transform: [{ translateX }] }]}
          >
            <Image
              source={src}
              style={{
                height: 0.6 * height,
                resizeMode: "cover",
                width: POSTER_SIZE,
              }}
            />
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  posterContainer: {
    width: POSTER_SIZE,
  },
  poster: {
    width: "100%",
    height: 0.6 * height,
    resizeMode: "cover",
  },
});

export default MusicSliderAnimation;
