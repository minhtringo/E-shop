import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import BlogList from './Component/Blog/BlogList';
import BlogDetail from './Component/Blog/BlogDetail';
import Users from './Component/Member/index';
import Update from './Component/Account/Update';
import AddProduct from './Component/Account/AddProduct';
import MyProduct from './Component/Account/MyProduct';
import EditProduct from './Component/Account/EditProduct';
import ShowProduct from './Component/Product/ShowProduct';
import ProductDetail from './Component/Product/ProductDetail';
import Cart from './Component/Product/Cart';
import ProductWishList from './Component/Product/ProductWL';
import Store from './Redux/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Router>
        <App>
          <Routes>
            <Route path='/' element={<ShowProduct />} />
            <Route path='/blog/list' element={<BlogList />} />
            <Route path='/blog/detail/:id' element={<BlogDetail />} />
            <Route path='/login' element={<Users />} />
            <Route path='/account/update' element={<Update />} />
            <Route path='/account/product/add' element={<AddProduct />} />
            <Route path='/account/product/list' element={<MyProduct />} />
            <Route path='/account/product/edit/:id' element={<EditProduct />} />
            <Route path='/product/detail/:id' element={<ProductDetail />} />
            <Route path='/product/cart' element={<Cart />} />
            <Route path='/product/wishlist' element={<ProductWishList />} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
