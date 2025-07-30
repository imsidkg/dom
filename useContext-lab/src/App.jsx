import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { HotelProvider } from "./provider/HotelProvider";
import FrontDesk from "./components/FrontDesk";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <HotelProvider>
        <FrontDesk />
      </HotelProvider>
    </div>
  );
}

export default App;
