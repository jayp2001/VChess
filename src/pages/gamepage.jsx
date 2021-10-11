import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ChessBoardComp from "../components/chessBoardComp";
import { ChessBoardDndProvider } from "../../node_modules/react-fen-chess-board/dnd/ChessBoardDndProvider";
import { SocketContext } from "../context/socket";

import { useColor } from "../hook/player_provider";
import { useColorUpdate } from "../hook/player_provider";

import VideoCallProvider from "../hook/videocall_provider";
import { VideoPlayer } from "../components/vide_player";

// I think this will cause problems

export default function GamePage() {
  //Game Page contains A Chess Board with Chess Logic and Socket Logic
  //It Also contains one Chat Application at Side for Good measures

  console.log("it rendered");

  const socket = useContext(SocketContext);

  const { gameidcontext } = useColor();
  const { color } = useColor();
  const update = useColorUpdate();

  useEffect(() => {
    if (gameidcontext === null) {
      // Checking if User is Creator
      const gameid = uuidv4();
      socket.emit("create-game", gameid, color);
      update((prevstate) => ({ ...prevstate, gameidcontext: gameid }));
    } else {
      // Join game if User has Gmae Id
      socket.emit("join-game", gameidcontext);

      socket.on("receive-color", (color) => {
        console.log("color", color);
        update((prevstate) => ({ ...prevstate, color: color }));
      });

      console.log("socket.id", socket.id);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-row ">
        <div className=" max-w-xl flex-grow m-2">
          <p className="text-xl font-bold ">Send below game id to other</p>
          <div className="flex">
            <div className="border border-gray-600 p-2 w-max mb-2 rounded-xl bg-purple-600 font-mono font-bold text-white ">
              {gameidcontext}
            </div>
            <button
              className="border border-gray-600 p-2 w-max mb-2 rounded-xl bg-purple-600 font-mono font-bold text-white ml-2 hover:bg-purple-800 "
              onClick={() => {
                navigator.clipboard.writeText(gameidcontext);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </button>
          </div>
          <div>
            {" "}
            <ChessBoardDndProvider>
              <ChessBoardComp />
            </ChessBoardDndProvider>
          </div>
        </div>
        <div className="ml-7 flex-grow">
          <VideoCallProvider>
            <VideoPlayer />
          </VideoCallProvider>
        </div>
      </div>
    </div>
  );
}
