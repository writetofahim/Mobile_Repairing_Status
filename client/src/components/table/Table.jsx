import React, { useState } from "react";
import TableModal from "../modal/TableModal";

const Table = ({ tableData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoice, setInvoice] = useState({});

  // total page
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);

  //   start and end index
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  //   get the current page's data
  const currentRows = tableData?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowInvoice = (invoice) => {
    setIsModalOpen(true);
    setInvoice(invoice);
  };
  return (
    <div className="mt-3">
      <TableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={invoice}
      />
      <table>
        <thead>
          <tr>
            <th className="border px-5">Customer ID</th>
            <th className="border px-5">Status</th>
            <th className="border px-5">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            currentRows.map((fs, i) => (
              <tr key={i} className="">
                <td className="border px-2">{fs?.customerId}</td>
                <td className="border px-2">{fs?.status?.toUpperCase()}</td>
                <td
                  className="border px-2 underline cursor-pointer text-blue-400 hover:text-blue-600 text-center"
                  onClick={() => handleShowInvoice(fs.invoice)}
                >
                  {fs?.invoice ? "Invoice" : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-[1px]  justify-center my-3">
        <div className="">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-2 py-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-l-full text-white"
          >
            Previous
          </button>

          {/* Render page numbers */}
          {Array.from({ length: 5 }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={currentPage === pageNumber}
                className={`px-2 py-1 bg-gradient-to-r ${
                  currentPage === pageNumber
                    ? " from-gray-200 to-gray-300"
                    : "from-blue-400 to-cyan-500"
                } text-white`}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-2 py-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-r-full text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
