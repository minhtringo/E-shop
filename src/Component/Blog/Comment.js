import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import API from '../../API/API'

function Comment(props) {
    const id_blog = props.id
    const getCmt = props.getCmt
    const repCmt = props.repCmt
    let idComment = props.idComment

    const [comment, setComment] = useState('')
    const navigation = useNavigate()

    function checkComment(e) {
        e.preventDefault()
        const loginSuccess = localStorage.getItem('loginSuccess');

        if (!JSON.parse(loginSuccess)) {
            alert('Vui lòng đăng nhập')
            navigation('/login')
        } else {
            if (comment) {
                const user = JSON.parse(localStorage.getItem('user'))
                let url = 'blog/comment/' + id_blog
                let token = JSON.parse(localStorage.getItem('token'))
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };

                const formData = new FormData()
                formData.append('id_blog', id_blog)
                formData.append('id_user', user.id)
                formData.append('id_comment', idComment ? idComment : 0)
                formData.append('comment', comment)
                formData.append('image_user', user.avatar)
                formData.append('name_user', user.name)

                API.post(url, formData, config)
                    .then(res => {
                        getCmt(res.data.data)
                    })

                e.target.previousElementSibling.value = ''
                repCmt(0)
            } else {
                alert("Vui lòng nhập bình luận")
            }
        }
    }

    function valueComment(e) {
        setComment(e.target.value)
    }

    return (
        <div class="replay-box">
            <div class="row">
                <div class="col-sm-12">
                    <h2>Leave a replay</h2>

                    <div class="text-area">
                        <div class="blank-arrow">
                            <label htmlFor='comment' >Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea onChange={valueComment} id="comment" name="message" rows="11"></textarea>
                        <a onClick={checkComment} class="btn btn-primary" href="">Post comment</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment