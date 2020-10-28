import React, { ReactNode, useRef } from 'react';
import { View, StyleSheet , FlatList, Text, Animated, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { height } from '../EventCardAnimation/constants';
import PhoneHand from './svgs/PhoneHand';
import { itemWidth, textWidth, width, INDICATOR_SIZE } from './constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PhoneHandFingerPrint from './svgs/PhoneHandFingerPrint';
import Business from './svgs/Business';
import MoneyTransfer from './svgs/MoneyTransfer';


const DATA = [
  {
    id: 1,
    title: 'Setup just up for 3 minutes',
    description: 'Have your wallet ready and functional in 3 minutes, including credit card upload',
    color: '#D7B451',
    Image: PhoneHand
  },

   {
    id: 2,
    title: 'Easy Payments with Walletory',
     description: 'QR code driven - pay or request payment in few seconds',
     color: '#4447D3',
     Image: PhoneHandFingerPrint
   },
  {
    id: 3,
    title: 'Pay without your device',
    description: 'You do not need to have your device with you to make payment',
    color: '#D7B451',
     Image: MoneyTransfer
  },
  {
  id: 4,
  title: 'Easy Payments with Walletory',
    description: 'Small business and receive device payments super fast and super easy',
    color: '#4447D3',
   Image: Business
  }  
]


interface OnboardingProps { }



const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  
  return (
    <View style={styles.container}>
      <Background scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => `${item.id}`}
        pagingEnabled={false}
        snapToInterval={width}
        scrollEventThrottle={16}
        decelerationRate={0}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={
          Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true })}
        renderItem={({item, index}) => {
          return <Item  {...item} key={item.id} scrollX={scrollX} index={index} />
        }}
      />

      

      <View style={styles.bottomContainer}>
      <View style={styles.buttons}>
        <Button>Log In</Button>
        <Button>Create Account</Button>
        </View>
        <View style={styles.indicatorGroup}>
          <TouchableOpacity>
            <Text style={styles.transparentButton}>Skip</Text>
        </TouchableOpacity>
          <Indicator scrollX={scrollX} />
          <TouchableOpacity>
             <Text style={styles.transparentButton}>Next</Text>
        </TouchableOpacity>
        </View>
      </View>
      
    </View>
   );
}

interface ItemInterface {
  id: number;
  title: string;
  description: string;
  color: string;
  scrollX: Animated.Value,
  index: number;
  Image: React.FC
}

const Item = ({ description, title, color, scrollX, id, index, Image }: ItemInterface) => {  
  const { top } = useSafeAreaInsets();
  const opacity = scrollX.interpolate({
          inputRange: [
            (index - 0.2) * itemWidth,
            index * itemWidth,
            (index + 1) * itemWidth,
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp'
        });
        const translateX = scrollX.interpolate({
          inputRange: [(index - 1.2) * itemWidth, index * itemWidth, (index + 1.2) * itemWidth],
          outputRange: [width, -width * 0.45, -width],
          extrapolate: 'clamp'
        });
        const translateY = scrollX.interpolate({
          inputRange: [(index - 1.2) * itemWidth, index * itemWidth, (index + 1.2) * itemWidth],
          outputRange: [width * 1.2, -250, -width * 1.2],
          extrapolate: 'clamp'
        });

        const rotate = scrollX.interpolate({
          inputRange: [(index - 1.2) * itemWidth, index * itemWidth, (index + 1.2) * itemWidth],
          outputRange: ["-80deg", "20deg", "70deg"],
          extrapolate: 'clamp'
        });
  return (
    <Animated.View style={[styles.itemContainer]}>
      <Animated.View
            key={id}
            style={[
              StyleSheet.absoluteFillObject,
              styles.whiteBg,
              {opacity},
              { transform: [{ translateX }, { translateY }, { rotate  }] }
            ]}
          >
      </Animated.View>
      <View style={[styles.itemImage, { paddingTop: top}]}>
        <Image  />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
    </Animated.View>
  )
}

interface IndicatorProps {
  scrollX: Animated.Value;
}

const Indicator = ({scrollX}: IndicatorProps) => {
  return (
    <View style={styles.indicators}>
      {DATA.map(({ color, id }, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 1) * itemWidth,
            index * itemWidth,
            (index + 1) * itemWidth,
          ],
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp'
        });
        return (
          <Animated.View
            key={id}
            style={[styles.indicator, {opacity}]}
          >
          </Animated.View>
        );
      })}
    </View>
  );
}
interface ButtonProps {
  children: ReactNode
}

const Button = ({children}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}


interface BackgroundProps {
  scrollX: Animated.Value;
}

const Background = ({ scrollX }: BackgroundProps) => {
  return (
    <>
      {DATA.map(({ color, id }, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 1) * itemWidth,
            index * itemWidth,
            (index + 1) * itemWidth,
          ],
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.View
            key={id}
            style={[
              StyleSheet.absoluteFillObject,
              { justifyContent: "center", width: width, height: height ,  backgroundColor: color,
                  opacity,},
            ]}
          >
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  indicatorGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  indicators: {
    flex: 1,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius:  INDICATOR_SIZE / 2,
    marginRight: 5,
    backgroundColor: '#fff'
  },
  transparentButton: {
  color: '#fff'
  },
  itemImage: {
    position: 'absolute',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    zIndex: 4,
    width: width
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    height: height * 0.3,
    width: width
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 80
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    color: 'black',
    minWidth: 120,
    fontSize: 15,
    borderRadius: 8
  },
  buttonText: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'absolute',
    width,
    height
  },
  itemContainer: {
    width: itemWidth,
  },
  whiteBg: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    backgroundColor: 'white',
    borderBottomRightRadius: 100,
  },
  itemContent: {
    position: 'absolute',
    top: height * 0.5,
    height: height * 0.5,
    paddingVertical: 40,
    paddingHorizontal: 20

  },
  itemTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'white',
    maxWidth: textWidth,
    lineHeight: 30
  },
  itemDescription: {
    fontSize: 15,
    fontWeight: '400',
    paddingBottom: 10,
    color: 'white',
    maxWidth: textWidth,
    lineHeight: 20
  }
})

export default Onboarding;