import React from 'react'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login' 
import ProtectedRoute  from './protectedRoute/protectedRoute' 
import Chat from './pages/Chat'
import ChatPage from './pages/ChatPage'
import Navbar from './components/Navbar'
import Createchat from './pages/Createchat'
import GroupChats from './pages/GroupChats'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
export default function App() {
  const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/chats' element={<ProtectedRoute><Navbar></Navbar><Chat></Chat><Footer></Footer></ProtectedRoute>}></Route>
        <Route path='/grup_chats' element={<ProtectedRoute><Navbar></Navbar><GroupChats></GroupChats><Footer></Footer></ProtectedRoute>}></Route>
        <Route path='/' element={<ProtectedRoute><Navbar></Navbar><HomePage></HomePage></ProtectedRoute>}></Route>
        <Route path='/createchats' element={<ProtectedRoute><Navbar></Navbar><Createchat></Createchat><Footer></Footer></ProtectedRoute>}></Route>
        
        <Route path='/chats/:id' element={<ProtectedRoute><Navbar></Navbar><ChatPage></ChatPage><Footer></Footer></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
