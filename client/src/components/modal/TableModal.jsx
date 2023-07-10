import React from "react";

const TableModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="backdrop-blur-md bg-white/50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
        <p>{data.content}</p>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TableModal;
