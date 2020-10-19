import React from "react";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import EventCardAnimation, { ItemProps } from "./home";
import EventCardAnimationDetails from "./details";
import { Easing } from "react-native";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";

export type StackParamList = {
  home: undefined;
  details: { item: ItemProps };
};

export interface EventCardScreensProps<RouteName extends keyof StackParamList> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "EventCard">,
    StackNavigationProp<StackParamList, RouteName>
  >;
  route: RouteProp<StackParamList, RouteName>;
}


export type EventCardNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "EventCard">,
  StackNavigationProp<StackParamList>
>;

enableScreens();
const Stack = createSharedElementStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" >
      <Stack.Screen name="home" component={EventCardAnimation} />
      <Stack.Screen
        name="details"
        component={EventCardAnimationDetails}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: "timing",
              config: { duration: 500, easing: Easing.inOut(Easing.ease) },
            },
            close: {
              animation: "timing",
              config: { duration: 500, easing: Easing.inOut(Easing.ease) },
            },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
};


const Home = () => {
  return <StackNavigator />;
};

export default Home;
