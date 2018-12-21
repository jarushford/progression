import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewUser, loginUser } from '../../utils/apiCalls'
import { Redirect } from 'react-router-dom'
import { setUser } from '../../actions'

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
    const { setUser } = this.props
    e.preventDefault()
    const user = {
      email: this.state.loginEmail.toLowerCase(),
      password: this.state.loginPassword
    }
    try {
      const currentUser = await loginUser(user)
      setUser(currentUser)
      this.setState({ loggedIn: true })
    } catch(error) {
      console.log(error.message)
    }
  }

  handleSignUp = async (e) => {
    const { setUser } = this.props
    e.preventDefault()
    const user = {
      name: this.state.signUpName,
      email: this.state.signUpEmail,
      password: this.state.signUpPassword
    }
    try {
      await addNewUser(user)
      setUser(user)
      this.setState({ loggedIn: true })
    } catch(error) {
      console.log(error.message)
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
  setUser: (user) => dispatch(setUser(user))
})

export default connect(null, mapDispatchToProps)(Login)