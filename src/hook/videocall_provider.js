import { createContext, useEffect, useRef, useState } from "react";
import { socket } from "../context/socket";
import { useColor } from "./player_provider";
var Peer = require("simple-peer");

export const videoCallContext = createContext();

export default function VideoCallProvider({ children }) {
  const { gameidcontext } = useColor();

  const [incomingCall, setIncomingCall] = useState(false);
  const [callConnected, setCallConnected] = useState(false);
  const [calling, setCalling] = useState(false);

  //cop = callotherperson , calling = show your video and call other , connected , answer = otherperson is calling

  const [sstream, SetStream] = useState(null);

  const [peer1data, setpeer1data] = useState(null);

  const myv = useRef();
  const otherplayerv = useRef();

  useEffect(() => {
    socket.on("answercall", (data) => {
      console.log("inside ansewrcall", data);

      setIncomingCall(true);
      setpeer1data(data);
    });
    return () => {};
  }, []);

  const ShowCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      SetStream(stream);
      myv.current.srcObject = stream;
    });
  };

  const answerToOtherPerson = () => {
    console.log("ssstream inside answercall", sstream);
    const peer2 = new Peer({
      initiator: false,
      trickle: false,
      stream: sstream,
    });

    peer2.on("signal", (data) => {
      console.log("Heya");
      socket.emit("answertocall", {
        answer: true,
        gameid: gameidcontext,
        peerdata: data,
      });
    });

    console.log("peer1data");
    setCallConnected(true);
    peer2.on("stream", (stream) => {
      console.log("aag laga di", stream);

      // got remote video stream, now let's show it in a video tag
      otherplayerv.current.srcObject = stream;
    });
    console.log("peer1data", peer1data);
    peer2.signal(peer1data);
  };

  const CallOtherPerson = () => {
    console.log("peer1 stream ", sstream);
    const peer1 = new Peer({
      initiator: true,

      trickle: false,
      stream: sstream,
    });

    peer1.on("signal", (data) => {
      socket.emit("callother", { gameid: gameidcontext, peerdata: data });
    });
    peer1.on("stream", (stream) => {
      console.log("oh y god");

      otherplayerv.current.srcObject = stream;
    });
    console.log("its rendering");
    setCalling(true);
    socket.on("replytocallrequest", (answer, peerdata) => {
      console.log("hey", peerdata);
      peer1.signal(peerdata);
      setCallConnected(true);
    });
  };

  return (
    <videoCallContext.Provider
      value={{
        CallOtherPerson,
        answerToOtherPerson,
        myv,
        otherplayerv,
        sstream,
        calling,
        ShowCamera,
        incomingCall,
        callConnected,
      }}
    >
      {children}
    </videoCallContext.Provider>
  );
}
