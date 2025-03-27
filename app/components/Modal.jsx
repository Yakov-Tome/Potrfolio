"use client";
import { useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursorInline from "./CustomCursorInline";

export default function Modal({ children, isOpen, onClose, url, size }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleShare = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.info("Link copied to clipboard", {
        position: "top-center",
        autoClose: 1000,
        icon: false,
      });
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <dialog
          className="modal modal-open bg-black/80 backdrop-blur-md fixed top-0 left-0 w-full h-full z-[1000]"
          ref={modalRef}
          aria-modal="true"
          role="dialog"
        >
          <CustomCursorInline /> {/* נכנס פנימה! */}
          <ToastContainer />
          <motion.div
            className={`modal-box ${size || ""} rounded-lg overflow-auto max-h-[90vh] no-scrollbar`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-9 relative">
              <div className="absolute w-full top-0 left-0 p-2 flex gap-2">
                <FaCircle
                  onClick={onClose}
                  className="text-rose-500 hover:text-rose-300 cursor-pointer hover:scale-105 duration-300"
                />
                <FaCircle
                  onClick={handleShare}
                  className="text-blue-500 hover:text-blue-300 cursor-pointer hover:scale-105 duration-300"
                />
              </div>
              {children}
            </div>
          </motion.div>
          <form
            method="dialog"
            className="modal-backdrop bg-black/50 h-screen w-screen fixed top-0 left-0"
            onClick={onClose}
          ></form>
        </dialog>
      )}
    </AnimatePresence>
  );
}
