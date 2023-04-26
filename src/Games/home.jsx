import {Link} from "react-router-dom";
import Button from "bootstrap/js/src/button.js";


export default function Home() {

    return (
   <div className="flex items-center justify-center h-screen ">
      <div className="rounded-lg p-4 bg-gradient-to-r from-blue-400 via-indigo-800 to-teal-800 ">
          <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
          <button type={"submit"} > <Link to={'game1'}>Tamagotchi</Link></button>&nbsp;&nbsp;&nbsp;
          <button type={"submit"} > <Link to={'game2'}>Lagarto-Spock</Link></button>&nbsp;&nbsp;&nbsp;
          <button type={"submit"} > <Link to={'records'}>Records</Link></button>
      </div>
  </div>

    );
}

