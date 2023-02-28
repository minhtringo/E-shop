import { useState, useEffect } from "react";
import FormError from "../../Error/FormError";
import API from '../../API/API'

function Update() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [inputFile, setInputFile] = useState("")
    const [avatar, setAvatar] = useState("")
    const [errors, setErrors] = useState({})
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })

    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function handleFile(e) {
        const files = e.target.files;
        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setInputFile(files)
        }
        reader.readAsDataURL(files[0]);
    }
    function handleForm(e) {
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        if (inputs.password == '') {
            errorsSubmit.pass = 'Vui lòng nhập mật khẩu của bạn'
            flag = false
        }
        if (inputFile == "" || inputFile.length == 0) {
            errorsSubmit.avatar = 'Vui lòng chọn avatar'
            flag = false
        } else {
            const getSizeImage = inputFile[0].size;
            const acceptFiles = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
            const nameFile = inputFile[0].name
            const lastNameFile = nameFile.split('.').pop()

            if (!acceptFiles.includes(lastNameFile)) {
                errorsSubmit.namefiles = 'File không hợp lệ'
                flag = false
            } else if (getSizeImage > 1024 * 1024) {
                errorsSubmit.size = "Chỉ cho phép tải tệp tin nhỏ hơn 1MB"
                flag = false
            }
        }

        if (flag) {
            setErrors("")

            const formData = new FormData()
            formData.append('name', inputs.name ? inputs.name : user.name)
            formData.append('email', inputs.email ? inputs.email : user.email)
            formData.append('password', inputs.password)
            formData.append('phone', inputs.phone ? inputs.phone : user.phone)
            formData.append('address', inputs.address ? inputs.address : user.address)

            let token = JSON.parse(localStorage.getItem('token'))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            API.post("user/update/" + user.id, formData, config)
                .then(res => {
                    const userUpdate = res.data.Auth
                    localStorage.setItem("user", JSON.stringify(userUpdate))

                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        alert("Cập nhật thành công")
                    }
                })
        } else {
            setErrors(errorsSubmit)
        }
    }

    return (
        <div className="col-sm-6">
            <div className="signup-form">
                <h2>User Update!</h2>
                <form onSubmit={handleForm} action="#" encType="multipart/form-data">
                    <input type="text" name="name" placeholder={user.name} onChange={handleInput} />
                    <input type="email" name="email" placeholder={user.email} readOnly onChange={handleInput} />
                    <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                    <input type="text" name="phone" placeholder={user.phone} onChange={handleInput} />
                    <input type="text" name="address" placeholder={user.address} onChange={handleInput} />
                    <input type="file" name="avatar" placeholder="Avatar" onChange={handleFile} />
                    <button type="submit" class="btn btn-default">Signup</button>
                </form>

                <FormError errors={errors} />
            </div>
        </div>
    )
}

export default Update