"use client"
import React, { useState } from 'react';
import { dateToRGB, generateRandomColor, getStatus } from './services/game';
import { colorType, submittedColorType } from './services/types';
import { motion } from 'framer-motion';
import RGBInputs from './components/rgb-inputs';
import HistoryDisplay from './components/history-display';

export default function DailyGame() {
  const [date] = useState(new Date());
  const [multiple] = useState(5);
  const [targetColor, setTargetColor] = useState<colorType>(generateRandomColor(multiple));
  const [guess, setGuess] = useState<colorType>({ red: 0, green: 0, blue: 0 });
  const [history, setHistory] = useState<submittedColorType[]>([]);
  const [devMode, setDevMode] = useState(false);
  const [firstGuessTaken, setFirstGuessTaken] = useState(false);
  const [guessCount, setGuessCount] = useState(1)

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

  const resetDailyGame = () => {
    setTargetColor(generateRandomColor(multiple));
    setGuess({ red: 0, green: 0, blue: 0 });
    setHistory([]);
    setGuessCount(1)
    setFirstGuessTaken(false);
  };

  const checkGuess = () => {
    if (!firstGuessTaken) setFirstGuessTaken(true);
    if (guessCount > 5) {
      resetDailyGame()
      return
    }
    setGuessCount(guessCount + 1)
    let guessNumber = guessCount
    guess.red = Number(guess.red);
    guess.green = Number(guess.green);
    guess.blue = Number(guess.blue);
    const rStatus = getStatus(Number(guess.red), targetColor.red);
    const gStatus = getStatus(Number(guess.green), targetColor.green);
    const bStatus = getStatus(Number(guess.blue), targetColor.blue);
    const isCorrect = rStatus === 'correct' && gStatus === 'correct' && bStatus === 'correct';

    setHistory(prev => [{ ...guess, rStatus, gStatus, bStatus, guessNumber }, ...prev].slice(0, 5));
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
      <motion.div className="flex flex-col items-center transition-all justify-center min-h-screen bg-[rgb(15,15,15)] text-gray-300 p-4">

        {/* guessing */}
        <motion.div className="w-full max-w-md select-none">
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

            <RGBInputs guess={guess} handleChange={handleChange}></RGBInputs>

            <button
              onClick={checkGuess}
              className="w-full py-2 bg-[rgb(50,50,50)] text-gray-200 font-semibold rounded-xl hover:bg-[rgb(60,60,60)] transition-all"
            >
              {
                guessCount > 5 ? "Reset" : `Guess ${guessCount}/5`
              }

            </button>
          </div>
        </motion.div>

        {/* feedback */}
        {firstGuessTaken && (
          <HistoryDisplay history={history}></HistoryDisplay>
        )}

        {/* <input
          type="checkbox"
          defaultChecked
          name="dev-mode"
          className='absolute top-4 left-4'
          onChange={e => setDevMode(e.target.checked)}
        /> */}
      </motion.div>
    </>
  );
}
