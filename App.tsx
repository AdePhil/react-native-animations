import React from "react";
import LoadAssets from "./src/LoadAssets";
import SliderAnimation from "./src/SliderAnimatior";
import MusicSliderAnimation from "./src/MusicSliderAnimation";
import PaystackMusicAnimation from "./src/PaystackMusicAnimation";
import RadialPlaylist from "./src/RadialPlaylist";

export default function App() {
  return (
    <LoadAssets>
      {/* <SliderAnimation /> */}
      {/* <MusicSliderAnimation /> */}
      {/* <PaystackMusicAnimation /> */}
      <RadialPlaylist />
    </LoadAssets>
  );
}
