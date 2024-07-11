import { motion } from "framer-motion";
import { HistoryDisplayProps } from "../services/types";

export default function HistoryDisplay({ history }: HistoryDisplayProps) {
    return (
        <motion.div className="absolute bottom-4 w-full flex justify-center">
            <div className="flex space-x-4">
                {history.slice(0, 3).map((item, index) => (
                    <motion.div
                        key={item.guessNumber}
                        className="guess-square flex flex-col items-center justify-center transition-transform duration-200"
                        initial={{ opacity: 0.7, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <div
                            style={{ backgroundColor: `rgb(${item.red}, ${item.green}, ${item.blue})` }}
                            className="w-16 h-16 rounded-lg shadow-md text-center"
                        >{item.guessNumber}</div>
                        <div className="mt-1 text-sm text-white bg-black bg-opacity-70 px-2 py-1 rounded-md">
                            RGB: {item.red}, {item.green}, {item.blue}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
