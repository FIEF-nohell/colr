import { RGBInputsProps } from "../services/types";

export default function RGBInputs({ guess, handleChange }: RGBInputsProps) {
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

        /* Hover effect for guess history */
        .guess-square {
          position: relative;
        }
        .guess-square:hover .guess-tooltip {
          display: block;
        }
        .guess-tooltip {
          display: none;
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }
      `}</style>


            <div className="grid grid-cols-3 gap-4 mb-6">

                {/* red */}
                <div className="flex flex-col items-center">
                    <label className={`text-sm font-medium mb-1 text-red-400`}>RED</label>
                    <input
                        type="number"
                        min="0"
                        max="255"
                        step="1"
                        value={guess.red}
                        onChange={(e) => handleChange(e, "red")}
                        className={`w-full bg-[rgb(50,50,50)] text-gray-200 transition-all rounded-xl px-2 py-1 text-center appearance-none outline-none border-2 border-red-400`}
                    />
                </div>

                {/* green */}
                <div className="flex flex-col items-center">
                    <label className={`text-sm font-medium mb-1 text-green-400`}>GREEN</label>
                    <input
                        type="number"
                        min="0"
                        max="255"
                        step="1"
                        value={guess.green}
                        onChange={(e) => handleChange(e, "green")}
                        className={`w-full bg-[rgb(50,50,50)] text-gray-200 transition-all rounded-xl px-2 py-1 text-center appearance-none outline-none border-2 border-green-400`}
                    />
                </div>

                {/* blue */}
                <div className="flex flex-col items-center">
                    <label className={`text-sm font-medium mb-1 text-blue-400`}>BLUE</label>
                    <input
                        type="number"
                        min="0"
                        max="255"
                        step="1"
                        value={guess.blue}
                        onChange={(e) => handleChange(e, "blue")}
                        className={`w-full bg-[rgb(50,50,50)] text-gray-200 transition-all rounded-xl px-2 py-1 text-center appearance-none outline-none border-2 border-blue-400`}
                    />
                </div>
            </div>
        </>
    )
}