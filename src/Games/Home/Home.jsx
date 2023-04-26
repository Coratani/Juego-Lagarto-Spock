
import {Link} from "react-router-dom";



export default function Home() {

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="rounded-lg p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
                <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
                <div className="max-w-md mx-auto">
                    <a><Link to={`game1`} >Juego 1</Link></a>
                </div>
            </div>
        </div>
    );
}