import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Slider: undefined;
  MusicSlider: undefined;
  PaystackMusic: undefined;
  RadialPlayList: undefined;
  EventCard: undefined;
  SharedCard: undefined;
  SharedCouch: undefined;
  Onboarding: undefined
};

export interface RootStackScreenProps<
  RouteName extends keyof RootStackParamList
> {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
}

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
