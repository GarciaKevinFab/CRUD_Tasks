import axios from 'axios';
import { BASE_URL } from "../utils/config";

export const getTasks = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export const getTask = async (_id) => {
    const response = await axios.get(`${BASE_URL}/${_id}`);
    return response.data;
}

export const createTask = async (task) => {
    const response = await axios.post(BASE_URL, task);
    return response.data;
}

export const updateTask = async (_id, task) => {
    const response = await axios.patch(`${BASE_URL}/${_id}`, task);
    return response.data;
}

export const deleteTask = async (_id) => {
    await axios.delete(`${BASE_URL}/${_id}`);
}