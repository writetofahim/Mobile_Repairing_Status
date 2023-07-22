import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";
import StatusVisualizer from "../../components/statusVisualizer/StatusVisualizer";
import axiosInstance from "../../utils/axiosInstance";

const StatusUser = ({
  setWorking,
  working,
  setAlmost,
  almost,
  setDone,
  done,
  statusData,
  setIsLoading,
}) => {
  const [customerId, setCustomerId] = useState("");
  const [invoice, setInvoice] = useState({});
  const [total, setTotal] = useState(0);

  const handleCheckStatus = async () => {
    if (!customerId) {
      toast.warn("Enter your phone number");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/status/${customerId}`);
      setIsLoading(false);
      // console.log(res.data);

      const status = res.data.status;
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
      setInvoice(res.data?.invoice);
    } catch (error) {
      console.log(error.response.message);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const handleStatusClick = (status) => {
    console.log(status);
  };
  console.log(invoice);

  useEffect(() => {
    const items = invoice?.rows?.map((row) => parseFloat(row.price));
    console.log(items);
    let sum = 0;
    if (items?.length >= 0) {
      for (const item of items) {
        sum += item;
      }
      console.log(sum);
      setTotal(sum + parseFloat(invoice.serviceCharge));
    }
  }, [invoice]);

  return (
    <div>
      {/* phone number input */}
      <div className=" flex flex-col">
        <div>
          {/* <label htmlFor="phone">Phone number: </label> */}
          <div className="bg-white  shadow rounded-full flex items-center justify-between w-[295px]">
            <div className="bg- w-10 h-10 rounded-full flex justify-center items-center shadow-md">
              <BiSearch className="" />
            </div>
            <input
              type="text"
              value={customerId}
              placeholder="ex: +393xxxxxxxxx"
              className=" h-10 pl-2 outline-none"
              onChange={(e) => setCustomerId(e.target.value)}
              onKeyDown={({ key }) => {
                key === "Enter" && handleCheckStatus();
              }}
            />
            <button
              className="p-2 h-10 text-white bg-black text-sm rounded-r-full hover:bg-gray-700"
              onClick={handleCheckStatus}
            >
              Search
            </button>
          </div>
        </div>
        <p className="text-xs w-72 text-center mt-1">
          Please enter your phone number to check the update on your mobile
          servicing.
        </p>
      </div>
      {/* status */}
      <StatusVisualizer
        working={working}
        almost={almost}
        done={done}
        label={"Status"}
        handleStatusClick={handleStatusClick}
      />
      {/* Invoice */}
      <div>
        <h3 className="text-center text-3xl text-gray-700 font-bold mb-3">
          Invoice
        </h3>
        <div>
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
                  <td className="border px-2">{invoice?.serviceCharge}</td>
                </tr>
                {invoice?.rows?.map((row) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUser;
