
import * as Options from "./Options.jsx";
import * as Choices from "./Choices.jsx";
import {OptionButton} from "./GetResult.jsx";
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

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="rounded-lg p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
                <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
                <div className="max-w-md mx-auto">
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
                                className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                                onClick={reset}
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
