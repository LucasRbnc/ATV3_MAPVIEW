import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getContacts } from "../service/contactService";
import { ContactInterface } from "../types/type";

interface ContextData {
    contacts: ContactInterface[];
    loadContacts: () => Promise<void>;
}

export const ContactContext = createContext<ContextData>({} as ContextData);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
    const [contacts, setContacts] = useState<ContactInterface[]>([]);

    const loadContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <ContactContext.Provider value={{ contacts, loadContacts }}>
            {children}
        </ContactContext.Provider>
    );
};
