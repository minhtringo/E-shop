import React, { useEffect, useState } from 'react'
import API from "../../API/API"
import FormError from "../../Error/FormError";

function AddProduct() {
    const [data, setData] = useState([])
    useEffect(() => {
        API.get("category-brand")
            .then(res => {
                setData(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    function category() {
        if (Object.keys(data).length > 0) {
            return data.category.map((cat, index) => {
                return (
                    <option value={index + 1}>{cat.category}</option>
                )
            })

        }
    }
    function brand() {
        if (Object.keys(data).length > 0) {
            return data.brand.map((bran, index) => {
                return (
                    <option value={index + 1}>{bran.brand}</option>
                )
            })

        }
    }
    function subInputSale() {
        if (inputs.status == '0') {
            return (
                <React.Fragment>
                    <input type="number" name="sale" placeholder="0" onChange={handleInput} /> %
                </React.Fragment>
            )
        }
    }

    const [inputs, setInputs] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        status: '',
        sale: '',
        company: '',
        avatar: '',
        detail: '',
    })
    const [errors, setErrors] = useState({})
    const [inputFile, setInputFile] = useState("")

    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function handleFile(e) {
        const files = e.target.files;
        setInputFile(files)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        if (inputs.name == '') {
            errorsSubmit.name = 'Vui lòng nhập tên sản phẩm'
            flag = false
        }

        if (inputs.price == '') {
            errorsSubmit.price = 'Vui lòng nhập giá sản phẩm'
            flag = false
        }

        if (inputs.category == '') {
            errorsSubmit.category = 'Vui lòng chọn catogory'
            flag = false
        }

        if (inputs.brand == '') {
            errorsSubmit.brand = 'Vui lòng chọn brand'
            flag = false
        }

        if (inputs.status == '') {
            errorsSubmit.status = 'Vui lòng nhập Status'
            flag = false
        } else {
            if (inputs.status == '0') {
                if (inputs.sale == '') {
                    errorsSubmit.sale = 'Vui lòng nhập sale'
                    flag = false
                }
            }
        }

        if (inputs.company == '') {
            errorsSubmit.company = 'Vui lòng nhập tên shop'
            flag = false
        }

        if (inputFile == "" || inputFile.length == 0) {
            errorsSubmit.avatar = 'Vui lòng chọn avatar'
            flag = false
        } else {
            if (inputFile.length >= 4) {
                errorsSubmit.image = 'Vui lòng tải lên tối đa 3 hình ảnh'
                flag = false
            } else {
                const getSizeImage = Object.values(inputFile).map(img => {
                    return img.size
                })
                const acceptFiles = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
                const nameFile = Object.values(inputFile).map(img => {
                    return img.name
                })
                const lastNameFile = nameFile.map(name => {
                    return name.split('.').pop()
                })

                lastNameFile.forEach(name => {
                    if (!acceptFiles.includes(name)) {
                        errorsSubmit.namefiles = 'File không hợp lệ'
                        flag = false
                    } else {
                        getSizeImage.forEach(size => {
                            if (size > 1024 * 1024) {
                                errorsSubmit.size = "Chỉ cho phép tải tệp tin nhỏ hơn 1MB"
                                flag = false
                            }
                        })
                    }
                });
            }
        }

        if (inputs.detail == '') {
            errorsSubmit.detail = 'Vui lòng nhập giới thiệu sản phẩm'
            flag = false
        }

        if (flag) {
            setErrors("")

            let url = "user/add-product"
            let token = JSON.parse(localStorage.getItem('token'))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            const formData = new FormData()
            formData.append('name', inputs.name)
            formData.append('price', inputs.price)
            formData.append('category', inputs.category)
            formData.append('brand', inputs.brand)
            formData.append('company', inputs.company)
            formData.append('detail', inputs.detail)
            formData.append('status', inputs.status)
            formData.append('sale', inputs.status == '0' ? inputs.sale : '')

            for (var i = 0; i < inputFile.length; i++) {
                formData.append("file[]", inputFile[i])
            }

            API.post(url, formData, config)
                .then(res => {
                    console.log(res);
                })

            alert("Đăng sản phẩm thành công")
        } else {
            setErrors(errorsSubmit)
        }
    }

    return (
        <div className="col-sm-6">
            <div className="signup-form">
                <h2>Create product!</h2>
                <form action="#" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleInput} />
                    <input type="text" name="price" placeholder="Price" onChange={handleInput} />
                    <select name="category" onChange={handleInput}>
                        <option value=''>Please choose category</option>
                        {category()}
                    </select>
                    <select name="brand" onChange={handleInput}>
                        <option value=''>Please choose brand</option>
                        {brand()}
                    </select>
                    <select name="status" onChange={handleInput}>
                        <option value=''>Status</option>
                        <option value='1'>New</option>
                        <option value='0'>Sale</option>
                    </select>
                    {subInputSale()}
                    <input type="text" name="company" placeholder="Company profile" onChange={handleInput} />
                    <input type="file" name="avatar" placeholder="Avatar" multiple onChange={handleFile} />
                    <textarea type="text" name="detail" placeholder="Detail" rows="11" onChange={handleInput} />
                    <button type="submit" class="btn btn-default">Signup</button>
                </form>

                <FormError errors={errors} />
            </div>
        </div>
    )
}

export default AddProduct;






















