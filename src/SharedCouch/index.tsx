import React from "react";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "./home";
import Details from "./details";
import { Easing } from "react-native";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";

export type StackParamList = {
  home: undefined;
  details: { item: { id: number; poster: string } };
};

export interface SharedCardScreensProp<RouteName extends keyof StackParamList> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "SharedCard">,
    StackNavigationProp<StackParamList, RouteName>
  >;
  route: RouteProp<StackParamList, RouteName>;
}

export interface SharedCardScreenProps<RouteName extends keyof StackParamList> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "SharedCard">,
    StackNavigationProp<StackParamList, RouteName>
  >;
}

export type SharedCardNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "SharedCard">,
  StackNavigationProp<StackParamList>
>;

enableScreens();
const Stack = createSharedElementStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="details"
        component={Details}
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

interface IndexProps {}

const Index = () => {
  return <StackNavigator />;
};

export default Index;
