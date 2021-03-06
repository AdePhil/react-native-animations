import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  FlatList,
  SafeAreaView,
  Text,
  Easing,
  ImageBackground,
} from "react-native";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackNavigationProps, RootStackScreenProps } from "../../navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { EventCardNavigationProps } from ".";
import { TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

interface EventCardAnimationProps {}
const { width } = Dimensions.get("window");

const DATA = [
  {
    id: 1,
    title: "Afro vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg",
  },
  {
    id: 2,
    title: "Jungle Party",
    location: "Unknown",
    date: "Sept 3rd, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg",
  },
  {
    id: 3,
    title: "4th Of July",
    location: "New York, USA",
    date: "Oct 11th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg",
  },
  {
    id: 4,
    title: "Summer festival",
    location: "Bucharest, Romania",
    date: "Aug 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg",
  },
  {
    id: 5,
    title: "BBQ with Peeps",
    location: "Prague, Czech Republic",
    date: "Sept 11th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg",
  },
  {
    id: 6,
    title: "Festival music",
    location: "Berlin, Germany",
    date: "Apr 21th, 2021",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg",
  },
  {
    id: 7,
    title: "Beach House",
    location: "Liboa, Portugal",
    date: "Aug 12th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg",
  },
];

const ITEM_WIDTH = 0.8 * width;
const ITEM_HEIGHT = 1.65 * ITEM_WIDTH;
const SPACING = 10;
const VISIBLE_ITEMS = 3;
const HEADING_HEIGHT = 65;

const EventCardAnimationProps = ({
}: RootStackScreenProps<"EventCard">) => {
  const scrollIndex = useRef(new Animated.Value(0)).current;
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  const { top } = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(scrollAnimation, {
      toValue: scrollIndex,
      useNativeDriver: true,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }).start();
  });
  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === DATA.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={[styles.container, { marginTop: top}]}>
          <FixedHeader />
          <Heading scroll={scrollAnimation} />
            <FlatList
              data={DATA}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({
                item,
                index,
              }: {
                item: ItemProps;
                index: number;
              }) => <Item {...item} index={index} scroll={scrollAnimation} />}
              horizontal
              inverted
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [
                  style,
                  { zIndex: DATA.length - index, backgroundColor: "pink" },
                ];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                paddingTop: SPACING,
              }}
            />
          <View
            style={{
              flex: 0.1,
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
           
              <MaterialCommunityIcons name="menu" size={24} />
            
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="plus" size={18} />
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                Create Event
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};



interface FixedHeaderProps {}

const FixedHeader = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  return (
    <View style={styles.fixedHeader}>
      <View style={styles.fixedHeaderGroup}>
         <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
          <Ionicons name="ios-arrow-round-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.fixedHeaderText}>Events</Text>
      </View>
      <Ionicons name="ios-search" size={24} color="black" />
    </View>
   );
}

export interface ItemProps {
  title: string;
  id: number;
  location: string;
  date: string;
  poster: string;
  index: number;
  scroll: Animated.Value;
  scrollIndex: Animated.Value;
}

const Item = ({ id, scroll, poster, index }: ItemProps) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = scroll.interpolate({
    inputRange,
    outputRange: [50, 0, -ITEM_WIDTH],
  });
  const scale = scroll.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.6],
  });

  const opacity = scroll.interpolate({
    inputRange: [index - 1, index, index + 0.9, index + 1],
    outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 1, 0],
  });

  const navigation = useNavigation<EventCardNavigationProps>();
  return (
    <Animated.View
      key={id}
      style={[
        styles.itemContainer,
        { opacity, transform: [{ translateX }, { scale }] },
      ]}
    >
      <TouchableOpacity activeOpacity={0.98} style={[styles.itemContainer, { left: 0 }]} onPress={() => {
        navigation.navigate("details", {item: DATA[index]})
      }}>
      <SharedElement id={`item.${id}.photo`} style={[StyleSheet.absoluteFillObject, styles.itemImage]}>
      <Image
        source={{ uri: poster }}
        style={[StyleSheet.absoluteFillObject, styles.itemImage]}
          ></Image>
          </SharedElement>
        </TouchableOpacity>
    </Animated.View>
  );
};

interface HeadingProps {
  scroll: Animated.Value;
}

const Heading = ({ scroll }: HeadingProps) => {
  const translateY = scroll.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [HEADING_HEIGHT, 0, -HEADING_HEIGHT],
  });
  return (
    <View style={styles.headingContainer}>
      {DATA.map(({ title, location, date, id }, index) => {
        return (
          <Animated.View
            key={id}
            style={[styles.heading, { transform: [{ translateY }] }]}
          >
            <View>
              <Text style={styles.title}>{title}</Text>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={16}
                  color="#ccc"
                />
                <Text style={styles.location}>{location}</Text>
              </View>
            </View>
            <Text style={styles.date}>{date}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  fixedHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  fixedHeaderText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  fixedHeaderGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: HEADING_HEIGHT,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
    marginBottom: 5,
  },
  location: {
    fontSize: 13,
    fontWeight: "900",
    color: "#ccc",
  },
  date: {
    fontSize: 13,
    fontWeight: "900",
    color: "#ccc",
    marginTop: 3,
  },
  headingContainer: {
    paddingHorizontal: 20,
    height: HEADING_HEIGHT,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  itemContainer: {
    position: "absolute",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    left: -ITEM_WIDTH / 2 + SPACING * 2,
    justifyContent: "center",
    // borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 12, height: 12 },
    shadowOpacity: 0.38,
    shadowRadius: 10,
    elevation: 24,
  },
  itemImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    resizeMode: 'cover'
  },
});

export default EventCardAnimationProps;
