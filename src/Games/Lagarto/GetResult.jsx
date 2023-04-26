import {options} from "./Options.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 0;
    }

    if (options[userChoice].beats.includes(computerChoice)) {
        return 1;
    }

    return 2;
};


// eslint-disable-next-line react/prop-types
export function OptionButton({ option: {emoji, id, name}, handlePlay, disabled }) {
    return (
        <button
            className="px-4 py-2 m-2 text-xl font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={() => handlePlay(id)}
            title={name}
        >
            {emoji}
        </button>
    );}