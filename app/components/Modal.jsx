"use client";
import { useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
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
    <>
      {isOpen && (
        <dialog
          className="modal modal-open bg-black/80 backdrop-blur-md fixed top-0 left-0 w-full h-full z-[1000]"
          ref={modalRef}
          aria-modal="true"
          role="dialog"
        >
          <CustomCursorInline />
          <ToastContainer />
          <div
            className={`modal-box ${size || ""} rounded-lg overflow-auto max-h-[90vh] no-scrollbar transition-all duration-300 ease-in-out scale-100 opacity-100`}
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
          </div>
          <form
            method="dialog"
            className="modal-backdrop bg-black/50 h-screen w-screen fixed top-0 left-0"
            onClick={onClose}
          ></form>
        </dialog>
      )}
    </>
  );
}
