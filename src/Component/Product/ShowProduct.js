import { Link } from "react-router-dom"
import API from '../../API/API'
import { useEffect, useState, useContext } from 'react'
import { useDispatch } from "react-redux"
import { ProductContext } from "../../Context/Context"
import { AddWL } from "../../Redux/Action/QtyWL"
import { AddCart } from "../../Redux/Action/QtyCart"

function ShowProduct() {
    const dispatch = useDispatch()
    // const productContext = useContext(ProductContext)

    const [data, setData] = useState([])
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        API.get("user/my-product", config)
            .then(res => {
                setData(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])

    function Addtocart(e) {
        e.preventDefault()
        e.stopPropagation()

        let id = e.target.id
        let products = {}
        let x = 1
        let productLocal = localStorage.getItem('products');
        if (productLocal) {
            products = JSON.parse(productLocal);
            Object.keys(products).map(value => {
                if (value == id) {
                    products[id] += 1
                    x = 2
                }
            })
        }
        if (x == 1) {
            products[id] = 1
        }
        localStorage.setItem('products', JSON.stringify(products));

        // productContext.QtyCart(Object.keys(products).length)
        const action = AddCart(Object.keys(products).length)
        dispatch(action)
    }

    function Addtowishlist(e) {
        e.preventDefault()
        let id = e.target.id

        let products = []
        let x = 1
        let productWL = localStorage.getItem('productWishlist');
        if (productWL) {
            products = JSON.parse(productWL);
            products.map(value => {
                if (value == id) {
                    x = 2
                }
            })
        }
        if (x == 1) {
            products.push(id);
        }
        localStorage.setItem('productWishlist', JSON.stringify(products));

        // productContext.QtyWL(products.length)
        const action = AddWL(Object.keys(products).length)
        dispatch(action)
    }

    function renderProduct() {
        if (Object.keys(data).length > 0) {
            return Object.values(data).map((value, index) => {
                const image = JSON.parse(value.image)
                return (
                    <div class="col-sm-4" key={index + 1}>
                        <div class="product-image-wrapper">
                            <div class="single-products">
                                <div class="productinfo text-center">
                                    <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + '/' + image[0]} alt="" />
                                    <h2>${value.price}</h2>
                                    <p>{value.company_profile}</p>
                                    <Link to="/" onClick={Addtocart} id={value.id} class="btn btn-default add-to-cart"><i onClick={Addtocart} id={value.id} class="fa fa-shopping-cart"></i>Add to cart</Link>
                                </div>
                                <div class="product-overlay">
                                    <div class="overlay-content">
                                        <h2>${value.price}</h2>
                                        <p>{value.company_profile}</p>
                                        <Link to="/" onClick={Addtocart} id={value.id} class="btn btn-default add-to-cart"><i onClick={Addtocart} id={value.id} class="fa fa-shopping-cart"></i>Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="choose">
                                <ul class="nav nav-pills nav-justified">
                                    <li><Link to="#" id={value.id} onClick={Addtowishlist}><i id={value.id} onClick={Addtowishlist} class="fa fa-plus-square"></i>Add to wishlist</Link></li>
                                    <li><Link id={value.id} to={"/product/detail/" + value.id}><i class="fa fa-plus-square"></i>More</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div class="col-sm-9 padding-right">
            <div class="features_items">
                <h2 class="title text-center">Features Items</h2>
                {renderProduct()}
            </div>
        </div>
    )
}

export default ShowProduct