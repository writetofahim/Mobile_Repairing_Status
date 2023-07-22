import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import PrintArea from "../../components/printArea/PrintArea";
import StatusVisualizer from "../../components/statusVisualizer/StatusVisualizer";
import Table from "../../components/table/Table";
import { postStatus, updateStatus } from "./functions";

const StatusAdmin = ({
  statusData,
  setWorking,
  working,
  setAlmost,
  almost,
  setDone,
  done,
  setIsLoading,
  foundStatus,
  setFoundStatus,
}) => {
  const [inputLock, setInputLock] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [total, setTotal] = useState(0);
  const [invoiceData, setInvoiceData] = useState({
    serviceCharge: "",
    rows: [{}],
  });
  const [rows, setRows] = useState([{ id: 2, partsName: "", price: "-" }]);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [localStorageData, setLocalStorageData] = useState({});

  const inputRef = useRef(null);
  const inputRefService = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("statusData");
    const localStorageData = JSON.parse(data);
    console.log(localStorageData);
    // setLocalStorageData(localStorageData);
    const { customerId, status } = localStorageData;
    setInputValue(customerId);
    if (status === "working") {
      setWorking(true);
      setAlmost(false);
      setDone(false);
    } else if (status === "almost") {
      setWorking(false);
      setAlmost(true);
      setDone(false);
    } else {
      setWorking(false);
      setAlmost(false);
      setDone(true);
    }
  }, []);

  const handleStatusClick = (status) => {
    // console.log(status);

    setStatus(status);
    if (status === "working") {
      setWorking(true);
      setAlmost(false);
      setDone(false);
    } else if (status === "almost") {
      setWorking(false);
      setAlmost(true);
      setDone(false);
    }
  };

  // handle submit
  useEffect(() => {
    if (isInitialRender) {
      // Skip the effect's logic during the initial render
      setIsInitialRender(false);
      return;
    }
    // making object for post or update
    const obj = {
      customerId: inputValue,
      status: status,
    };
    if (!inputValue) {
      toast.warn("Customer number can't be empty");
      return;
    }
    setInputLock(true);
    if (status === "done") {
      setIsDisable(false);
      toast.warn("Fill the invoice");
      inputRefService.current.focus();
      return;
    }
    if (statusData.data?.find((sd) => sd.customerId == inputValue)) {
      const getResponse = async () => {
        setIsLoading(true);
        const updateRes = await updateStatus(
          obj,
          statusData,
          setWorking,
          working,
          setAlmost,
          almost,
          setDone,
          done
        );
        setIsLoading(false);
      };
      getResponse();
    } else {
      const getResponse = async () => {
        setIsLoading(true);
        const postRes = await postStatus(
          obj,
          statusData,
          setWorking,
          working,
          setAlmost,
          almost,
          setDone,
          done
        );
        setIsLoading(false);
      };
      getResponse();
    }
  }, [status]);

  const handleSaveInvoice = () => {
    // making object for post or update
    const obj = {
      customerId: inputValue,
      status: status,
      invoice: invoiceData,
    };

    if (
      inputValue &&
      statusData.data?.find((sd) => sd.customerId == inputValue)
    ) {
      const getResponse = async () => {
        setIsLoading(true);
        const updateRes = await updateStatus(
          obj,
          statusData,
          setWorking,
          working,
          setAlmost,
          almost,
          setDone,
          done
        );
        setIsLoading(false);
        setDone(true);
        setWorking(false);
        setAlmost(false);
      };
      getResponse();
    } else {
      const getResponse = async () => {
        setIsLoading(true);
        const postRes = await postStatus(
          obj,
          statusData,
          setWorking,
          working,
          setAlmost,
          almost,
          setDone,
          done
        );
        setIsLoading(false);
      };
      getResponse();
    }
  };

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

  // search by search value data
  useEffect(() => {
    const foundData = statusData?.data?.filter(
      (statusObj) =>
        statusObj?.customerId == searchValue ||
        statusObj?.status?.includes(searchValue.toLowerCase())
    );
    setFoundStatus(foundData);
  }, [searchValue, working, almost, done]);

  return (
    <div>
      {/* for admin */}
      <div className="relative h-[100vh-80px]">
        <div className="print:hidden block">
          {/*phone number input and status */}
          <div className=" pb-3 flex flex-col items-center">
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

            <StatusVisualizer
              working={working}
              almost={almost}
              done={done}
              label={"Select a Status"}
              handleStatusClick={handleStatusClick}
            />

            {/* post or update */}
            {/* <div className="mt-5">
          <Button name={"Post"} />
        </div> */}
          </div>
          <div className={isDisable ? "opacity-50 pointer-events-none" : ""}>
            {/* Invoice */}
            <h3 className="text-center text-3xl text-gray-700 font-bold my-3">
              Invoice
            </h3>
            <div className=" flex md:flex-row gap-10 justify-center flex-col text-gray-900 ">
              {/* generate */}
              <div className=" md:w-1/2 max-w-[300px] ">
                <h3>Charges:</h3>
                <div className="mt-2">
                  <div className="">
                    <input
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                      type="number"
                      placeholder="Service Charge"
                      value={invoiceData.serviceCharge}
                      ref={inputRefService}
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
                          onChange={(e) =>
                            handleChangeRowData(e, row.id, "price")
                          }
                          className="w-1/2 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className=" flex gap-2">
                    <div onClick={handleAddRow}>
                      <Button name={"+ Row"} />
                    </div>
                    <div onClick={handleSaveInvoice}>
                      <Button name="Save" />
                    </div>
                  </div>
                </div>
              </div>

              {/* preview */}
              <div className="md:w-1/2 max-w-[300px]  ">
                <h3>Preview:</h3>
                <div className="mt-2 ">
                  <table className="text-gray-900">
                    <thead>
                      <tr>
                        <th className="border text-sm font-medium px-3">
                          SL.NO.
                        </th>
                        <th className="border text-sm font-medium px-16">
                          Title
                        </th>
                        <th className="border text-sm font-medium px-3">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border px-2">1</td>
                        <td className="border px-2">Service Charge</td>
                        <td className="border px-2">
                          {invoiceData.serviceCharge}
                        </td>
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
        </div>

        {/* search data */}
        <div className="print:hidden border-t pt-3 mt-5 flex flex-col justify-center items-center">
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
            <Table tableData={foundStatus} />
          </div>
        </div>

        <div className="print:block hidden">
          <PrintArea printData={invoiceData} total={total} />
        </div>
      </div>
    </div>
  );
};

export default StatusAdmin;
