import { useState } from "react";
import FormError from "../../Error/FormError";
import API from '../../API/API'

function Register() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })
    const [errors, setErrors] = useState({})
    const [inputFile, setInputFile] = useState("")
    const [avatar, setAvatar] = useState("")

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

    function handleSubmit(e) {
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        if (inputs.name == '') {
            errorsSubmit.name = 'Vui lòng nhập tên của bạn'
            flag = false
        }

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (inputs.email == '') {
            errorsSubmit.email = 'Vui lòng nhập email của bạn'
            flag = false
        } else if (!regex.test(inputs.email)) {
            errorsSubmit.email = 'Vui lòng nhập đúng định dạng email '
            flag = false
        }

        if (inputs.password == '') {
            errorsSubmit.pass = 'Vui lòng nhập mật khẩu của bạn'
            flag = false
        }

        if (inputs.phone == '') {
            errorsSubmit.phone = 'Vui lòng nhập số điện thoại của bạn'
            flag = false
        }

        if (inputs.address == '') {
            errorsSubmit.address = 'Vui lòng nhập địa chỉ của bạn'
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
                errorsSubmit.namefiles = 'File tải lên không hợp lệ'
                flag = false
            } else if (getSizeImage > 1024 * 1024) {
                errorsSubmit.size = "Chỉ cho phép tải tệp tin nhỏ hơn 1MB"
                flag = false
            }
        }

        if (flag) {
            setErrors("")

            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: avatar,
                level: 0
            }

            API.post("register", data)
                .then(res => {
                    console.log(res)
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        alert("Chúc mừng bạn đã đăng ký thành công")
                    }
                })
        } else {
            setErrors(errorsSubmit)
        }
    }

    return (
        <div className="signup-form">
            <h2>New User Signup!</h2>
            <form onSubmit={handleSubmit} action="#" encType="multipart/form-data">
                <input type="text" name="name" placeholder="Name" onChange={handleInput} />
                <input type="email" name="email" placeholder="Email Address" onChange={handleInput} />
                <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                <input type="text" name="phone" placeholder="Phone" onChange={handleInput} />
                <input type="text" name="address" placeholder="Address" onChange={handleInput} />
                <input type="file" name="avatar" placeholder="Avatar" onChange={handleFile} />
                <input type="number" name="level" placeholder="Level" value="0" checked onChange={handleInput} />
                <button type="submit" class="btn btn-default">Signup</button>
            </form>

            <FormError errors={errors} />
        </div>
    )
}

export default Register