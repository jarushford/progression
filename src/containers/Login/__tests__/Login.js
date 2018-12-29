import React from 'react'
import { shallow } from 'enzyme'
import { addNewUserThunk } from '../../../thunks/addNewUser'
import { loginUserThunk } from '../../../thunks/loginUser'
import { mapDispatchToProps, Login } from '../Login'

jest.mock('../../../thunks/addNewUser')
jest.mock('../../../thunks/loginUser')

describe('Login', () => {
  let mockLogin
  let mockSignup

  beforeEach(() => {
    mockLogin = jest.fn().mockImplementation(() => true)
    mockSignup = jest.fn().mockImplementation(() => true)
  })

  describe('Login Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Login />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected =  {
        loginEmail: '',
        loginPassword: '',
        signUpEmail: '',
        signUpName: '',
        signUpPassword: '',
        loggedIn: false
      }
      const wrapper = shallow(<Login />)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should login an existing user', async () => {
      const wrapper = shallow(<Login loginUser={mockLogin} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({
        loginEmail: 'thegrey@gmail.com',
        loginPassword: 'Shadowfax'
      })

      await wrapper.find('form').first().simulate('submit', e)

      expect(wrapper.state().loggedIn).toEqual(true)
    })

    it('should sign up a new user', async () => {
      const wrapper = shallow(<Login addNewUser={mockSignup} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({
        signUpName: 'Gandalf',
        signUpEmail: 'thegrey@gmail.com',
        signUpPassword: 'Shadowfax'
      })

      await wrapper.find('form').last().simulate('submit', e)

      expect(wrapper.state().loggedIn).toEqual(true)
    })

    it('should not reset state if login info is incorrect', async () => {
      mockLogin.mockImplementation(() => false)
      const wrapper = shallow(<Login loginUser={mockLogin} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({
        loginEmail: 'thegrey@gmail.com',
        loginPassword: 'Shadowfax'
      })

      await wrapper.find('form').first().simulate('submit', e)

      expect(wrapper.state().loggedIn).toEqual(false)
    })

    it('should not reset state if sign up user exists already', async () => {
      mockSignup.mockImplementation(() => false)
      const wrapper = shallow(<Login addNewUser={mockSignup} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({
        signUpName: 'Gandalf',
        signUpEmail: 'thegrey@gmail.com',
        signUpPassword: 'Shadowfax'
      })

      await wrapper.find('form').last().simulate('submit', e)

      expect(wrapper.state().loggedIn).toEqual(false)
    })

    it('should update state on change of the inputs', async () => {
      const wrapper = shallow(<Login />)
      const e = { target: { name: 'loginEmail', value: 'G' } }

      await wrapper.find('input').first().simulate('change', e)

      expect(wrapper.state().loginEmail).toEqual('G')
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method loginUser', () => {
      const mockDispatch = jest.fn()
      const expected = loginUserThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.loginUser()

      expect(mockDispatch).toBeCalledWith(expected)
    })

    it('should return a props object with a method addNewUser', () => {
      const mockDispatch = jest.fn()
      const expected = addNewUserThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addNewUser()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})