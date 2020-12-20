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
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
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
import { AntDesign } from "@expo/vector-icons";
import { useValue, interpolateColor } from "react-native-redash";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProps } from "../../navigation";
const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_HEIGHT = height * 0.5;
const ITEM_WIDTH = width * 0.8;

const list = [
  {
    id: 1,
    color: "#264653",
    color1: "#c24c9b",
    color2: "#c24c60",
    month: "july",
    year: 2019,
  },
  {
    id: 2,
    color: "#5ba7cd",
    color1: "#5ba7cd",
    color2: "#5b6ecd",
    month: "june",
    year: 2020,
  },
  {
    id: 3,
    color: "#03045e",
    color1: "#c32222",
    color2: "#c32273",
    month: "may",
    year: 2020,
  },
  {
    id: 4,
    color: "tomato",
    color1: "#d6dc98",
    color2: "#b5dc98",
    month: "april",
    year: 2020,
  },
  {
    id: 5,
    color: "red",
    color1: "#b99b41",
    color2: "#b99b41",
    month: "march",
    year: 2020,
  },
  {
    id: 6,
    color: "brown",
    color1: "#3c79cd",
    color2: "#483ccd",
    month: "february",
    year: 2020,
  },
  {
    id: 7,
    color: "green",
    color1: "#ba7d40",
    color2: "#404040",
    month: "january",
    year: 2020,
  },
  {
    id: 8,
    color: "gold",
    color1: "#c8584c",
    color2: "#c84c7d",
    month: "december",
    year: 2019,
  },
  {
    id: 9,
    color: "violet",
    color1: "#d6bc51",
    color2: "#aed651",
    month: "november",
    year: 2019,
  },
  {
    id: 10,
    color: "pink",
    color1: "#d56039",
    color2: "#c24c60",
    month: "october",
    year: 2019,
  },
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
  year: string;
  month: string;
};

const PaystackMusicAnimation = () => {
  const scrollX = useValue<number>(0);
  return (
    <View style={styles.container}>
      <Background scrollX={scrollX} />
      <Indicator scrollX={scrollX} />
      <Header />
      <View>
        <AnimatedFlatList
          data={list}
          keyExtractor={(item: ItemProps) => item.id + ""}
          horizontal
          renderItem={({ item, index }: { index: number; item: ItemProps }) => (
            <Item {...item} scrollX={scrollX} index={index} />
          )}
          bounces={false}
          scrollEventThrottle={16}
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
    </View>
  );
};

