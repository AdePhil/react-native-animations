import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GalleryProps {}

const DATA = [
  {
    id: 1,

    poster:
      "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 2,

    poster:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 3,

    poster:
      "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 4,

    poster:
      "https://images.unsplash.com/photo-1560967562-4cc092c1d738?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 5,

    poster:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 6,
    poster:
      "https://images.unsplash.com/photo-1502491679664-f49ac0da5b58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 7,
    poster:
      "https://images.unsplash.com/photo-1548996089-ec43272b6519?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=600&h=700&q=80",
  },
];

type ItemProps = typeof DATA[number];

const { width, height } = Dimensions.get("window");
const INDICATOR_WIDTH = 80;
const INDICATOR_MARGIN = 10;

const Gallery = (_: GalleryProps) => {
  const galleryRef = useRef<FlatList>(null);
  const indicatorRef = useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const setScrollOffset = (index: number) => {
    setActiveIndex(index);

    galleryRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    const currentOffset =
      index * (INDICATOR_WIDTH + INDICATOR_MARGIN) - INDICATOR_WIDTH / 2;

    if (currentOffset > width / 2) {
      indicatorRef?.current?.scrollToOffset({
        offset:
          index * (INDICATOR_WIDTH + INDICATOR_MARGIN) -
          width / 2 +
          INDICATOR_WIDTH / 2,
        animated: true,
      });
    } else {
      indicatorRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={galleryRef}
        renderItem={({ item, index }: { index: number; item: ItemProps }) => (
          <View style={{ width, height }} key={item.id}>
            <Image
              source={{ uri: item.poster }}
              style={{ width, height }}
              resizeMode="cover"
            ></Image>
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          setScrollOffset(
            Math.floor(event.nativeEvent.contentOffset.x / width)
          );
        }}
      ></FlatList>
      {/* Indicator */}
      <View style={{ position: "absolute", bottom: 100 }}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          ref={indicatorRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: INDICATOR_MARGIN }}
          renderItem={({ item, index }: { index: number; item: ItemProps }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setScrollOffset(index)}
            >
              <Image
                source={{ uri: item.poster }}
                style={{
                  width: INDICATOR_WIDTH,
                  height: INDICATOR_WIDTH * 0.8,
                  marginRight: INDICATOR_MARGIN,
                  borderRadius: 6,
                  borderWidth: 3,
                  borderColor: activeIndex === index ? "#fff" : "transparent",
                }}
                resizeMode="cover"
              ></Image>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Gallery;
