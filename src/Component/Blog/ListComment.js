function ListComments(props) {
    const repCmt = props.repCmt
    const comments = props.comment

    function replyCmt(e) {
        repCmt(e.target.id)
    }

    function renderComments() {
        return comments.map((value, index) => {
            if (value.id_comment == 0) {
                return (
                    <>
                        <ul class="media-list" key={index}>
                            <li class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                                </a>
                                <div class="media-body">
                                    <ul class="sinlge-post-meta">
                                        <li><i class="fa fa-user"></i>{value.name_user}</li>
                                        <li><i class="fa fa-clock-o"></i>{value.created_at}</li>
                                        <li><i class="fa fa-calendar"></i>{value.updated_at}</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <a id={value.id} onClick={replyCmt} class="btn btn-primary" href="#comment"><i class="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>

                            {comments.map((value2, index2) => {
                                if (value.id == value2.id_comment) {
                                    return (
                                        <li class="media second-media" key={index2} index={index2}>
                                            <a class="pull-left" href="#">
                                                <img class="media-object" src="images/blog/man-three.jpg" alt="" />
                                            </a>
                                            <div class="media-body">
                                                <ul class="sinlge-post-meta">
                                                    <li><i class="fa fa-user"></i>{value2.name_user}</li>
                                                    <li><i class="fa fa-clock-o"></i>{value2.created_at}</li>
                                                    <li><i class="fa fa-calendar"></i>{value2.updated_at}</li>
                                                </ul>
                                                <p>{value2.comment}</p>
                                                <a id={value.id} onClick={replyCmt} class="btn btn-primary" href="#comment"><i class="fa fa-reply"></i>Replay</a>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </>
                )
            }
        })
    }

    return (
        <div class="response-area">
            <h2>{comments.length} RESPONSES</h2>
            {renderComments()}
        </div>
    )
}

export default ListComments