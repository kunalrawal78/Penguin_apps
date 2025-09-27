
import axiosInstance from "./axiosInstance";

export const fetchNotes= async ()=>{
    const res=await axiosInstance.get("/notes");
    return res.data;
}

export const createNote=async (data)=>{
    const res=await axiosInstance.post("/notes",data);
    return res.data;
}

export const deleteNote = async (id)=>{
    const res=await axiosInstance.delete('/notes/${id');
    return res.data;
}
