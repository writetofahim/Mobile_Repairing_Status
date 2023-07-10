import React from "react";

const TableModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) {
    return null;
  }
  // calculate total
  const total =
    parseFloat(data?.serviceCharge) +
    data?.rows?.reduce((total, p) => {
      console.log(total);
      return total + parseFloat(p.price);
    }, 0);
  console.log(total);
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="backdrop-blur-lg bg-white/60  rounded-lg p-6">
        <table className="text-gray-900">
          <thead>
            <tr>
              <th className="border text-sm font-medium px-3">SL.NO.</th>
              <th className="border text-sm font-medium px-16">Title</th>
              <th className="border text-sm font-medium px-3">Price</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="border px-2">1</td>
              <td className="border px-2">Service Charge</td>
              <td className="border px-2">{data?.serviceCharge}</td>
            </tr>
            {data?.rows.map((row) => (
              <tr key={row.id}>
                <td className="border px-2">{row.id}</td>
                <td className="border px-2">{row.partsName}</td>
                <td className="border px-2">{row.price}</td>
              </tr>
            ))}
            <tr>
              <td className="border px-2">-</td>
              <td className="border px-2 font-medium">Total</td>
              <td className="border px-2 font-medium">{total}</td>
            </tr>
          </tbody>
        </table>
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
