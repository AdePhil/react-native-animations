import React from "react";
import LoadAssets from "./src/LoadAssets";
import SliderAnimation from "./src/SliderAnimatior";
import MusicSliderAnimation from "./src/MusicSliderAnimation";
import PaystackMusicAnimation from "./src/PaystackMusicAnimation";

export default function App() {
  return (
    <LoadAssets>
      {/* <SliderAnimation /> */}
      {/* <MusicSliderAnimation /> */}
      <PaystackMusicAnimation />
    </LoadAssets>
  );
}
