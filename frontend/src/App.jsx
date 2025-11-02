import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Event from "./pages/Event.jsx"
import Layout from "./pages/admin/Layout.jsx"
import Dashboard from "./pages/admin/Dashboard.jsx"
import AddEvent from "./pages/admin/AddEvent.jsx"
import ListEvent from "./pages/admin/ListEvent.jsx"
import Login from "./components/admin/Login.jsx"
import {Toaster} from 'react-hot-toast'

import 'quill/dist/quill.snow.css'
import { useAppContext } from "./context/AppContext.jsx"

function App() {

  const {token} = useAppContext()
  

  return (
    <>
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path='/admin' element={token ? <Layout />: <Login/>}> 
        <Route index element={<Dashboard/>}/>
        <Route path='addEvent' element={<AddEvent/>}/>
        <Route path='listEvent' element={<ListEvent/>}/>
        

        </Route>
      </Routes>
      
    </div>
    </>
  )
}

export default App
