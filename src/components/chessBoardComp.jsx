import { useContext, useState } from "react";
import { ChessBoard } from "react-fen-chess-board";
import { useColor } from "../hook/player_provider";
import Chess from "chess.js";
import { SocketContext } from "../context/socket";

const chess = new Chess();

export default function ChessBoardComp() {
  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  const socket = useContext(SocketContext);
  const { color } = useColor();
  const { gameidcontext } = useColor();

  socket.on("receive-move", ({ fromPosition, toPosition }) => {
    chess.move({
      from: fromPosition,
      to: toPosition,
    });
    setFen(chess.fen());
  });

  const handleMove = ({ fromPosition, toPosition, board }) => {
    console.log({ fromPosition, toPosition, board });
    // Requires Testing and such

    console.log(fromPosition.toCoordinate());
    chess.move({
      from: fromPosition.toCoordinate(),
      to: toPosition.toCoordinate(),
    });
    setFen(chess.fen());

    fromPosition = fromPosition.toCoordinate();
    toPosition = toPosition.toCoordinate();

    socket.emit("send-move", { fromPosition, toPosition }, gameidcontext);
  };

  return (
    <div>
      <div className=" border">
        <ChessBoard
          fen={fen}
          rotated={color === "black" ? true : false}
          onMove={handleMove}
        />
      </div>
    </div>
  );
}
