import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addNewUserThunk } from '../../thunks/addNewUser';
import { loginUserThunk } from '../../thunks/loginUser';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      loginEmail: '',
      loginPassword: '',
      signUpEmail: '',
      signUpName: '',
      signUpPassword: '',
      loggedIn: false
    }
  }

  handleLogin = async (e) => {
    const { loginUser } = this.props
    e.preventDefault()
    const user = {
      email: this.state.loginEmail.toLowerCase(),
      password: this.state.loginPassword
    }
    const result = await loginUser(user)
    if (result) {
      this.setState({ loggedIn: true })
    }
  }

  handleSignUp = async (e) => {
    const { addNewUser } = this.props
    e.preventDefault()
    const user = {
      name: this.state.signUpName,
      email: this.state.signUpEmail,
      password: this.state.signUpPassword
    }
    const result = await addNewUser(user)
    if (result) {
      this.setState({ loggedIn: true })
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { loginEmail, loginPassword, signUpName, signUpEmail, signUpPassword, loggedIn } = this.state

    if (loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <section className="login-section">
        <form onSubmit={this.handleLogin}>
          <h1>Log In</h1>
          <input
            name="loginEmail"
            value={loginEmail}
            onChange={this.handleInput}
            placeholder="email"
            type="email"
          />
          <input
            name="loginPassword"
            value={loginPassword}
            onChange={this.handleInput}
            placeholder="password"
            type="password"
          />
          <button>Login</button>
        </form>
        <form onSubmit={this.handleSignUp}>
          <h1>Sign Up</h1>
          <input
            name="signUpName"
            value={signUpName}
            onChange={this.handleInput}
            placeholder="name"
          />
          <input
            name="signUpEmail"
            value={signUpEmail}
            onChange={this.handleInput}
            placeholder="email"
            type="email"
          />
          <input
            name="signUpPassword"
            value={signUpPassword}
            onChange={this.handleInput}
            placeholder="password"
            type="password"
          />
          <button>Sign Up</button>
        </form>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUserThunk(user)),
  addNewUser: (user) => dispatch(addNewUserThunk(user))
})

export default connect(null, mapDispatchToProps)(Login)