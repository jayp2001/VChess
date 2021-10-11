import { createContext, useContext, useState } from "react";
import PlayerContext from "../context/player";

const PlayerColorUpdate = createContext();

export function useColor() {
  return useContext(PlayerContext);
}

export function useColorUpdate() {
  return useContext(PlayerColorUpdate);
}

export function PlayerColorProvider({ children }) {
  const [color, setcolor] = useState({ color: "white", gameidcontext: null });

  function toggleColor(value) {
    setcolor(value);
  }

  return (
    <PlayerContext.Provider value={color}>
      <PlayerColorUpdate.Provider value={toggleColor}>
        {children}
      </PlayerColorUpdate.Provider>
    </PlayerContext.Provider>
  );
}
