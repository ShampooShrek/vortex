import { useContext } from 'react';
import MessageBoxContext from '../context/messageContent';

const useMessage = () => useContext(MessageBoxContext)

const messageAuth = useMessage

export default messageAuth
