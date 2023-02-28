import { useEffect, useState } from 'react'
import React from "react"
import { useParams } from "react-router-dom"
import API from '../../API/API'
import FormError from "../../Error/FormError";

function EditProduct() {
    let params = useParams()
    const [data, setData] = useState('')

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        API.get("user/product/" + params.id, config)
            .then(res => {
                setData(res.data.data);
            })
            .catch(error => console.log(error))
    }, [])

    function subInputSale() {
        if (inputs.status == '0') {
            return (
                <React.Fragment>
                    <input type="number" name="sale" placeholder={data.sale} onChange={handleInput} /> %
                </React.Fragment>
            )
        }
    }

    const [inputs, setInputs] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        avatar: '',
        detail: '',
        status: '',
        sale: '',
    })
    const [inputFile, setInputFile] = useState("")
    const [images, setImage] = useState('');
    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        console.log(value);
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

        if (images == '') {
            errorsSubmit.image = 'Vui lòng chọn ảnh cần xóa'
            flag = false
        }

        if (inputFile == "" || inputFile.length == 0) {
            errorsSubmit.avatar = 'Vui lòng chọn avatar'
            flag = false
        } else {
            if (inputFile.length >= 4) {
                alert("Tải lên tối đa 3 hình ảnh")
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
                        errorsSubmit.namefiles = 'file không hợp lệ'
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

        if (flag) {
            setErrors("")

            let url = "user/edit-product/" + data.id
            let token = JSON.parse(localStorage.getItem('token'))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            const formData = new FormData()
            formData.append('name', inputs.name ? inputs.name : data.name)
            formData.append('price', inputs.price ? inputs.price : data.price)
            formData.append('category', inputs.category ? inputs.category : data.id_category)
            formData.append('brand', inputs.brand ? inputs.brand : data.id_brand)
            formData.append('company', inputs.company ? inputs.company : data.company_profile)
            formData.append('detail', inputs.detail ? inputs.detail : data.detail)
            formData.append('status', inputs.status ? inputs.status : data.status)
            formData.append('sale', inputs.sale ? inputs.sale : data.sale)

            for (var i = 0; i < images.length; i++) {
                formData.append("avatarCheckBox[]", images[i])
            }
            for (var i = 0; i < inputFile.length; i++) {
                formData.append("file[]", inputFile[i])
            }

            API.post(url, formData, config)
                .then(res => {
                    console.log(res);
                })
            alert("cập nhật sản phẩm thành công")
        } else {
            setErrors(errorsSubmit)
        }
    }

    function handleImage(e) {
        const image = e.target.name
        if (e.target.checked) {
            setImage(state => [...state, image])
        } else {
            const newImages = images.filter((value) => value !== image);
            setImage(newImages)
        }
    }
    function imageProduct() {
        if (Object.keys(data).length > 0) {
            return data.image.map(value => {
                return (
                    <li>
                        <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + data.id_user + '/' + value} alt="hình ảnh" />
                        <input name={value} onClick={handleImage} type="checkbox" />
                    </li>
                )
            })
        }
    }

    return (
        <div className="col-sm-6">
            <div className="signup-form">
                <h2>Edit product!</h2>
                <form action="#" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder={data.name} onChange={handleInput} />
                    <input type="text" name="price" placeholder={data.price} onChange={handleInput} />
                    <select name="category" onChange={handleInput}>
                        <option value=''>Please choose category</option>
                        <option value='1'>Category 1</option>
                        <option value='2'>Category 2</option>
                    </select>
                    <select name="brand" onChange={handleInput}>
                        <option value=''>Please choose brand</option>
                        <option value='1'>Brand 1</option>
                        <option value='2'>Brand 2</option>
                    </select>
                    <select name="status" onChange={handleInput}>
                        <option value=''>Status</option>
                        <option value='1'>New</option>
                        <option value='0'>Sale</option>
                    </select>
                    {subInputSale()}
                    <ul>
                        {imageProduct()}
                    </ul>
                    <input type="file" name="avatar" placeholder="Avatar" multiple onChange={handleFile} />
                    <input type="text" name="detail" placeholder={data.detail} onChange={handleInput} />
                    <button type="submit" class="btn btn-default">Update</button>
                </form>
                <FormError errors={errors} />
            </div>
        </div>
    )
}

export default EditProduct