import { useEffect, useState, useContext } from 'react'
import API from '../../API/API'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { ProductContext } from '../../Context/Context'
import { AddCart } from '../../Redux/Action/QtyCart'
import { DecrementWl } from '../../Redux/Action/QtyWL'

function ProductWishList() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    // const productContext = useContext(ProductContext)

    useEffect(() => {
        API.get("product/wishlist")
            .then(res => {
                const productWL = JSON.parse(localStorage.getItem('productWishlist'))
                let id = []
                res.data.data.map(value => {
                    return id.push(`${value.id}`)
                })

                const commonId = id.filter(element => productWL.includes(element));
                const data = res.data.data.filter(element => commonId.includes(`${element.id}`));
                setData(data)
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

    function DeleteWL(e) {
        e.preventDefault()
        const id = e.target.id
        const productWL = JSON.parse(localStorage.getItem('productWishlist'))

        productWL.map((value, index) => {
            if (value == id) {
                productWL.splice(index, 1)
                localStorage.setItem('productWishlist', JSON.stringify(productWL));
            }
        })

        let newData = [...data];
        const dataCurrent = newData.filter(element => productWL.includes(`${element.id}`));
        setData(dataCurrent)
        console.log(productWL);

        // productContext.QtyWL(Object.keys(productWL).length)
        const action = DecrementWl(productWL.length)
        dispatch(action)
    }

    function renderProductWL() {
        if (data.length > 0) {
            return data.map((value, index) => {
                const image = JSON.parse(value.image)
                return (
                    <div class="col-sm-4" key={index}>
                        <div class="product-image-wrapper">
                            <div class="single-products">
                                <div class="productinfo text-center">
                                    <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + '/' + image[0]} alt="" />
                                    <h2>${value.price}</h2>
                                    <p>{value.company_profile}</p>
                                    <Link to="/" id={value.id} onClick={Addtocart} class="btn btn-default add-to-cart"><i id={value.id} onClick={Addtocart} class="fa fa-shopping-cart"></i>Add to cart</Link>
                                </div>
                                <div class="product-overlay">
                                    <div class="overlay-content">
                                        <h2>${value.price}</h2>
                                        <p>{value.company_profile}</p>
                                        <Link to="/" id={value.id} onClick={Addtocart} class="btn btn-default add-to-cart"><i id={value.id} onClick={Addtocart} class="fa fa-shopping-cart"></i>Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="choose">
                                <ul class="nav nav-pills nav-justified">
                                    <li><Link id={value.id} onClick={DeleteWL} to=''><i class="fa fa-plus-square"></i>Delete wishlist</Link></li>
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
                {renderProductWL()}
            </div>
        </div>
    )
}

export default ProductWishList