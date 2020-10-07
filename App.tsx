import React from "react";
import LoadAssets from "./src/LoadAssets";

import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./navigation";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import Home from "./src/Home";

{
  /* <Stack.Navigator headerMode="none">
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
</Stack.Navigator>; */
}

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Home" headerMode="none">
      <RootStack.Screen name={"Home"} component={Home} />
      {routes.map(({ id, name, component }) => (
        <RootStack.Screen key={id} name={name} component={component} />
      ))}
    </RootStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
    // <SharedCardAnimation />
  );
}
