import { motion } from "framer-motion";
import { HistoryDisplayProps } from "../services/types";

export default function HistoryDisplay({ history }: HistoryDisplayProps) {

    return (
        <>
            <motion.div
                className="absolute bottom-4 w-full flex justify-center"
            >
                <div className="flex space-x-4">
                    {history.slice(0, 5).map((item, index) => (
                        <motion.div
                            key={index}
                            className="guess-square"
                            initial={{ opacity: 0.7, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                style={{ backgroundColor: `rgb(${item.red}, ${item.green}, ${item.blue})` }}
                                className="w-16 h-16 rounded-xl shadow-md hover:cursor-pointer hover:scale-125 transition-all"
                            ></div>
                            <div className="guess-tooltip">
                                {item.red}, {item.green}, {item.blue}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    )
}