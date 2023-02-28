import { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import API from '../../API/API'

function Rate(props) {
    let params = useParams()
    const id_blog = props.id
    const navigation = useNavigate()
    const [rating, setRating] = useState(0)
    const [starAvg, setStarAvg] = useState('')

    useEffect(() => {
        API.get("blog/rate/" + params.id)
            .then(res => {
                setRating(res.data.data.reduce((total, currentValue) => {
                    return (total + currentValue.rate / res.data.data.length)
                }, 0))
                setStarAvg(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])

    function changeRating(newRating, name) {
        setRating(newRating)

        const loginSuccess = localStorage.getItem('loginSuccess');
        if (!JSON.parse(loginSuccess)) {
            alert('Vui lòng đăng nhập')
            navigation('/login')
        } else {
            if (newRating !== 0) {
                const user = JSON.parse(localStorage.getItem('user'))
                let url = 'blog/rate/' + id_blog
                let token = JSON.parse(localStorage.getItem('token'))

                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };
                const formData = new FormData()
                formData.append('blog_id', id_blog)
                formData.append('user_id', user.id)
                formData.append('rate', newRating)
                API.post(url, formData, config)
                    .then(res => {
                        console.log(res);
                    })
            }
        }
    }

    return (
        <div class="rating-area">
            <ul class="ratings">
                <li class="rate-this">Rate this item:</li>
                <StarRatings
                    rating={rating}
                    starRatedColor="#FE980F"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                />
                <li class="color">({starAvg.length} votes)</li>
            </ul>
            <ul class="tag">
                <li>TAG:</li>
                <li><a class="color" href="">Pink <span>/</span></a></li>
                <li><a class="color" href="">T-Shirt <span>/</span></a></li>
                <li><a class="color" href="">Girls</a></li>
            </ul>
        </div>
    );
}

export default Rate