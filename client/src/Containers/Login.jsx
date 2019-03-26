import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props)

        this.email = null
        this.password = null

    }

//Requisição de JWT -TODO: conferir se recebe o token
 onSubmit = async e => {
     e.preventDefault();
    
    const res = await fetch('/api/sessions', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            user: this.email.value,
            password: this.password.value
        }),
    });

    const resData = await res.json();
    
    this.props.updateTokenCB(resData.token);
    
    this.props.history.push('/');

}

render() {
    return (
        <section className="hero is-fullheight">
            <div className='hero-body' >
                <div className='container' >
                    <h1 className="title has-text-centered">Login</h1>
                    <p className="subtitle has-text-centered">Please login to continue.</p>
                    <div className="columns is-centered">
                        <div className="column is-3">
                            <div className="box">
                                <form onSubmit={this.onSubmit}>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-primary is-medium" type="text" name='email' ref={ref => this.email = ref}  placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-primary is-medium" type="password" name='password' ref={ref => this.password = ref} placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="field is-flex" style={{ justifyContent: 'center' }}>
                                        <label className="checkbox">
                                            <input type="checkbox" />
                                            Remember me
                                        </label>
                                    </div>
                                    <button type="submit" className="button is-fullwidth is-medium is-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <p className="is-flex" style={{ justifyContent: "center" }}>
                        <a className='is-login-help' href="/register">Register</a>
                        ·
                        <a className='is-login-help' href="/password-recovery">Forgot My Password</a>
                        ·
                        <a className='is-login-help' href="help">Need Help?</a>
                    </p>
                </div>
            </div>
        </section >
    )
}
}

export default Login;