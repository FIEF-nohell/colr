import { motion } from "framer-motion";
import { HistoryDisplayProps } from "../services/types";

export default function HistoryDisplay({ history }: HistoryDisplayProps) {
    return (
        <motion.div className="absolute bottom-4 w-full flex justify-center">
            <div className="flex space-x-8">
                {history.slice(0, 5).map((item, index) => (
                    <motion.div
                        key={item.guessNumber}
                        className="guess-square flex flex-col items-center justify-center transition-transform hover:cursor-pointer group"
                        initial={{ opacity: 0.7, y: 150 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div
                            style={{ backgroundColor: `rgb(${item.red}, ${item.green}, ${item.blue})` }}
                            className="w-16 h-16 rounded-lg shadow-md text-center flex items-center justify-center"
                        >
                        </div>
                        <p className='mt-2 font-bold text-center rounded-full'>{item.guessNumber}. Guess</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
