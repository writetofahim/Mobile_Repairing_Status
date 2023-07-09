import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const updateStatus = async (obj) => {
  console.log(obj);
  try {
    const response = await axiosInstance.put("/status", obj);
    toast.success("Update successfully");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const postStatus = async (obj) => {
  try {
    const response = await axiosInstance.post("/status", obj);
    toast.success("Posting successfully");
  } catch (error) {
    console.log(error);
    toast.error("failed");
  }
};
