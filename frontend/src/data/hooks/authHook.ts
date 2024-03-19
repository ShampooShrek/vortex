import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext)

const authHook = useAuth

export default authHook
