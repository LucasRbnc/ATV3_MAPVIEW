import { ContactInterface } from "../types/type";
import api from "./api";

export const getContacts = async () => {
    const response = await api.get('/');
    return response.data;
};

export const addContact = async (contact: Omit<ContactInterface, 'id'>) =>{
    const response = await api.post('/', contact);
    return response.data;
};

