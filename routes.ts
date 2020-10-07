import SliderAnimation from "./src/SliderAnimatior";
import MusicSliderAnimation from "./src/MusicSliderAnimation";
import PaystackMusicAnimation from "./src/PaystackMusicAnimation";
import RadialPlaylist from "./src/RadialPlaylist";
import EventCardAnimation from "./src/EventCardAnimation";
import SharedCardAnimation from "./src/SharedCardAnimation/container";
import Home from "./src/Home";
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
  { id: 3, name: "MusicSlider", component: MusicSliderAnimation },
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
];

export default routes;
