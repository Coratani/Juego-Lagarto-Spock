import * as Options from "./Options.jsx";
import * as Choices from "./Choices.jsx";
import {OptionButton} from "./GetResult.jsx";
import {useEffect, useState} from "react";
import {options} from "./Options.jsx";
import '../Tamagotchi/index.css'
import {Link} from "react-router-dom";
export default function Game() {
    const {
        userChoice,
        computerChoice,
        userMessage,
        computerMessage,
        result,
        disabled,
        handlePlay,
        reset,
    } = Choices.useChoices();
    let [winner, setWinner] = useState("");
    let [userChoiceName, setUserChoiceName] = useState();
    let [computerChoiceName, setComputerChoiceName] = useState();
    let [time, setTime] = useState("");
    let current = new Date().toISOString().slice(0,10);
    useEffect(()=>{
        setTime(current)
    }, [current])

    const checkWinner = () => {

        setUserChoiceName(options[userChoice].name)
        setComputerChoiceName(options[computerChoice].name);
        console.log(userChoiceName)
       
        console.log(computerChoiceName)
        if (result === 1) setWinner("Anonymous");
        else if (result === 2) setWinner("CPU");
        else if (result === 0) setWinner("Tie");
        console.log(winner)

        apicall()
    }
    const requestOptions = {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "name": "Antonio",
            "userChoice": userChoiceName,
            "computerChoice": computerChoiceName,
            "winner": winner,
            "date": time

        })
    };
    const apicall = () => {
        console.log(userChoiceName)
        console.log(computerChoiceName)
        fetch('/api/Spock', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else{
                    setComputerChoiceName(null)
                    setUserChoiceName(null)
                    reset();
                }


            })
            .catch(error => {

                console.error('There was an error!', error);
            });
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <button className="bg-zinc-800 text-light rounded-md" type="button" > <Link to={'..'}>BACK</Link></button>

            <div className="rounded-lg p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
                <div className="col-6 mx-auto">
                    {Options.options.map((option) => (
                        <OptionButton
                            key={option.id}
                            option={option}
                            handlePlay={handlePlay}
                            disabled={disabled}
                        />
                    ))}
                    {userChoice !== null && <p className="text-xl mt-4">{userMessage}</p>}
                    {computerChoice !== null && (
                        <p className="text-xl mt-4">{computerMessage}</p>
                    )}
                    {result !== null && (
                        <div className="mt-8">
                            {result === 0 && <p className="text-xl mt-4">🤷🏽‍♀️ Empate</p>}
                            {result === 1 && (
                                <p className="text-xl mt-4">
                                    🌟 Has ganado con {Options.options[userChoice]?.name} contra{" "}
                                    {Options.options[computerChoice]?.name}
                                </p>
                            )}
                            {result === 2 && (
                                <p className="text-xl mt-4">
                                    ☠ Has perdido con {Options.options[userChoice]?.name} contra{" "}
                                    {Options.options[computerChoice]?.name}
                                </p>
                            )}
                            <button
                                className="bg-warning hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                                onClick={checkWinner}
                            >
                                Jugar de nuevo
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}