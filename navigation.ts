import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// export type RootStackParamList = {
//   index: undefined;
//   details: {
//     item: {
//       poster: string;
//       location: string;
//       id: number;
//       meta: {
//         title: string;
//         value: string;
//         scale: string;
//       }[];
//     };
//   };
// };

// export interface RootStackScreenRouteProp<
//   RouteName extends keyof RootStackParamList
// > {
//   navigation: StackNavigationProp<RootStackParamList, RouteName>;
//   route: RouteProp<RootStackParamList, RouteName>;
// }

export type RootStackParamList = {
  Home: undefined;
  Slider: undefined;
  MusicSlider: undefined;
  PaystackMusic: undefined;
  RadialPlayList: undefined;
  EventCard: undefined;
  SharedCard: undefined;
};

export interface RootStackScreenProps<
  RouteName extends keyof RootStackParamList
> {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
}
