import React from "react";
import { TbX } from "react-icons/tb";

const Modal = ({ isOpen, onClose, children, modalTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-card rounded-lg max-w-full p-6 overflow-hidden max-h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 space-x-4">
          <h2 className="text-lg font-bold text-copy-primary whitespace-nowrap overflow-hidden truncate ">
            {modalTitle}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl" aria-label="Close">
            <TbX size={17} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[88vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
