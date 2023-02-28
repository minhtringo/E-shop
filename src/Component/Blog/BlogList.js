import API from '../../API/API'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function BlogList() {

    const [data, setData] = useState([])
    useEffect(() => {
        API.get("blog")
            .then(res => {
                setData(res.data.blog)
            })
            .catch(error => console.log(error))
    }, [])

    function renderBlogList() {
        if (Object.keys(data).length > 0) {
            return data.data.map((value, key) => {
                return (
                    <div class="single-blog-post" key={key}>
                        <h3>{value.title}</h3>
                        <div class="post-meta">
                            <ul>
                                <li><i class="fa fa-user"></i> Mac Doe</li>
                                <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <span>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-half-o"></i>
                            </span>
                        </div>
                        <a href="">
                            <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + value.image} alt="hình ảnh" />
                        </a>
                        <p>{value.description}</p>
                        <Link class="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
                    </div>
                )
            })
        }
    }

    return (
        <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Latest From our Blog</h2>
                {renderBlogList()}
            </div>
        </div>
    )
}

export default BlogList