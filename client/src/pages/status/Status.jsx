import React, { useEffect, useRef, useState } from "react";
import { GiSolderingIron } from "react-icons/gi";
import { MdDoneOutline, MdIncompleteCircle } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "../../components/button/button";
import PrintArea from "../../components/printArea/PrintArea";
import axiosInstance from "../../utils/axiosInstance";

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

  // fetching data
  const statusData = [
    {
      customerId: 1212,
      status: [true, false, false],
    },
    {
      customerId: 2323,
      status: [false, true, false],
    },
  ];

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
      // console.log(serChar);
      return sum + serChar;
    };
    setTotal(calculate(array));
  }, [invoiceData]);

  // const handleStatusToggle = (status) => {
  //   setAlmost(false);
  //   setDone(false);
  //   setWorking(false);
  //   switch (status) {
  //     case "working":
  //       setWorking((prevWorking) => !prevWorking);
  //       break;
  //     case "almost":
  //       setAlmost((prevAlmost) => !prevAlmost);
  //       break;
  //     case "done":
  //       setDone((prevDone) => !prevDone);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleSubmit = (status) => {
    if (inputValue.length < 4) {
      toast.error("Enter at least 4 digits");
    } else {
      setInputLock(true);
      if (status === "working") {
        setAlmost(false);
        setDone(false);
        setWorking(true);
      } else if (status === "almost") {
        setAlmost(true);
        setDone(false);
        setWorking(false);
      } else if (status === "done") {
        setAlmost(false);
        setDone(true);
        setWorking(false);
      } else {
        setInputLock(true);

        setWorking(true);
      }
    }
  };
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const status = {
      phone: inputValue,
      status: [{ working: working }, { almost: almost }, { done: done }],
    };
    console.log(status);
    const postStatus = async () => {
      // const res = await axiosInstance.post("/status");
      // console.log(res.data);
      try {
        const response = await axiosInstance.post("/status", { status });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    postStatus();
    // posting/updating
    // if customer id is already exists then update else post

    if (statusData.find((sd) => sd.customerId == inputValue)) {
      toast.success("Update successfully");
    } else {
      if (inputValue.length > 0) {
        toast.success("Posting successfully");
      }
    }

    // post
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
  return (
    <div className="mt-5">
      <div className="print:hidden block">
        {/* status */}
        <div className="border-b pb-3 flex flex-col items-center">
          {/* last 4 digit input */}
          <div>
            <label htmlFor="">Last 4 digits of Customer's phn. no: </label>
            <input
              disabled={inputLock}
              ref={inputRef}
              type="text"
              placeholder="ex: 3344"
              className="w-24 h-10 p-2 border rounded"
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
            <div>
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

        <div className=" flex justify-evenly md:flex-row flex-col text-gray-900 border">
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

      <div className="print:block hidden">
        <PrintArea printData={invoiceData} total={total} />
      </div>
    </div>
  );
};

export default Status;
