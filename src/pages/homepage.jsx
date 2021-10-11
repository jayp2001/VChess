import { useHistory } from "react-router";
import { useState } from "react";
import * as ROUTES from "../constants/routes";
import { useColorUpdate } from "../hook/player_provider";

export default function HomePage() {
  const history = useHistory();

  const colorUpdate = useColorUpdate();

  const [gameid, setgameid] = useState(null);

  //This commented code down below causes too many re renders what can we do life is like that

  // colorUpdate((preveState) => ({ ...preveState, gameidcontext: gameid }));

  const HandleFormSubmit = (event) => {
    event.preventDefault();

    colorUpdate({ color: "black", gameidcontext: gameid });

    history.push(ROUTES.GAMEPAGE);
  };

  const CreateGame = () => {
    history.push(ROUTES.GAMEPAGE);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg w-10/12 h-4/5 rounded-3xl md:w-8/12 lg:w-6/12">
        <div className="flex justify-center pt-5">
          <div className="text-5xl font-bold text-center ">
            <p className="text-purple-600 leading-relaxed">Create</p>{" "}
            <p className="leading-relaxed">OR</p>{" "}
            <p className="text-purple-600 leading-relaxed">Join Game</p>
          </div>
        </div>

        <div
          id="buttons-and-form"
          className=" flex flex-col items-center mt-20 h-80  md:space-y-5"
        >
          <button
            className="px-3 py-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-800 w-60"
            onClick={CreateGame}
          >
            Create Game
          </button>
          <p className="text-gray-500 font-bold text-xl pt-5">or</p>
          <form
            action="POST"
            className="flex flex-col items-center md:flex-row"
            onSubmit={HandleFormSubmit}
          >
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-3 mt-5 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-80"
              placeholder="Enter Room Code.."
              onChange={({ target }) => setgameid(target.value)}
            ></input>
            <button
              type="submit"
              className="px-3 py-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-800 mt-5 md:ml-5 w-max"
            >
              Join Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
