import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ProductContext } from '../../Context/Context';
import ProductWishList from '../Product/ProductWL';

function Header() {
    const navigation = useNavigate()

    // START CONTEXT
    // const productContext = useContext(ProductContext)
    // const qtyCart = productContext.QtyProducts
    // const qtyWL = productContext.QtyProductsWl
    // function ProductCart() {
    //     const product = JSON.parse(localStorage.getItem('products'))
    //     const qtyProduct = Object.keys(product).length

    //     if (qtyProduct) {
    //         return (
    //             <li><Link to="/product/cart"><i class="fa fa-shopping-cart"></i> Cart <span>{qtyProduct ? qtyProduct : 0}</span></Link></li>
    //         )
    //     } else {
    //         return (
    //             <li><Link to="/product/cart"><i class="fa fa-shopping-cart"></i> Cart <span>{qtyCart ? qtyCart : 0}</span> </Link></li>
    //         )
    //     }
    // }
    // function ProductWishList() {
    //     const productWL = JSON.parse(localStorage.getItem('productWishlist'))
    //     const qtyproductWL = Object.keys(productWL).length

    //     if (qtyproductWL) {
    //         return (
    //             <li><Link to="/product/wishlist"><i class="fa fa-star"></i> Wishlist <span>{qtyproductWL ? qtyproductWL : 0}</span></Link></li>
    //         )
    //     } else {
    //         return (
    //             <li><Link to="/product/wishlist"><i class="fa fa-star"></i> Wishlist <span>{qtyWL ? qtyWL : 0}</span></Link></li>
    //         )
    //     }
    // }
    // END CONTEXT

    // START REDUX
    const QtyCart = useSelector(state => state.QtyCart)
    const QtyWL = useSelector(state => state.QtyWL)
    function Cart() {
        const products = JSON.parse(localStorage.getItem('products'))
        const qtyCart = Object.keys(products).length

        if (qtyCart) {
            return (
                <li><Link to="/product/cart"><i class="fa fa-shopping-cart"></i> Cart <span>{qtyCart ? qtyCart : 0}</span></Link></li>
            )
        } else {
            return (
                <li><Link to="/product/cart"><i class="fa fa-shopping-cart"></i> Cart <span>{QtyCart ? QtyCart : 0}</span></Link></li>
            )
        }
    }
    function Wishlist() {
        const productsWL = JSON.parse(localStorage.getItem('productWishlist'))
        const qtyWL = Object.keys(productsWL).length

        if (qtyWL) {
            return (
                <li><Link to="/product/wishlist"><i class="fa fa-shopping-cart"></i> Wishlist <span>{qtyWL ? qtyWL : 0}</span></Link></li>
            )
        } else {
            return (
                <li><Link to="/product/wishlist"><i class="fa fa-shopping-cart"></i> Wishlist <span>{QtyWL ? QtyWL : 0}</span></Link></li>
            )
        }
    }
    // END REDUX

    function Login() {
        const loginSuccess = localStorage.getItem('loginSuccess');

        if (JSON.parse(loginSuccess)) {
            return (
                <li><a onClick={logOut} href="logout"><i class="fa fa-unlock"></i> Logout</a></li>
            )
        } else {
            return (
                <li><a href="login"><i class="fa fa-lock"></i> Login</a></li>
            )
        }
    }

    function logOut() {
        localStorage.removeItem('loginSuccess');
        navigation('/login')
    }

    function Account() {
        const loginSuccess = JSON.parse(localStorage.getItem('loginSuccess'));
        if (loginSuccess) {
            return (
                <li><Link to="account/update"><i class="fa fa-user"></i> Account</Link></li>
            )
        }
    }


    return (
        <header id="header">
            <div class="header_top">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="contactinfo">
                                <ul class="nav nav-pills">
                                    <li><a href="#"><i class="fa fa-phone"></i> +84 934 412 215</a></li>
                                    <li><a href="#"><i class="fa fa-envelope"></i> ngominhtri454@domain.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="social-icons pull-right">
                                <ul class="nav navbar-nav">
                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
                                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="header-middle">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 clearfix">
                            <div class="logo pull-left">
                                <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
                            </div>
                            <div class="btn-group pull-right clearfix">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="">Canada</a></li>
                                        <li><a href="">UK</a></li>
                                    </ul>
                                </div>

                                <div class="btn-group">
                                    <button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="">Canadian Dollar</a></li>
                                        <li><a href="">Pound</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 clearfix">
                            <div class="shop-menu clearfix pull-right">
                                <ul class="nav navbar-nav">
                                    {Account()}
                                    {/* {ProductWishList()} */}
                                    {Wishlist()}
                                    <li><a href="checkout.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>
                                    {/* {ProductCart()} */}
                                    {Cart()}
                                    {Login()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="header-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                            </div>
                            <div class="mainmenu pull-left">
                                <ul class="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/" class="active">Home</Link></li>
                                    <li class="dropdown"><Link to="#">Shop<i class="fa fa-angle-down"></i></Link>
                                        <ul role="menu" class="sub-menu">
                                            <li><Link to="/product/list">Products</Link></li>
                                            <li><Link to="product-details.html">Product Details</Link></li>
                                            <li><Link to="checkout.html">Checkout</Link></li>
                                            <li><Link to="cart.html">Cart</Link></li>
                                            <li><Link to="login.html">Login</Link></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown"><a href="#">Blog<i class="fa fa-angle-down"></i></a>
                                        <ul role="menu" class="sub-menu">
                                            <li><Link to="blog/list">Blog List</Link></li>
                                            <li><Link to="blog/detail">Blog Single</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="404.html">404</Link></li>
                                    <li><Link to="contact-us.html">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header;