import { useEffect, useState } from 'react'
import React from "react"
import { useParams } from "react-router-dom"
import API from '../../API/API'
import ListComments from './ListComment'
import Comment from './Comment'
import Rate from './Rate'

function BlogDetail() {
    let param = useParams()
    const [data, setData] = useState('')
    const [comment, setComment] = useState([])
    const [idComment, setIdComment] = useState('')

    useEffect(() => {
        API.get("blog/detail/" + param.id)
            .then(res => {
                console.log(res);
                setData(res.data.data)
                setComment(res.data.data.comment)
            })
            .catch(error => console.log(error))
    }, [])

    function getComment(data) {
        setComment(comment.concat(data))
    }
    function repCmt(data) {
        setIdComment(data)
    }

    function renderBlogDetail() {
        if (Object.keys(data).length > 0) {
            return (
                <div class="single-blog-post">
                    <h3>{data.title}</h3>
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
                        <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + data.image} alt="" />
                    </a>
                    <h1>{data.description}</h1>
                    {data.content}
                    <div class="pager-area">
                        <ul class="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderBlogDetail()}
            </div>
            <Rate id={param.id} />
            <ListComments comment={comment} repCmt={repCmt} />
            <Comment id={param.id} getCmt={getComment} idComment={idComment} repCmt={repCmt} />
        </div>
    )
}

export default BlogDetail