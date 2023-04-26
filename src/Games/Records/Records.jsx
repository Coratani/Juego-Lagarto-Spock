import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Records() {
    const requestOptions = {

        method: 'Get',
        headers: {'Content-Type': 'application/json'}

    };
    let [games,setGames]=useState([]);
    const apicall = async() => {
       await fetch('/api/Spock/scores', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setGames(data)
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

            }
            )
            .catch(error => {

                console.error('There was an error!', error);
            });
    }

useEffect(()=>apicall
)
    return (
        <div className="flex items-center justify-center h-screen ">
            <button className="bg-zinc-800 text-light rounded-md" type="button" > <Link to={'..'}>BACK</Link></button>
            <div className="rounded-lg p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 col-5 ">
                <h1 className="text-3xl mb-4 text-center font-bold">RECORDS</h1>
                <div className=" mx-auto">
                   <h1 className="bg-dark">Papel-piedra-tijera-lagarto-spock</h1>
                    <table className="table table-dark">
                        <tbody>
                        <tr>
                            <th>Player</th>
                            <th>Player choice</th>
                            <th>CPU choice</th>
                            <th>Winner</th>
                            <th>Date</th>
                        </tr>
                        { games.map((player) =>(
                        <tr key={player.id} >
                            <td>{player.name}</td>
                            <td>{player.userChoice}</td>
                            <td>{player.computerChoice}</td>
                            <td>{player.winner}</td>
                            <td>{player.date}</td>
                        </tr>
                        )

                        )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}
