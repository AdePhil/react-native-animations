import { StatusBar } from "expo-status-bar";
import React from "react";
import LoadAssets from "./src/LoadAssets";
import SliderAnimation from "./src/SliderAnimatior";

export default function App() {
  return (
    <LoadAssets>
      <SliderAnimation />
    </LoadAssets>
  );
}
