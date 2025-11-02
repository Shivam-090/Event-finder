import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({children})=>{

  const navigate = useNavigate()

  const [token, setToken] = useState(null)
  const [events, setEvents] = useState([])
  const [input, setInput] = useState('')

  const fetchEvents = async ()=>{
    try{
      
      const {data} = await axios.get('/api/event/all');
      data.success ? setEvents(data.events): toast.error(data.message)

    }catch (error){
       toast.error(error.message)
    }
  }

const incrementComing = async (eventId) => {
  try {
    const { data } = await axios.patch(`/api/event/${eventId}/coming`);
    if (data.success) {
      toast.success("Thanks! You're marked as coming 🎉");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  useEffect(()=>{
    fetchEvents();
    const token = localStorage.getItem('token')
    if(token){
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }

  },[])


  const value ={
    axios, navigate, token, setToken, events, setEvents, input, setInput, incrementComing
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
  return useContext(AppContext)
}