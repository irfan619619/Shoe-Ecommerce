import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ContextProvider } from './context/MainContext'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import HomePage from './pages/Home'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import { Toaster } from "react-hot-toast";
import About from './pages/About'
import AdminHome from './admin/AdminHome'
import ManageProducts from './admin/component/Adminproducts'
import ManageUsers from './admin/Manageusers'
import ManageOrders from './admin/Adminorders'


export default function App() {
  return (
    <Router>
    <ContextProvider>
       <Toaster position="top-center" reverseOrder={false} />
    
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='/confirmation' element={<Confirmation/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/adminhome' element={<AdminHome/>}/>
      <Route path='/manageproducts' element={<ManageProducts/>}/>
      <Route path='/manageusers' element={<ManageUsers/>}/>
      <Route path='/adminorders' element={<ManageOrders/>}/>
    </Routes>
    </ContextProvider>
    </Router>
  )
}
