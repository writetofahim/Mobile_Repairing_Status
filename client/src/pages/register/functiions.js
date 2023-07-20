import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const addUser = async (formData, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.post("/auth/register", formData);
    setIsLoading(false);
    toast.success("New user added successfully");
    console.log(res.data);
  } catch (error) {
    setIsLoading(false);
    error.response?.status && toast.error("Username or Email already exists");
  }
};
