import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export const CustomToast = ({ message, type = "success", isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%", scale: 0.8 }}
          animate={{ opacity: 1, y: 20, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          className="fixed top-0 left-1/2 z-[200] min-w-[300px]"
        >
          <div className="bg-zinc-900 border border-amber-500/30 text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4">
            {/* Icon */}
            <div className="bg-amber-500/10 p-2 rounded-xl">
              {type === "success" ? (
                <CheckCircle className="text-amber-500" size={24} />
              ) : (
                <Info className="text-blue-400" size={24} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-black text-white">{message}</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                {type === "success" ? "عملية ناجحة" : "تنبيه"}
              </p>
            </div>

            {/* Close Button */}
            <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
              <X size={18} />
            </button>

            {/* Progress Bar  */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-amber-500 rounded-b-2xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};