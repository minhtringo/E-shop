import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import FormError from "../../Error/FormError";
import API from '../../API/API'

function Login() {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [nameInput]: value }))
    }

    function handleSubmitForm(e) {
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regex.test(inputs.email)) {
            errorsSubmit.email = 'vui lòng nhập đúng định dạng email '
            flag = false
        }
        if (inputs.password == '') {
            errorsSubmit.pass = 'vui lòng nhập mật khẩu của bạn'
            flag = false
        }

        if (flag) {
            setErrors("")

            const data = {
                email: inputs.email,
                password: inputs.password,
                level: 0
            }

            API.post("login", data)
                .then(res => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        alert("Login thành công")
                        navigate("/")
                        console.log(res)
                        const token = res.data.success.token
                        const user = res.data.Auth
                        const loginSuccess = true
                        localStorage.setItem("loginSuccess", JSON.stringify(loginSuccess))
                        localStorage.setItem("token", JSON.stringify(token))
                        localStorage.setItem("user", JSON.stringify(user))
                    }
                })
        } else {
            setErrors(errorsSubmit)
        }
    }

    return (
        <div class="login-form">
            <h2>Login to your account</h2>
            <form action="#" onSubmit={handleSubmitForm}>
                <input type="email" name='email' placeholder="Email Address" onChange={handleInput} />
                <input type="password" name='password' placeholder="Password" onChange={handleInput} />
                <span>
                    <input type="checkbox" class="checkbox" />
                    Keep me signed in
                </span>
                <button type="submit" class="btn btn-default">Login</button>
                <FormError errors={errors} />
            </form>
        </div>
    )
}

export default Login