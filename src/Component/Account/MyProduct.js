import API from "../../API/API"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function MyProduct() {

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

    function removeProduct(e) {
        e.preventDefault()
        const id = e.target.id

        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        API.get("user/delete-product/" + id, config)
            .then(res => {
                setData(res.data.data)
            })
    }

    function renderProduct() {
        if (Object.keys(data).length > 0) {
            return Object.values(data).map((item, index) => {
                const image = JSON.parse(item.image)
                return (
                    <tr>
                        <td class="cart_id">
                            <h4 href="">{item.id}</h4>
                        </td>
                        <td class="cart_description">
                            <h4><a href="">{item.detail}</a></h4>
                            <p>{item.company_profile}</p>
                        </td>
                        <td class="cart_image">
                            <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + item.id_user + '/' + image[0]} alt="hình ảnh" />
                        </td>
                        <td class="cart_quantity">
                            <p>${item.price}</p>
                        </td>
                        <td class="cart_total">
                            <Link to={"/account/product/edit/" + item.id}><i class="fa fa-reply-all" aria-hidden="true"></i></Link>
                            <Link id={item.id} onClick={removeProduct} to=""><i id={item.id} class="fa fa-times" aria-hidden="true"></i></Link>
                        </td>
                    </tr>
                )
            })
        }
    }

    return (
        <div class="table-responsive cart_info col-sm-9">
            <table class="table table-condensed">
                <thead>
                    <tr class="cart_menu">
                        <td class="id">Id</td>
                        <td class="name">Name</td>
                        <td class="image">Image</td>
                        <td class="price">Price</td>
                        <td class="action">Action</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {renderProduct()}
                </tbody>
            </table>
        </div>
    )
}

export default MyProduct