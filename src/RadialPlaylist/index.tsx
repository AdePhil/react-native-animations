import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Image,
} from "react-native";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { useValue } from "react-native-redash";
// import CircularSlider from "react-native-circular-slider";
import CircularProgress from "../components/CircularProgress";

import { Feather, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProps } from "../../navigation";

const music = [
  {
    id: 1,
    artiste: "Burna Boy",
    title: "Ye",
    time: "3:48",
    color: "#4698FA",
    src: require("../../assets/face1.jpg"),
  },
  {
    id: 2,
    artiste: "Adekunle Gold",
    title: "Money",
    time: "3:02",
    color: "#FABC6F",
    src: require("../../assets/face2.jpg"),
  },
  {
    id: 3,
    artiste: "Simi",
    title: "By You",
    time: "2:22",
    color: "#82E293",
    src: require("../../assets/face3.jpg"),
  },
  {
    id: 4,
    artiste: "Wande Coal",
    title: "Iskaba",
    time: "2:58",
    color: "#B29FBD",
    src: require("../../assets/face4.jpg"),
  },
  {
    id: 5,
    artiste: "Star Boy",
    title: "Joro",
    time: "3:22",
    color: "#D9DEE7",
    src: require("../../assets/face5.jpg"),
  },
  {
    id: 6,
    artiste: "Ycee",
    title: "Juice",
    time: "3:44",
    color: "#E94D89",
    src: require("../../assets/face4.jpg"),
  },
  {
    id: 7,
    spacer: true,
  },
];

const { width, height } = Dimensions.get("window");
const SPACING = 15;
const ITEM_HEIGHT = height * 0.5;
const ITEM_WIDTH = width * 0.7;

interface RadialPlaylistProps {}

type MusicProps = {
  id: number;
  title: string;
  artiste: string;
  color: string;
  scrollX: Animated.Value<number>;
  index: number;
  src: number;
  spacer?: boolean;
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RadialPlaylist = () => {
  const scrollX = useValue<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <Header scrollX={scrollX} />
      <Footer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <View
        style={{
          position: "absolute",
          width: width,
          height: height * 0.7,
          transform: [{ translateX: -width * 0.6 }],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        {/* <CircularSlider
          startAngle={Math.PI * 0.75}
          angleLength={2 * Math.PI}
          onUpdate={() => {}}
          segments={5}
          strokeWidth={40}
          radius={145}
          gradientColorFrom="#ff9800"
          gradientColorTo="#ffcf00"
          showClockFace
          clockFaceColor="#9d9d9d"
          bgCircleColor="#171717"
          stopIcon={
            <View style={{ width: 20, height: 20, borderRadius: 10 }}></View>
          }
          startIcon={
            <View style={{ width: 20, height: 20, borderRadius: 10 }}></View>
          }
        /> */}
      </View>
      <AnimatedFlatList
        data={music}
        keyExtractor={(item: MusicProps) => item.id + ""}
        horizontal
        renderItem={({ item, index }: { index: number; item: MusicProps }) => (
          <Music {...item} scrollX={scrollX} index={index} />
        )}
        bounces={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        pagingEnabled={false}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

interface HeaderProps {
  scrollX: Animated.Value<number>;
}

const Header = ({ scrollX }: HeaderProps) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  return (
    <View style={[styles.headerContainer]}>
      {music.map(({ title, artiste, id }, index) => {
        const inputRange = [
          (index - 0.5) * ITEM_WIDTH,
          index * ITEM_WIDTH,
          (index + 0.5) * ITEM_WIDTH,
        ];
        const opacity = interpolate(scrollX, {
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: Extrapolate.CLAMP,
        });
        const translateX = interpolate(scrollX, {
          inputRange: [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ],
          outputRange: [0, 100, 0],
          extrapolate: Extrapolate.CLAMP,
        });
        return (
          <Animated.View
            key={id}
            style={[
              styles.headerText,
              { transform: [{ translateX }], opacity },
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.artiste}>{artiste}</Text>
          </Animated.View>
        );
      })}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.backIcon]}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Feather name="arrow-left" size={20} />
      </TouchableOpacity>
    </View>
  );
};

interface FooterProps {
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
}

const Footer = ({ isPlaying, setIsPlaying }: FooterProps) => {
  return (
    <View style={styles.footerContainer}>
      <Feather
        name="fast-forward"
        size={35}
        style={[styles.musicIcon, { transform: [{ rotate: "180deg" }] }]}
      />
      {isPlaying ? (
        <AntDesign
          name="pause"
          size={35}
          style={styles.musicIcon}
          onPress={() => setIsPlaying(!isPlaying)}
        />
      ) : (
        <Feather
          name="play"
          size={35}
          style={styles.musicIcon}
          onPress={() => setIsPlaying(!isPlaying)}
        />
      )}
      <Feather name="fast-forward" size={35} style={styles.musicIcon} />
    </View>
  );
};

const Music = ({ color, spacer, index, src, scrollX }: MusicProps) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];
  const scale = interpolate(scrollX, {
    inputRange: [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ],
    outputRange: [1, 2, 1],
  });

  const translateX = interpolate(scrollX, {
    inputRange,
    outputRange: [0, -ITEM_WIDTH * 0.5, 0],
  });

  if (spacer) {
    return (
      <View
        style={{
          width: ITEM_WIDTH / 2,
        }}
      ></View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.musicContainer,
        {
          transform: [{ translateX }, { scale }],
        },
      ]}
    >
      <View style={[styles.disk]}>
        <Image
          source={require("../../assets/disk.png")}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  musicIcon: {
    marginRight: 20,
    color: "#d9dee7",
  },
  footerContainer: {
    position: "absolute",
    bottom: 40,
    width: width,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backIcon: {
    marginTop: 10,
    fontWeight: "bold",
  },
  headerText: {
    left: 0,
    position: "absolute",
    top: 50,
  },
  artiste: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  headerContainer: {
    top: 0,
    position: "absolute",
    width: width,
    paddingTop: 50,
    flexDirection: "row",
    paddingHorizontal: 30,
    zIndex: 3,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  musicContainer: {
    paddingLeft: SPACING,
    paddingRight: SPACING,
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  disk: {
    width: ITEM_WIDTH - SPACING * 2,
    height: ITEM_WIDTH - SPACING * 2,
    borderRadius: (ITEM_WIDTH - SPACING * 2) / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  middleDisk: {
    width: (ITEM_WIDTH - SPACING * 2) * 0.3,
    height: (ITEM_WIDTH - SPACING * 2) * 0.3,
    borderRadius: (ITEM_WIDTH - SPACING * 2) * 0.3 * 0.5,
    backgroundColor: "#fff",
  },
});

export default RadialPlaylist;
