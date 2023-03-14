import type { Component } from "solid-js";
import TextToImage from "./components/TextToImage";

const App: Component = () => {
  return (
    <div class="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 h-screen w-screen flex justify-center items-center">
      <TextToImage />
    </div>
  );
};

export default App;
