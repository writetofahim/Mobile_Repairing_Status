import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const updateStatus = async (
  obj,
  statusData,
  setWorking,
  working,
  setAlmost,
  almost,
  setDone,
  done
) => {
  console.log(obj);
  try {
    const response = await axiosInstance.put("/status", obj);
    toast.success("Update successfully");
    localStorage.setItem("statusData", JSON.stringify(obj));
    return response.data;
  } catch (error) {
    working
      ? setWorking(false)
      : almost
      ? setAlmost(false)
      : done && setDone(false);
    console.log(error.message);
    toast.error(error.response.data.message);
  }
};

export const postStatus = async (
  obj,
  statusData,
  setWorking,
  working,
  setAlmost,
  almost,
  setDone,
  done
) => {
  try {
    const response = await axiosInstance.post("/status", obj);
    toast.success("Posting successfully");
    localStorage.setItem("statusData", JSON.stringify(obj));
  } catch (error) {
    working
      ? setWorking(false)
      : almost
      ? setAlmost(false)
      : done && setDone(false);
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
  }
};
