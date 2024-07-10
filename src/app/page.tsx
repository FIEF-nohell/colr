"use client";

import React, { useEffect, useState } from 'react';
import { dateToRGB, getColor, getIcon, getStatus } from './services/game';
import { colorType, submittedColorType } from './services/types';

export default function DailyGame() {
  const [date, setDate] = useState(new Date());
  const [multiple, setMultiple] = useState(5);
  const [targetColor, setTargetColor] = useState<colorType>(dateToRGB(date, multiple));
  const [guess, setGuess] = useState<colorType>({ r: 128, g: 128, b: 128 });
  const [history, setHistory] = useState<submittedColorType[]>([]);
  const [devMode, setdevMode] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, color: string) => {
    const value = parseInt(e.target.value);
    setGuess(prev => ({ ...prev, [color]: value }));
  };

  const checkGuess = () => {
    const rStatus = getStatus(guess.r, targetColor.r);
    const gStatus = getStatus(guess.g, targetColor.g);
    const bStatus = getStatus(guess.b, targetColor.b);
    const isCorrect = rStatus === 'correct' && gStatus === 'correct' && bStatus === 'correct';

    setHistory(prev => [{ ...guess, rStatus, gStatus, bStatus }, ...prev].slice(0, 3));
    if (isCorrect) {
      alert("Correct!")
    }
  };

  const logColor = (col: colorType) => {
    if (!devMode) return
    console.log(col);
  };

  return (
    <>
      <input type="checkbox" defaultChecked name="dev-mode" id="" className='top-0 left-0 absolute' onChange={e => setdevMode(e.target.checked)} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black select-none">
        <div className="text-center p-8 max-w-xl w-full mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700" style={{ width: '1200px', height: 'auto' }}>
          <h1 className="text-4xl font-bold text-white mb-6">Colr - The RGB Color Guesser</h1>

          <div className="mb-8" onClick={() => logColor(targetColor)}>
            <div style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }} className="w-48 h-48 rounded-lg shadow-xl mx-auto">
              {devMode && <p className='text-center margin-auto bg-black text-white'>{targetColor.r}, {targetColor.g}, {targetColor.b}</p>}
            </div>
          </div>

          {devMode &&
            <div className="mb-8" onClick={() => logColor(guess)}>
              <div style={{ backgroundColor: `rgb(${guess.r}, ${guess.g}, ${guess.b})` }} className="w-48 h-48 rounded-lg shadow-xl mx-auto">
                <p className='text-center margin-auto bg-black text-white'>{guess.r}, {guess.g}, {guess.b}</p>
              </div>
            </div>
          }


          <div className="space-y-4">
            {(['r', 'g', 'b'] as const).map((color) => (
              <div key={color}>
                <label className="text-lg font-semibold text-white">{color.toUpperCase()}: {guess[color]}</label>
                <input type="range" min="0" max="255" step="5" value={guess[color]} onChange={(e) => handleChange(e, color)} className="w-full h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded cursor-pointer appearance-none" />
              </div>
            ))}
          </div>
          <button onClick={checkGuess} className="mt-6 px-10 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors">Guess</button>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-3">Color History</h2>
            <div className="grid grid-cols-3 gap-4 justify-center mt-3">
              {history.map((item, index) => (
                <div key={index} className="text-center p-2">
                  <div style={{ backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})` }} className="w-24 h-24 rounded-lg shadow-md mb-2"></div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className={getColor(item.rStatus)}>{item.r} {getIcon(item.rStatus)}</span>
                    <span className={getColor(item.gStatus)}>{item.g} {getIcon(item.gStatus)}</span>
                    <span className={getColor(item.bStatus)}>{item.b} {getIcon(item.bStatus)}</span>
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