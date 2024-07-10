"use client";

import React, { useEffect, useState } from 'react';
import { generateRandomMonoColor, getColor, getIcon, getStatus } from '../services/game';
import { monoColorType, submittedMonoColorType } from '../services/types';

export default function MonochromeGame() {
    const [multiple, setMultiple] = useState(5);
    const [targetColor, setTargetColor] = useState<monoColorType>({ c: 120 });
    const [guess, setGuess] = useState<monoColorType>({ c: 25 });
    const [history, setHistory] = useState<submittedMonoColorType[]>([]);
    const [devMode, setDevMode] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setGuess({ c: value });
    };

    const checkGuess = () => {
        const cStatus = getStatus(guess.c, targetColor.c);
        const isCorrect = cStatus === 'correct';

        setHistory(prev => [{ ...guess, cStatus }, ...prev].slice(0, 3));
        if (isCorrect) {
            alert("Correct!");
            setTargetColor(generateRandomMonoColor(multiple));
            setGuess(generateRandomMonoColor(multiple));
            setHistory([]);
        }
    };

    const logColor = (col: monoColorType) => {
        if (!devMode) return;
        console.log(col);
    };

    return (
        <>
            <input type="checkbox" defaultChecked name="dev-mode" className='top-0 left-0 absolute' onChange={e => setDevMode(e.target.checked)} />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black select-none">
                <div className="text-center p-8 max-w-xl w-full mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700" style={{ width: '1200px', height: 'auto' }}>
                    <h1 className="text-4xl font-bold text-white mb-6">Colr - The RGB Color Guesser</h1>

                    <div className="mb-8" onClick={() => logColor(targetColor)}>
                        <div style={{ backgroundColor: `rgb(${targetColor.c}, ${targetColor.c}, ${targetColor.c})` }} className="w-48 h-48 rounded-lg shadow-xl mx-auto">
                            {devMode && <p className='text-center margin-auto bg-black text-white'>{targetColor.c}</p>}
                        </div>
                    </div>

                    {devMode &&
                        <div className="mb-8" onClick={() => logColor(guess)}>
                            <div style={{ backgroundColor: `rgb(${guess.c}, ${guess.c}, ${guess.c})` }} className="w-48 h-48 rounded-lg shadow-xl mx-auto">
                                <p className='text-center margin-auto bg-black text-white'>{guess.c}</p>
                            </div>
                        </div>
                    }

                    <div className="space-y-4">
                        <div>
                            <label className="text-lg font-semibold text-white">C: {guess.c}</label>
                            <input type="range" min="0" max="255" step="5" value={guess.c} onChange={handleChange} className="w-full h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded cursor-pointer appearance-none" />
                        </div>
                    </div>
                    <button onClick={checkGuess} className="mt-6 px-10 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors">Guess</button>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-white mb-3">Color History</h2>
                        <div className="grid grid-cols-3 gap-4 justify-center mt-3">
                            {history.map((item, index) => (
                                <div key={index} className="text-center p-2">
                                    <div style={{ backgroundColor: `rgb(${item.c}, ${item.c}, ${item.c})` }} className="w-24 h-24 rounded-lg shadow-md mb-2"></div>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className={getColor(item.cStatus)}>{item.c} {getIcon(item.cStatus)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
