import React, { Component } from 'react'
import { addNewUser, loginUser } from '../../utils/apiCalls'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      loginEmail: '',
      loginPassword: '',
      signUpEmail: '',
      signUpName: '',
      signUpPassword: ''
    }
  }

  handleLogin = async (e) => {
    e.preventDefault()
    const user = {
      email: this.state.loginEmail.toLowerCase(),
      password: this.state.loginPassword
    }
    try {
      const currentUser = await loginUser(user)

    } catch(error) {
      console.log(error.message)
    }
  }

  handleSignUp = async (e) => {
    e.preventDefault()
    const user = {
      name: this.state.signUpName,
      email: this.state.signUpEmail,
      password: this.state.signUpPassword
    }
    try {
      await addNewUser(user)

    } catch(error) {
      console.log(error.message)
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const { loginEmail, loginPassword, signUpName, signUpEmail, signUpPassword } = this.state
    return (
      <section className="login-section">
        <form onSubmit={this.handleLogin}>
          <input
            name="loginEmail"
            value={loginEmail}
            onChange={this.handleInput}
            placeholder="email"
          />
          <input
            name="loginPassword"
            value={loginPassword}
            onChange={this.handleInput}
            placeholder="password"
          />
          <button>Login</button>
        </form>
        <form onSubmit={this.handleSignUp}>
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
          />
          <input
            name="signUpPassword"
            value={signUpPassword}
            onChange={this.handleInput}
            placeholder="password"
          />
          <button>Sign Up</button>
        </form>
      </section>
    )
  }
}

export default Login