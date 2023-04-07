
import './App.css';
import Header from './components/Layouts/header';
import Footer from './components/Layouts/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/Product/productDetail';
import ProductSearch from './components/Product/productSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store'
import { loadUser } from './actions/userAction';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/updateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import UserOrders from './components/Order/userOrders';
import OrderDetail from './components/Order/orderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/productList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/Updateuser';
import ReviewList from './components/admin/ReviewList';


function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])


  return (
    <Router>
        <div className="App">
    <HelmetProvider>
      <Header/>
      <div className ="container container-fluid">
      <ToastContainer theme='dark'/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search/:keyword' element={<ProductSearch/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute> } />
        <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } /> 
        <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
        <Route path='/password/forgot' element={<ForgotPassword/> } /> 
        <Route path='/password/reset/:token' element={<ResetPassword/> } />     
        <Route path='/cart' element={<Cart/> } />   
        <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute> } />    
        <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute> } /> 
        <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute> } /> 
        <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />    
        <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />    

        {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />
} 
    </Routes>          
      </div>
      {/* Admin Routes */}
      <Routes>
      <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} ><Dashboard/></ProtectedRoute> } /> 
      <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} ><ProductList/></ProtectedRoute> } /> 
      <Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true} ><NewProduct/></ProtectedRoute> } /> 
      <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} ><UpdateProduct/></ProtectedRoute> } /> 
      <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true} ><OrderList/></ProtectedRoute> } /> 
      <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} ><UpdateOrder/></ProtectedRoute> } /> 
      <Route path='/admin/users' element={<ProtectedRoute isAdmin={true} ><UserList/></ProtectedRoute> } /> 
      <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} ><UpdateUser/></ProtectedRoute> } /> 
      <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true} ><ReviewList/></ProtectedRoute> } /> 
      </Routes>
     
 
      <Footer/>

    </HelmetProvider>
     

    </div>
      
    </Router>
  
  );
}

export default App;
