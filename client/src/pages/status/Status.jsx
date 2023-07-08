import React, { useEffect, useRef, useState } from "react";
import { GiSolderingIron } from "react-icons/gi";
import { MdDoneOutline, MdIncompleteCircle } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "../../components/button/button";
import PrintArea from "../../components/printArea/PrintArea";
import axiosInstance from "../../utils/axiosInstance";
import { postStatus, updateStatus } from "./functions";

const Status = () => {
  const [working, setWorking] = useState(false);
  const [almost, setAlmost] = useState(false);
  const [done, setDone] = useState(false);
  const [inputLock, setInputLock] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [total, setTotal] = useState(0);
  const [invoiceData, setInvoiceData] = useState({
    serviceCharge: "",
    rows: [{}],
  });
  const [rows, setRows] = useState([{ id: 2, partsName: "", price: "-" }]);
  const [searchValue, setSearchValue] = useState("");
  const [statusData, setStatusData] = useState({});
  const [foundStatus, setFoundStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // fetching all status
  useEffect(() => {
    const getAllStatus = async () => {
      try {
        const res = await axiosInstance.get("/status");
        setStatusData(res.data);
        const reversedStatusData = res.data.statusData.reverse();
        setFoundStatus(reversedStatusData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllStatus();
  }, [isLoading]);

  // calculate total
  useEffect(() => {
    const array = rows.map((row) => parseFloat(row.price));
    const calculate = (arr) => {
      let sum = 0;
      for (let num of arr) {
        if (isNaN(num)) return 0;
        sum += num;
      }
      const serChar = isNaN(invoiceData.serviceCharge)
        ? 0
        : parseFloat(invoiceData.serviceCharge);
      return sum + serChar;
    };
    setTotal(calculate(array));
  }, [invoiceData]);

  // status set in ui
  const handleSubmit = (status) => {
    if (inputValue.length < 4) {
      toast.error("Enter at 4 digits");
    } else {
      setInputLock(true);

      if (status == "working") {
        setAlmost(false);
        setDone(false);
        setWorking(true);
      } else if (status == "almost") {
        setAlmost(true);
        setDone(false);
        setWorking(false);
      } else if (status == "done") {
        setAlmost(false);
        setDone(true);
        setWorking(false);
      } else {
        // setInputLock(true);
        // setWorking(true);
      }
    }
  };

  // handle submit
  useEffect(() => {
    // making object for post or update
    const obj = {
      customerId: inputValue,
      status: working
        ? "working"
        : almost
        ? "almost"
        : done
        ? "done"
        : "In the queue",
    };
    if (!inputValue) {
      return;
    }
    if (statusData.statusData?.find((sd) => sd.customerId == inputValue)) {
      const getResponse = async () => {
        setIsLoading(true);
        const updateRes = await updateStatus(obj);
        setIsLoading(false);
      };
      getResponse();
    } else {
      const getResponse = async () => {
        setIsLoading(true);
        const postRes = await postStatus(obj);
        setIsLoading(false);
      };
      getResponse();
    }
  }, [working, almost, done]);
  const inputRef = useRef(null);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 2,
      partsName: "",
      price: "",
    };
    setRows([...rows, newRow]);
  };

  const updateRows = (newRows) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      rows: newRows,
    }));
  };

  const handleChangeRowData = (e, id, field) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: e.target.value };
      }
      return row;
    });
    setRows(updatedRows);
    const updatedRowss = [...updatedRows];
    updateRows(updatedRowss);
  };
  const handleSaveInvoice = () => {
    const invoice = {
      customerId: inputValue,
      invoiceData: invoiceData,
    };
    console.log(invoice);
    toast.success("Invoiced saved");

    console.log(invoiceData);
  };

  // search by search value data
  useEffect(() => {
    const foundData = statusData?.statusData?.filter(
      (statusObj) =>
        statusObj?.customerId?.includes(searchValue) ||
        statusObj?.status?.includes(searchValue.toLowerCase())
    );
    setFoundStatus(foundData);
  }, [searchValue, working, almost, done]);
  return (
    <div className="mt-5 relative">
      <div
        className={`absolute -top-12 left-1/2 ${
          isLoading ? "block" : "hidden"
        }`}
        role="status"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="print:hidden block">
        {/* status */}
        <div className="border-b pb-3 flex flex-col items-center">
          {/* customer phone number */}
          <div>
            <label htmlFor="">Customer's phn. no: </label>
            <input
              disabled={inputLock}
              ref={inputRef}
              type="text"
              placeholder="ex: +393xxxxxxxxx"
              className=" h-10 p-2 border rounded"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={({ key }) => {
                if (key === "Enter") handleSubmit();
              }}
            />
            {inputLock && (
              <span
                onClick={() => {
                  setInputLock(false);
                  inputRef.current.focus();
                }}
                className="text-xs underline text-blue-500 ml-3 cursor-pointer "
              >
                Edit
              </span>
            )}
          </div>

          {/* status */}
          <div className="flex items-center gap-3 mt-5">
            <label htmlFor="">Status: </label>

            {/* working */}
            <div className=" relative">
              <span className="relative flex h-16 w-16">
                <span
                  className={` absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 ${
                    working && "animate-ping"
                  }`}
                ></span>
                <span className="relative inline-flex rounded-full  bg-sky-500">
                  <button
                    onClick={() => handleSubmit("working")}
                    className={` bg-yellow-300 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
                      working && "ring-2"
                    }`}
                  >
                    <GiSolderingIron
                      className={`text-3xl ${working && "text-white "}`}
                    />
                  </button>
                </span>
              </span>

              <p className="text-center text-xs mt-2">Working on</p>
            </div>

            {/* almost */}
            <div>
              <button
                onClick={() => handleSubmit("almost")}
                className={` bg-yellow-400 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
                  almost && "ring-2"
                }`}
              >
                <MdIncompleteCircle
                  className={`text-3xl ${
                    almost && "text-white animate-bounce"
                  }`}
                />
              </button>
              <p className="text-center text-xs mt-2">Almost</p>
            </div>

            {/* done */}
            <div>
              <button
                onClick={() => handleSubmit("done")}
                className={`bg-green-500 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
                  done && "ring-2"
                }`}
              >
                <MdDoneOutline
                  className={`text-3xl ${done && "text-white animate-bounce"}`}
                />
              </button>
              <p className="text-center text-xs mt-2">Done</p>
            </div>
          </div>

          {/* post or update */}
          {/* <div className="mt-5">
          <Button name={"Post"} />
        </div> */}
        </div>

        {/* Invoice */}
        <h3 className="text-center text-3xl text-gray-700 font-bold my-3">
          Invoice
        </h3>

        <div className=" flex justify-evenly md:flex-row flex-col text-gray-900 ">
          {/* generate */}
          <div className=" md:w-1/2 max-w-[300px] mx-auto">
            <h3>Charges:</h3>
            <div className="mt-2">
              <div className="">
                <input
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                  type="number"
                  placeholder="Service Charge"
                  value={invoiceData.serviceCharge}
                  onChange={(e) =>
                    setInvoiceData((prevState) => ({
                      ...prevState,
                      serviceCharge: e.target.value,
                    }))
                  }
                />
                {rows.map((row) => (
                  <div key={row.id} className="flex gap-2 my-2">
                    <input
                      type="text"
                      placeholder="Parts Name"
                      value={row.value1}
                      onChange={(e) =>
                        handleChangeRowData(e, row.id, "partsName")
                      }
                      className="w-1/2 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={row.value2}
                      onChange={(e) => handleChangeRowData(e, row.id, "price")}
                      className="w-1/2 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className=" flex gap-2">
                <div onClick={handleAddRow}>
                  <Button name={"+ Row"} />
                </div>
              </div>
            </div>
          </div>

          {/* preview */}
          <div className="md:w-1/2 max-w-[300px]  mx-auto">
            <h3>Preview:</h3>
            <div className="mt-2 ">
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
                    <td className="border px-2">{invoiceData.serviceCharge}</td>
                  </tr>
                  {rows.map((row) => (
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
              <div className="mt-2 flex gap-2">
                <div onClick={handleSaveInvoice}>
                  <Button name="Save" />
                </div>
                <div
                  onClick={() => {
                    window.print();
                  }}
                >
                  <Button name="Print" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* search data */}
      <div className="print:hidden border mt-5 flex flex-col justify-center items-center">
        <div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Phn. no. or Status"
            className=" border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* showing fetched data */}
        <div>
          <table>
            <thead>
              <tr>
                <th className="border px-5">Customer ID</th>
                <th className="border px-5">Status</th>
                <th className="border px-5">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {foundStatus &&
                foundStatus.map((fs, i) => (
                  <tr key={i} className="">
                    <td className="border px-2">{fs?.customerId}</td>
                    <td className="border px-2">{fs?.status?.toUpperCase()}</td>
                    <td className="border px-2"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="print:block hidden">
        <PrintArea printData={invoiceData} total={total} />
      </div>
    </div>
  );
};

export default Status;
