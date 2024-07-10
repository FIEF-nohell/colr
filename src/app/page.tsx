"use client"
import React, { useState } from 'react';
import { dateToRGB, getColor, getIcon, getStatus } from './services/game';
import { colorType, submittedColorType } from './services/types';

export default function DailyGame() {
  const [date] = useState(new Date());
  const [multiple] = useState(5);
  const [targetColor, setTargetColor] = useState<colorType>(dateToRGB(date, multiple));
  const [guess, setGuess] = useState<colorType>({ red: 128, green: 128, blue: 128 });
  const [history, setHistory] = useState<submittedColorType[]>([]);
  const [devMode, setDevMode] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, color: keyof colorType) => {
    const inputValue = e.target.value;

    if ((Number(inputValue) >= 0 && Number(inputValue) <= 255)) {
      setGuess(prev => ({ ...prev, [color]: inputValue }));
    }
    else if (Number(inputValue) <= 0) {
      setGuess(prev => ({ ...prev, [color]: 0 }));
    }
    else if (Number(inputValue) >= 255) {
      setGuess(prev => ({ ...prev, [color]: 255 }));
    }
  };

  const checkGuess = () => {
    const rStatus = getStatus(Number(guess.red), targetColor.red);
    const gStatus = getStatus(Number(guess.green), targetColor.green);
    const bStatus = getStatus(Number(guess.blue), targetColor.blue);
    const isCorrect = rStatus === 'correct' && gStatus === 'correct' && bStatus === 'correct';

    setHistory(prev => [{ ...guess, rStatus, gStatus, bStatus }, ...prev].slice(0, 3));
    if (isCorrect) {
      alert("Correct!")
    }
  };

  const logColor = (col: colorType) => {
    if (!devMode) return;
    console.log(col);
  };

  return (
    <>
      <style jsx>{`
        /* Custom styles for input arrows */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
          opacity: 1;
        }

        input[type="number"]::-webkit-inner-spin-button {
          background: rgb(75, 75, 75);
          height: 100%;
          width: 14px;
          border-radius: 0 8px 8px 0;
          cursor: pointer;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(15,15,15)] text-gray-300 p-4">
        <div className="w-full max-w-md">

          <div className="bg-[rgb(30,30,30)] rounded-2xl shadow-lg p-6 mb-6">
            <div className="mb-6" onClick={() => logColor(targetColor)}>
              <div
                style={{ backgroundColor: `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})` }}
                className="h-32 rounded-xl shadow-md mx-auto flex items-center justify-center"
              >
                <p className='text-2xl font-bold text-center bg-[rgb(30,30,30)] px-3 py-1 rounded-lg'>daily colr</p>
              </div>
            </div>

            {devMode && (
              <div className="mb-6" onClick={() => logColor(guess)}>
                <div
                  style={{ backgroundColor: `rgb(${guess.red}, ${guess.green}, ${guess.blue})` }}
                  className="h-32 rounded-xl shadow-md mx-auto"
                >
                  <p className='text-xs text-center rounded-t-xl bg-black bg-opacity-50 text-white p-1'>{guess.red}, {guess.green}, {guess.blue}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6">
              {(['red', 'green', 'blue'] as const).map((color) => (
                <div key={color} className="flex flex-col items-center">
                  <label className="text-sm font-medium mb-1 text-gray-400">{color.toUpperCase()}</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    step="1"
                    value={guess[color]}
                    onChange={(e) => handleChange(e, color)}
                    className={`w-full bg-[rgb(50,50,50)] text-gray-200 rounded-xl px-2 py-1 text-center appearance-none outline-none border-2 border-${color}-400`}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={checkGuess}
              className="w-full py-2 bg-[rgb(50,50,50)] text-gray-200 font-semibold rounded-xl hover:bg-[rgb(60,60,60)] transition-colors"
            >
              Guess
            </button>
          </div>

          <div className="bg-[rgb(30,30,30)] rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">Color History</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {history.map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-2">
                  <div
                    style={{ backgroundColor: `rgb(${item.red}, ${item.green}, ${item.blue})` }}
                    className="w-full h-16 rounded-xl mb-2"
                  ></div>
                  <div className="flex justify-between text-xs">
                    <span className={getColor(item.rStatus)}>{item.red} {getIcon(item.rStatus)}</span>
                    <span className={getColor(item.gStatus)}>{item.green} {getIcon(item.gStatus)}</span>
                    <span className={getColor(item.bStatus)}>{item.blue} {getIcon(item.bStatus)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <input
          type="checkbox"
          defaultChecked
          name="dev-mode"
          className='absolute top-4 left-4'
          onChange={e => setDevMode(e.target.checked)}
        />
      </div>
    </>
  );
}