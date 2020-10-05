import React from "react";
import LoadAssets from "./src/LoadAssets";
import SliderAnimation from "./src/SliderAnimatior";
import MusicSliderAnimation from "./src/MusicSliderAnimation";
import PaystackMusicAnimation from "./src/PaystackMusicAnimation";
import RadialPlaylist from "./src/RadialPlaylist";
import EventCardAnimation from "./src/EventCardAnimation";
import SharedCardAnimation from "./src/SharedCardAnimation/index";
import SharedCardAnimationDetails from "./src/SharedCardAnimation/details";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./navigation";
import { Easing } from "react-native";

enableScreens();
const Stack = createSharedElementStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="index" component={SharedCardAnimation} />
        <Stack.Screen
          name="details"
          component={SharedCardAnimationDetails}
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
    </NavigationContainer>
    // <SharedCardAnimation />
  );
}
