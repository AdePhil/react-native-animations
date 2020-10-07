import SliderAnimation from "./src/SliderAnimatior";
import PaystackMusicAnimation from "./src/PaystackMusicAnimation";
import RadialPlaylist from "./src/RadialPlaylist";
import EventCardAnimation from "./src/EventCardAnimation";
import SharedCardAnimation from "./src/SharedCardAnimation";
import SharedCouch from "./src/SharedCouch";
import { RootStackParamList } from "./navigation";
// RStackParamList;
type RouteTypes = {
  id: number;
  name: keyof RootStackParamList;
  component: React.FC<any>;
};
const routes: RouteTypes[] = [
  {
    id: 2,
    name: "Slider",
    component: SliderAnimation,
  },
  {
    id: 4,
    name: "PaystackMusic",
    component: PaystackMusicAnimation,
  },
  {
    id: 5,
    name: "RadialPlayList",
    component: RadialPlaylist,
  },
  {
    id: 6,
    name: "EventCard",
    component: EventCardAnimation,
  },
  {
    id: 7,
    name: "SharedCard",
    component: SharedCardAnimation,
  },
  {
    id: 8,
    name: "SharedCouch",
    component: SharedCouch,
  },
];

export default routes;
