import SliderAnimation from "./src/SliderAnimatior";
import PaystackMusicAnimation from "./src/PaystackMusicAnimation";
import RadialPlaylist from "./src/RadialPlaylist";
import EventCardAnimation from "./src/EventCardAnimation";
import SharedCardAnimation from "./src/SharedCardAnimation";
import SharedCouch from "./src/SharedCouch";
import { RootStackParamList } from "./navigation";
import Onboarding from './src/Onboarding';
// RStackParamList;
type RouteTypes = {
  id: number;
  name: keyof RootStackParamList;
  component: React.FC<any>;
  label: string;
};
const routes: RouteTypes[] = [
  {
    id: 2,
    name: "Slider",
    label: "HeadSet Slider",
    component: SliderAnimation,
  },
  {
    id: 4,
    name: "PaystackMusic",
    component: PaystackMusicAnimation,
     label: "Paystack Music",
  },
  {
    id: 5,
    name: "RadialPlayList",
    component: RadialPlaylist,
     label: "Radial Music Slider",
  },
  {
    id: 6,
    name: "EventCard",
    component: EventCardAnimation,
     label: "Event Card",
  },
  {
    id: 7,
    name: "SharedCard",
    component: SharedCardAnimation,
     label: "Travel Up",
  },
  {
    id: 8,
    name: "SharedCouch",
    component: SharedCouch,
     label: "Couch Slider",
  },
  {
    id: 9,
    name: "Onboarding",
    component: Onboarding,
     label: "Onboarding Screen",
  }
];

export default routes;
