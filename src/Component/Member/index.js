import Login from "./Login";
import Register from "./Register";

function Users() {
    return (
        <section id="form">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4 col-sm-offset-1">
                        {<Login />}
                    </div>
                    <div class="col-sm-1">
                        <h2 class="or">OR</h2>
                    </div>
                    <div class="col-sm-4">
                        {<Register />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Users