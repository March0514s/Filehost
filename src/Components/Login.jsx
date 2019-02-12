import React from "react";

function Login() {
    return (
        <div>
            <section class="hero is-fullheight columns" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div class="column is-4 is-offset-4">
                    <h1 class="title has-text-centered">Login</h1>
                    <p class="subtitle has-text-centered">Please login to proceed.</p>

                    <div class="columns">
                        <div class="column" style={{ display: "flex", justifyContent: "center" }}>
                            <div class="box">
                                <form>
                                    <div class="field">
                                        <div class="control">
                                            <input class="input is-primary is-medium" type="text" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <input class="input is-primary is-medium" type="password" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div class="field" style={{ display: "flex", justifyContent: "center" }}>
                                        <label class="checkbox ">
                                            <input type="checkbox" />
                                            Remember me
                                        </label>
                                    </div>
                                    <button class="button is-fullwidth is-primary is-medium">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <p class="primary-text" style={{ display: "flex", justifyContent: "center"}}>
                        <a style={{marginLeft: "5px", marginRight: "5px", color:"black"}}href="#">Sign Up</a>
                        ·
                        <a style={{marginLeft: "5px", marginRight: "5px", color:"black"}}href="#">Forgot Password</a>
                        ·
                        <a style={{marginLeft: "5px", marginRight: "5px", color:"black"}} href="#">Need Help?</a>
                    </p>
                </div>
            </section >
        </div >
    )
}

export default Login;