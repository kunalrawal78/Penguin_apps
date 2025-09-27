// src/api/notesApi.js
// Uncomment these lines when your backend is ready
/*
import axios from "axios";
const API_URL = "http://localhost:5000/api/notes";

export const fetchNotes = (params) => axios.get(API_URL, { params });
export const fetchNote = (id) => axios.get(`${API_URL}/${id}`);
export const createNote = (data) => axios.post(API_URL, data);
export const updateNote = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);
*/


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