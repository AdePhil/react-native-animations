import SliderAnimation from "./src/SliderAnimatior";
import PaystackMusicAnimation from "./src/PaystackMusicAnimation";
import RadialPlaylist from "./src/RadialPlaylist";
import EventCardAnimation from "./src/EventCardAnimation";
import SharedCardAnimation from "./src/SharedCardAnimation";
import SharedCouch from "./src/SharedCouch";
import { RootStackParamList } from "./navigation";
import Onboarding from "./src/Onboarding";
import Gallery from "./src/Gallary";
// RStackParamList;
type RouteTypes = {
  id: number;
  name: keyof RootStackParamList;
  component: React.FC<any>;
  label: string;
};
const routes: RouteTypes[] = [
  {
    id: 1,
    name: "Slider",
    label: "HeadSet Slider",
    component: SliderAnimation,
  },
  {
    id: 2,
    name: "PaystackMusic",
    component: PaystackMusicAnimation,
    label: "Paystack Music",
  },
  {
    id: 3,
    name: "RadialPlayList",
    component: RadialPlaylist,
    label: "Radial Music Slider",
  },
  {
    id: 4,
    name: "EventCard",
    component: EventCardAnimation,
    label: "Event Card",
  },
  {
    id: 5,
    name: "SharedCard",
    component: SharedCardAnimation,
    label: "Travel Up",
  },
  {
    id: 6,
    name: "SharedCouch",
    component: SharedCouch,
    label: "Couch Slider",
  },
  {
    id: 7,
    name: "Onboarding",
    component: Onboarding,
    label: "Onboarding Screen",
  },
  {
    id: 8,
    name: "Gallery",
    component: Gallery,
    label: "Gallery Screen",
  },
];

export default routes;
