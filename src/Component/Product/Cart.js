import API from '../../API/API'
import { useEffect, useState, useContext } from 'react'
import { useDispatch } from "react-redux"
import { ProductContext } from '../../Context/Context'
import { DecrementCart } from '../../Redux/Action/QtyCart'

function Cart() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    // const productContext = useContext(ProductContext)

    useEffect(() => {
        const product = JSON.parse(localStorage.getItem('products'))
        API.post("product/cart", product)
            .then(res => {
                setData(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])

    function qtyUp(e) {
        e.preventDefault()
        const id = e.target.id
        const products = JSON.parse(localStorage.getItem('products'))

        let newData = [...data];
        newData.map((value, key) => {
            if (value.id == id) {
                newData[key].qty += 1
            }
        })
        setData(newData)

        Object.keys(products).map(value => {
            if (value == id) {
                products[value] += 1
            }
        })
        localStorage.setItem('products', JSON.stringify(products));
    }

    function qtyDown(e) {
        e.preventDefault()
        const id = e.target.id
        const products = JSON.parse(localStorage.getItem('products'))

        let newData = [...data];
        newData.map((value, key) => {
            if (value.id == id) {
                if (value.qty > 1) {
                    newData[key].qty -= 1
                    Object.keys(products).map(value1 => {
                        if (value1 == id) {
                            products[value1] -= 1
                        }
                    })

                    localStorage.setItem('products', JSON.stringify(products));
                } else {
                    newData.splice(key, 1)
                    delete products[value.id];
                    localStorage.setItem('products', JSON.stringify(products));

                    // productContext.QtyCart(Object.keys(products).length)
                    const action = DecrementCart(Object.keys(products).length)
                    dispatch(action)
                }
            }
        })
        setData(newData)
    }

    function removeProduct(e) {
        e.preventDefault()
        const id = e.target.id
        const products = JSON.parse(localStorage.getItem('products'))

        let newData = [...data];
        newData.map((value, key) => {
            if (value.id == id) {
                newData.splice(key, 1)
                delete products[value.id];
                localStorage.setItem('products', JSON.stringify(products));
            }
        })
        setData(newData)

        // productContext.QtyCart(Object.keys(products).length)
        const action = DecrementCart(Object.keys(products).length)
        dispatch(action)
    }

    function renderProduct() {
        if (data.length > 0) {
            return data.map((value, index) => {
                const image = JSON.parse(value.image)
                return (
                    <tr key={index}>
                        <td class="cart_product">
                            <a href=""><img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + '/' + image[0]} alt="" /></a>
                        </td>
                        <td class="cart_description">
                            <h4><a href="">{value.name}</a></h4>
                            <p>Web ID: {value.id}</p>
                        </td>
                        <td class="cart_price">
                            <p>${value.price}</p>
                        </td>
                        <td class="cart_quantity">
                            <div class="cart_quantity_button">
                                <a onClick={qtyUp} id={value.id} class="cart_quantity_up" href=""> + </a>
                                <input class="cart_quantity_input" type="text" name="quantity" value={value.qty} autocomplete="off" size="2" />
                                <a onClick={qtyDown} id={value.id} class="cart_quantity_down" href=""> - </a>
                            </div>
                        </td>
                        <td class="cart_total">
                            <p class="cart_total_price">${value.price * value.qty}</p>
                        </td>
                        <td class="cart_delete">
                            <a onClick={removeProduct} id={value.id} class="cart_quantity_delete" href=""><i onClick={removeProduct} id={value.id} class="fa fa-times"></i></a>
                        </td>
                    </tr>
                )
            })
        }
    }

    function totalPrice() {
        if (data.length > 0) {
            const totalPrice = data.reduce((acc, value) => acc + value.price * value.qty, 0) + 2
            return totalPrice
        }
    }

    function totalCart() {
        if (data.length > 0) {
            const totalcart = data.reduce((acc, value) => acc + value.price * value.qty, 0)
            return totalcart
        }
    }

    return (
        <>
            <section id="cart_items">
                <div class="container">
                    <div class="breadcrumbs">
                        <ol class="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li class="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div class="table-responsive cart_info">
                        <table class="table table-condensed">
                            <thead>
                                <tr class="cart_menu">
                                    <td class="image">Item</td>
                                    <td class="description"></td>
                                    <td class="price">Price</td>
                                    <td class="quantity">Quantity</td>
                                    <td class="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProduct()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
                <div class="container">
                    <div class="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="chose_area">
                                <ul class="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul class="user_info">
                                    <li class="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li class="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li class="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a class="btn btn-default update" href="">Get Quotes</a>
                                <a class="btn btn-default check_out" href="">Continue</a>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>${totalCart()}</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>${totalPrice()}</span></li>
                                </ul>
                                <a class="btn btn-default update" href="">Update</a>
                                <a class="btn btn-default check_out" href="">Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart