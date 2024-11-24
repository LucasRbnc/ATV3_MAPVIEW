import { useContext } from "react";
import { ContactContext } from "../context/context";

export const useContact = () => useContext(ContactContext)