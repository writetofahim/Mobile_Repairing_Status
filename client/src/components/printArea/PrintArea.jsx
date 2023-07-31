import React from "react";

const PrintArea = ({ printData, total }) => {
  return (
    <div className=" ">
      <div className="text-center flex flex-col max-w-[600px] mx-auto">
        <h3 className="font-semibold">Taibul Store</h3>
        <p className="text-sm">Address: Rome, Italy</p>
        <p className="text-sm">Phone: +39xxxx-xxxx</p>

        <table>
          <thead>
            <tr>
              <th className="border px-2 font-semibold">SL. NO.</th>
              <th className="border px-16 font-semibold">Item</th>
              <th className="border px-2 font-semibold">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border text-left px-2">1</td>
              <td className="border text-left px-2">Service Charge</td>
              <td className="border text-left px-2">
                {printData.serviceCharge}
              </td>
            </tr>

            {printData.rows.map((row, i) => (
              <tr key={i}>
                <td className="border text-left px-2">{row.id}</td>
                <td className="border text-left px-2">{row.partsName}</td>
                <td className="border text-left px-2">{row.price}</td>
              </tr>
            ))}
            <tr>
              <td className="border">-</td>
              <td className="font-semibold border">Total</td>
              <td className="border text-left px-2">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintArea;