const Item = ({ color1, color2, scrollX, year, month, index }: ItemProps) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH + SPACING * 2,
    index * ITEM_WIDTH + SPACING * 2,
    (index + 1) * ITEM_WIDTH + SPACING * 2,
  ];
  const translateY = interpolate(scrollX, {
    inputRange,
    outputRange: [0, -20, 0],
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

  const rotate = interpolate(scrollX, {
    inputRange: [
      (index - 1) * ITEM_WIDTH + SPACING * 2,
      index * ITEM_WIDTH + SPACING * 2,
      (index + 1) * ITEM_WIDTH + SPACING * 2,
    ],
    outputRange: [Math.PI / 90 , 0, -Math.PI / 90],
  });

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          width: ITEM_WIDTH,
          height: height * 0.7,
        },
        {
          transform: [{ translateY }, { rotate }],
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
      {list.map(({ color1, month, year, id }, index) => {
        const opacity = interpolate(scrollX, {
          inputRange: [
            (index - 1) * ITEM_WIDTH + SPACING * 2,
            index * ITEM_WIDTH + SPACING * 2,
            (index + 1) * ITEM_WIDTH + SPACING * 2,
          ],
          outputRange: [0, 0.5, 0],
        });
        const textOpacity = interpolate(scrollX, {
          inputRange: [
            (index - 0.5) * ITEM_WIDTH + SPACING * 2,
            index * ITEM_WIDTH + SPACING * 2,
            (index + 0.5) * ITEM_WIDTH + SPACING * 2,
          ],
          outputRange: [0, 1, 0],
        });
        return (
          <View
            key={id}
            style={[
              StyleSheet.absoluteFillObject,
              { justifyContent: "center", width: width, height: height },
            ]}
          >
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
            <Animated.View style={{ opacity: textOpacity, height: 200 }}>
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
                <SvgText
                  fill="#fff"
                  fontSize="40"
                  fontWeight={"bold"}
                  textAnchor="start"
                >
                  <TextPath href="#circle">
                    <TSpan dx={0} dy={-20}>
                      {month.toUpperCase()} {year}
                    </TSpan>
                  </TextPath>
                </SvgText>
              </Svg>
            </Animated.View>
          </View>
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

const Header = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconBg}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <AntDesign name="back" size={15} />
      </TouchableOpacity>
      <View style={styles.logo}>
        <Svg viewBox="0 0 120 23" fill="#011B33">
          <Path
            // class="c-nav__logo-icon"
            d="M17.077 2.68112H0.999937C0.455213 2.68112 0.000765438 3.14016 0.000765438 3.69254V5.50573C0.000765438 6.07188 0.455213 6.51868 1.0007 6.51868H17.0762C17.6347 6.51868 18.0761 6.05811 18.0891 5.5065V3.70554C18.0891 3.14093 17.6347 2.68036 17.077 2.68036V2.68112ZM17.077 12.7738H0.999937C0.868326 12.7741 0.738072 12.8004 0.616724 12.8514C0.495377 12.9023 0.38535 12.9769 0.293019 13.0707C0.105049 13.2613 -0.000229365 13.5183 3.75215e-07 13.786V15.5992C3.75215e-07 16.1653 0.454447 16.6114 0.999937 16.6114H17.0754C17.6339 16.6114 18.0754 16.1646 18.0884 15.6V13.786C18.0884 13.2206 17.6339 12.7738 17.0762 12.7738H17.077ZM10.0514 17.8079H1.0007C0.735225 17.8079 0.48046 17.9143 0.293784 18.104C0.105814 18.2946 0.000535698 18.5516 0.000765438 18.8194V20.6325C0.000765438 21.1987 0.455213 21.6447 1.0007 21.6447H10.0384C10.5969 21.6447 11.0383 21.1857 11.0383 20.6333V18.8194C11.0417 18.6876 11.0187 18.5566 10.9706 18.4339C10.9225 18.3112 10.8503 18.1994 10.7583 18.1051C10.6664 18.0108 10.5564 17.9358 10.435 17.8846C10.3136 17.8335 10.1831 17.8071 10.0514 17.8072V17.8079ZM18.0891 7.72671H1.0007C0.735225 7.72671 0.48046 7.83382 0.293784 8.02279C0.105628 8.21359 0.00033424 8.47092 0.000765438 8.73889V10.5521C0.000765438 11.1175 0.455213 11.5643 1.0007 11.5643H18.0769C18.6354 11.5643 19.0761 11.1045 19.0761 10.5521V8.73889C19.0783 8.60747 19.0545 8.47692 19.006 8.35476C18.9575 8.2326 18.8853 8.12125 18.7935 8.02715C18.7018 7.93305 18.5923 7.85805 18.4714 7.80648C18.3505 7.75492 18.2206 7.7278 18.0891 7.72671V7.72671Z"
          ></Path>
          <Path
            // class="c-nav__logo-wordmark"
            d="M36.801 6.7681C36.3071 6.25686 35.7155 5.85019 35.0612 5.5723C34.4033 5.29578 33.697 5.15275 32.9833 5.15152C32.2878 5.13546 31.5983 5.2841 30.9712 5.58531C30.5504 5.78652 30.171 6.0673 29.8542 6.41311V6.09867C29.8517 5.93861 29.792 5.78473 29.6859 5.66488C29.6335 5.60234 29.5679 5.55221 29.4939 5.51808C29.4198 5.48394 29.339 5.46667 29.2575 5.46749H27.0105C26.9287 5.46533 26.8475 5.482 26.7733 5.51623C26.699 5.55046 26.6335 5.60132 26.5821 5.66488C26.4705 5.78137 26.4097 5.93738 26.413 6.09867V21.0679C26.413 21.2255 26.478 21.3831 26.5813 21.5009C26.6376 21.5566 26.7046 21.6005 26.7782 21.6299C26.8518 21.6593 26.9305 21.6738 27.0097 21.6723H29.2827C29.4388 21.6723 29.5811 21.6065 29.6982 21.5009C29.7594 21.4473 29.8077 21.3805 29.8392 21.3054C29.8708 21.2304 29.8848 21.1491 29.8802 21.0679V15.955C30.2046 16.31 30.6201 16.5731 31.0745 16.7307C31.672 16.9541 32.2955 17.0597 32.9313 17.0597C33.6581 17.0597 34.3727 16.9274 35.0352 16.6389C35.7006 16.3616 36.3017 15.9501 36.801 15.4301C37.3191 14.8882 37.7252 14.2495 37.996 13.5504C38.3037 12.7681 38.4537 11.9327 38.4375 11.0922C38.4472 10.2483 38.2974 9.41017 37.996 8.62184C37.7165 7.93477 37.3109 7.30605 36.8002 6.7681H36.801ZM34.7499 12.1824C34.631 12.4999 34.45 12.7904 34.2174 13.037C33.9869 13.2847 33.7073 13.4816 33.3964 13.6151C33.0855 13.7486 32.7501 13.8156 32.4118 13.812C32.0614 13.812 31.724 13.7462 31.4127 13.6016C31.1053 13.4691 30.8271 13.2773 30.594 13.037C30.3619 12.7876 30.1771 12.498 30.0486 12.1824C29.789 11.5057 29.789 10.7568 30.0486 10.0801C30.1656 9.76485 30.3607 9.47565 30.594 9.23848C30.829 8.99719 31.1066 8.80137 31.4127 8.66086C31.7247 8.51368 32.0669 8.44162 32.4118 8.45047C32.763 8.45047 33.1004 8.51626 33.4248 8.6601C33.7231 8.80546 33.9963 8.98907 34.2304 9.22624C34.4637 9.47565 34.6328 9.75107 34.7629 10.067C35.0118 10.751 35.0071 11.5016 34.7499 12.1824V12.1824ZM50.6693 5.46672H48.41C48.3318 5.46643 48.2543 5.48262 48.1828 5.51426C48.1112 5.5459 48.0471 5.59227 47.9946 5.65034C47.9364 5.70934 47.8905 5.77924 47.8593 5.85605C47.8282 5.93285 47.8126 6.01504 47.8133 6.0979V6.37332C47.5291 6.04292 47.1799 5.77466 46.7874 5.58531C46.1729 5.28683 45.4965 5.13817 44.8135 5.15152C43.3586 5.15401 41.9634 5.73023 40.9308 6.75509C40.3985 7.29567 39.9751 7.93359 39.6837 8.63408C39.3596 9.41685 39.2007 10.2582 39.2171 11.1052C39.2032 11.9521 39.362 12.7929 39.6837 13.5764C39.9736 14.2745 40.3923 14.912 40.9178 15.4554C41.4198 15.9726 42.0217 16.3826 42.6868 16.6603C43.352 16.9381 44.0667 17.0779 44.7875 17.0712C45.476 17.085 46.1508 16.9404 46.7743 16.6374C47.1638 16.4408 47.5272 16.1784 47.8133 15.8494V16.1516C47.8133 16.3092 47.8776 16.4668 47.9946 16.5854C48.1117 16.6902 48.2547 16.756 48.41 16.756H50.6693C50.8281 16.753 50.9803 16.6924 51.0977 16.5854C51.154 16.5284 51.198 16.4605 51.2271 16.3859C51.2561 16.3113 51.2697 16.2316 51.2668 16.1516V6.0979C51.2703 5.93673 51.2098 5.78073 51.0985 5.66411C51.047 5.60055 50.9816 5.54969 50.9073 5.51547C50.833 5.48124 50.7518 5.46456 50.67 5.46672H50.6693ZM47.6182 12.1694C47.4993 12.4869 47.3183 12.7774 47.0857 13.024C46.8522 13.2608 46.58 13.4562 46.2809 13.6016C45.6443 13.8908 44.9038 13.8908 44.268 13.6016C43.9619 13.4611 43.6844 13.2653 43.4494 13.024C43.217 12.7774 43.0362 12.4869 42.9177 12.1694C42.671 11.4948 42.671 10.7547 42.9177 10.0801C43.034 9.76485 43.216 9.48866 43.4501 9.23848C43.6835 9.00208 43.9559 8.80546 44.268 8.66086C44.5842 8.51802 44.9271 8.44415 45.2741 8.44415C45.621 8.44415 45.9639 8.51802 46.2801 8.66086C46.5793 8.80546 46.8524 8.98907 47.0857 9.22548C47.3068 9.47565 47.4881 9.75107 47.6182 10.067C47.8783 10.7502 47.8783 11.4992 47.6182 12.1694V12.1694ZM73.1996 10.8153C72.8741 10.5286 72.5003 10.302 72.0956 10.1458C71.6669 9.97479 71.2237 9.84266 70.7713 9.75107L69.0438 9.40986C68.6023 9.33106 68.291 9.21247 68.1219 9.06787C68.0516 9.01898 67.9939 8.95423 67.9534 8.87886C67.9128 8.80349 67.8906 8.71964 67.8885 8.63408C67.8885 8.45047 67.9926 8.29287 68.2129 8.16127C68.5113 8.00367 68.8365 7.9241 69.1738 7.95088C69.6153 7.95088 70.0567 8.04269 70.4592 8.2133C70.8493 8.38467 71.2387 8.58206 71.5891 8.8177C72.0956 9.13367 72.5241 9.08088 72.8224 8.72589L73.6541 7.78027C73.8094 7.62191 73.9004 7.41228 73.9142 7.18888C73.9072 7.07378 73.8757 6.96149 73.8219 6.85951C73.7681 6.75753 73.6931 6.6682 73.602 6.59749C73.2509 6.29529 72.6931 5.96631 71.9525 5.6511C71.2127 5.3359 70.2771 5.16452 69.1738 5.16452C68.5004 5.1555 67.8299 5.25311 67.187 5.45372C66.6374 5.62322 66.1227 5.89014 65.6676 6.24173C65.2575 6.56275 64.9247 6.97164 64.6936 7.43829C64.4735 7.89326 64.3582 8.39183 64.3562 8.89726C64.3562 9.83064 64.6416 10.5926 65.2001 11.1573C65.7586 11.7226 66.4992 12.0906 67.4211 12.2743L69.2129 12.669C69.603 12.7348 69.9917 12.8526 70.3559 13.024C70.5502 13.1028 70.6803 13.2994 70.6803 13.5228C70.6803 13.7202 70.5762 13.9038 70.3559 14.0622C70.1348 14.2198 69.7714 14.3246 69.3039 14.3246C68.8138 14.3329 68.3288 14.2249 67.8885 14.0094C67.4712 13.8081 67.0827 13.5518 66.7333 13.2474C66.5801 13.1185 66.4034 13.0203 66.2131 12.9582C66.0057 12.8924 65.7586 12.9582 65.4862 13.1816L64.4993 13.9306C64.365 14.0274 64.2608 14.1603 64.1988 14.3138C64.1368 14.4673 64.1195 14.6353 64.1489 14.7982C64.2002 15.1272 64.4733 15.4546 64.9798 15.8364C66.2246 16.6767 67.6982 17.1127 69.1999 17.085C69.8989 17.094 70.5952 16.9965 71.2648 16.7958C71.8391 16.6222 72.3792 16.3509 72.8614 15.994C73.2899 15.665 73.6541 15.2442 73.9004 14.7584C74.138 14.2805 74.2623 13.7543 74.2638 13.2206C74.2747 12.7409 74.1771 12.265 73.9784 11.8282C73.7822 11.4465 73.5183 11.1036 73.1996 10.816V10.8153ZM83.0681 13.5496C83.0175 13.4599 82.9465 13.3833 82.8607 13.3261C82.775 13.269 82.677 13.2328 82.5747 13.2206C82.3674 13.2206 82.1593 13.2864 81.9902 13.4042C81.7151 13.5851 81.397 13.6896 81.0683 13.7072C80.9642 13.7072 80.8479 13.6942 80.7439 13.6674C80.6313 13.6448 80.5277 13.5901 80.4455 13.5098C80.3418 13.4132 80.2579 13.2973 80.1984 13.1686C80.1251 12.9757 80.0898 12.7705 80.0944 12.5642V8.46347H83.0291C83.2005 8.45941 83.3636 8.38858 83.4836 8.26609C83.5445 8.21132 83.5933 8.14445 83.6268 8.06976C83.6604 7.99507 83.6781 7.91419 83.6787 7.8323V6.09867C83.6798 6.0146 83.6629 5.93127 83.6293 5.85423C83.5957 5.77718 83.546 5.7082 83.4836 5.65187C83.3658 5.5357 83.2075 5.46985 83.0421 5.46825H80.1074V2.66813C80.1121 2.58487 80.0983 2.50161 80.0669 2.42434C80.0356 2.34707 79.9875 2.27773 79.926 2.22133C79.8134 2.1146 79.665 2.05375 79.5098 2.05072H77.2246C77.0608 2.04753 76.9023 2.1088 76.7832 2.22133C76.6621 2.33889 76.5923 2.49942 76.5888 2.66813V5.46825H75.2898C75.208 5.466 75.1269 5.48256 75.0526 5.51665C74.9783 5.55075 74.9129 5.60146 74.8613 5.66488C74.7552 5.78473 74.6955 5.93861 74.693 6.09867V7.83306C74.693 7.99067 74.7573 8.14903 74.8613 8.26685C74.9108 8.33265 74.9759 8.38513 75.0506 8.41958C75.1254 8.45403 75.2076 8.46938 75.2898 8.46424H76.5888V13.34C76.5761 13.9188 76.6913 14.4932 76.9262 15.0224C77.1356 15.4547 77.4317 15.8394 77.7961 16.1524C78.1595 16.4546 78.5879 16.6649 79.0294 16.7965C79.4879 16.9388 79.9655 17.0097 80.4455 17.0069C81.0767 17.0057 81.7035 16.9034 82.3023 16.704C82.8577 16.5187 83.3608 16.2034 83.7697 15.7844C83.8939 15.6567 83.9695 15.4896 83.9836 15.3121C83.9978 15.1345 83.9494 14.9577 83.847 14.812L83.0681 13.5496V13.5496ZM95.443 5.46672H93.1838C93.1055 5.46643 93.0281 5.48262 92.9565 5.51426C92.8849 5.5459 92.8208 5.59227 92.7684 5.65034C92.71 5.70925 92.6639 5.77912 92.6326 5.85594C92.6014 5.93275 92.5856 6.01498 92.5863 6.0979V6.37332C92.3023 6.04271 91.953 5.77441 91.5603 5.58531C90.942 5.28544 90.2613 5.13676 89.5742 5.15152C88.8555 5.15156 88.1438 5.29321 87.4799 5.56835C86.8159 5.84349 86.2126 6.24675 85.7046 6.75509C85.1682 7.29235 84.7442 7.93112 84.4575 8.63408C84.1345 9.4124 83.9754 10.2489 83.99 11.0915C83.9765 11.9384 84.1356 12.7792 84.4575 13.5626C84.7436 14.2588 85.1721 14.903 85.6915 15.4416C86.1922 15.9581 86.7916 16.3686 87.4542 16.6485C88.1168 16.9285 88.8289 17.0722 89.5482 17.0712C90.2337 17.084 90.913 16.9401 91.5343 16.6504C91.9245 16.4538 92.2879 16.1914 92.5733 15.8624V16.1516C92.5748 16.3122 92.6376 16.4653 92.7493 16.5777C92.8606 16.6906 93.0122 16.7547 93.1708 16.756H95.443C95.6005 16.7562 95.7517 16.6941 95.8636 16.5834C95.9755 16.4726 96.0391 16.3221 96.0405 16.1646V6.09867C96.0422 6.0188 96.0282 5.93938 95.9992 5.86495C95.9701 5.79052 95.9268 5.72254 95.8715 5.66488C95.82 5.60127 95.7546 5.55038 95.6803 5.51615C95.606 5.48192 95.5248 5.46527 95.443 5.46749V5.46672ZM92.392 12.1694C92.2729 12.4868 92.0919 12.7773 91.8595 13.024C91.6257 13.2609 91.3533 13.4562 91.0539 13.6016C90.7377 13.7503 90.3909 13.8224 90.0417 13.812C89.6905 13.812 89.3531 13.7332 89.0418 13.6016C88.7357 13.4611 88.4581 13.2653 88.2231 13.024C87.9907 12.7773 87.8097 12.4868 87.6907 12.1694C87.4444 11.4947 87.4444 10.7547 87.6907 10.0801C87.81 9.76668 87.991 9.48049 88.2231 9.23848C88.4573 9.00208 88.7296 8.80546 89.0418 8.66086C89.3556 8.51836 89.697 8.44654 90.0417 8.45047C90.3921 8.45047 90.7295 8.51626 91.0539 8.6601C91.353 8.80546 91.6254 8.98907 91.8595 9.22624C92.0928 9.47565 92.2749 9.75107 92.392 10.067C92.6642 10.7414 92.6642 11.4951 92.392 12.1694V12.1694ZM107.845 13.405L106.546 12.4058C106.299 12.2092 106.065 12.1564 105.858 12.2352C105.675 12.3136 105.511 12.4302 105.377 12.5772C105.093 12.9212 104.761 13.2222 104.39 13.4708C104.001 13.6942 103.572 13.7998 103.13 13.773C102.623 13.7787 102.126 13.6248 101.711 13.3331C101.294 13.0397 100.977 12.6241 100.806 12.1434C100.688 11.8144 100.627 11.4678 100.625 11.1182C100.625 10.7633 100.676 10.4083 100.806 10.067C100.923 9.75107 101.092 9.46265 101.326 9.22548C101.56 8.98907 101.832 8.79169 102.13 8.6601C102.448 8.51383 102.794 8.43789 103.143 8.43746C103.585 8.42158 104.022 8.53085 104.403 8.75267C104.777 8.99738 105.11 9.29888 105.39 9.64626C105.52 9.79086 105.676 9.90868 105.858 9.98824C106.065 10.067 106.299 10.0143 106.533 9.81687L107.832 8.83147C107.987 8.72589 108.117 8.56829 108.169 8.38467C108.206 8.28639 108.22 8.18115 108.211 8.0766C108.202 7.97205 108.17 7.87082 108.117 7.78027C107.616 6.99812 106.929 6.3523 106.117 5.90051C105.26 5.4147 104.234 5.16452 103.091 5.16452C102.286 5.16474 101.488 5.32088 100.741 5.62433C100.028 5.9154 99.3793 6.34439 98.8323 6.88668C98.2835 7.42395 97.8505 8.06782 97.56 8.77868C96.9494 10.2831 96.9494 11.9664 97.56 13.4708C97.8583 14.18 98.2868 14.8242 98.8323 15.3498C99.969 16.4635 101.5 17.0823 103.091 17.0712C104.234 17.0712 105.26 16.8218 106.117 16.3352C106.936 15.8829 107.628 15.2323 108.13 14.4432C108.183 14.355 108.215 14.256 108.224 14.1535C108.233 14.051 108.219 13.9479 108.182 13.8518C108.12 13.6706 108.002 13.5139 107.845 13.405V13.405ZM119.868 15.7438L116.298 10.5001L119.35 6.4659C119.421 6.37384 119.47 6.26643 119.492 6.15221C119.515 6.03799 119.51 5.92011 119.479 5.80794C119.427 5.6511 119.285 5.47973 118.908 5.47973H116.493C116.354 5.48366 116.217 5.51485 116.09 5.57154C115.94 5.64663 115.818 5.76609 115.739 5.91352L113.298 9.33105H112.714V1.24817C112.715 1.16835 112.701 1.08895 112.673 1.01452C112.644 0.940087 112.6 0.872077 112.545 0.81438C112.489 0.758943 112.422 0.715308 112.348 0.686017C112.275 0.656727 112.196 0.642366 112.117 0.643771H109.857C109.698 0.646815 109.546 0.707446 109.428 0.81438C109.368 0.868828 109.32 0.935959 109.289 1.01096C109.258 1.08596 109.243 1.16697 109.247 1.24817V16.1516C109.247 16.3222 109.311 16.4806 109.428 16.5854C109.485 16.6409 109.552 16.6846 109.625 16.7139C109.699 16.7432 109.778 16.7575 109.857 16.756H112.117C112.276 16.7529 112.428 16.6923 112.545 16.5854C112.6 16.5277 112.644 16.4597 112.673 16.3852C112.701 16.3108 112.715 16.2314 112.714 16.1516V12.2092H113.363L116.025 16.2962C116.181 16.5854 116.48 16.769 116.804 16.769H119.337C119.726 16.769 119.881 16.5854 119.946 16.4278C119.992 16.3164 120.009 16.1953 119.995 16.0758C119.982 15.9562 119.938 15.842 119.868 15.7438V15.7438ZM63.5124 5.46672H60.98C60.8864 5.46124 60.7926 5.47604 60.7052 5.5101C60.6178 5.54417 60.5388 5.5967 60.4736 5.66411C60.3591 5.78063 60.2784 5.92608 60.2402 6.0849L58.3696 13.05H57.9159L55.9168 6.0849C55.8787 5.93765 55.8125 5.79918 55.7218 5.67712C55.6666 5.61024 55.5971 5.5566 55.5185 5.52019C55.4398 5.48377 55.354 5.4655 55.2673 5.46672H52.6439C52.3073 5.46672 52.0992 5.5723 52.0081 5.7957C51.9431 5.99232 51.9431 6.21649 52.0081 6.41311L55.2153 16.2044C55.2673 16.349 55.3453 16.4936 55.4624 16.5984C55.5925 16.717 55.7608 16.782 55.9421 16.769H57.2932L57.1761 17.085L56.8778 17.9916C56.786 18.267 56.6176 18.5172 56.3843 18.7008C56.1684 18.8666 55.9029 18.9548 55.6307 18.951C55.3974 18.951 55.164 18.8982 54.9559 18.8056C54.7427 18.7131 54.5419 18.5941 54.3584 18.4514C54.1916 18.3323 53.9919 18.2681 53.7869 18.2677H53.7609C53.6434 18.2736 53.5294 18.3092 53.4294 18.3711C53.3295 18.4331 53.2469 18.5194 53.1894 18.622L52.3845 19.8048C52.0602 20.3174 52.2415 20.6463 52.4496 20.8299C52.8789 21.2265 53.3881 21.5268 53.943 21.7105C54.5575 21.9204 55.2025 22.0269 55.8518 22.0257C57.0071 22.0257 57.981 21.7105 58.7208 21.0801C59.4934 20.4018 60.0566 19.5172 60.3443 18.5302L64.0586 6.41311C64.1367 6.20271 64.1497 5.97932 64.0716 5.76892C64.0066 5.62433 63.8635 5.46672 63.5131 5.46672H63.5124Z"
          ></Path>
        </Svg>
      </View>
      <View style={styles.iconBg}>
        <AntDesign name="sharealt" size={15} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 120,
    height: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 200,
    paddingHorizontal: 15,
    width: width,
    marginBottom: 20,
  },
  iconBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
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
    top: 40,
    flex: 1,
    marginHorizontal: SPACING,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    paddingTop: 35,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
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
