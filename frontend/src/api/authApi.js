import axiosInstance from "./axiosInstance";

export const loginUser=async (username,password)=>{
    const res=await axiosInstance.post("/auth/login",{username,password});
    return res.data;
}