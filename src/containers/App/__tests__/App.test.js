import React from 'react'
import { shallow, mount } from 'enzyme'
import { mapStateToProps, App } from '../App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MemoryRouter } from 'react-router-dom'
import ProjectPage from '../../ProjectPage/ProjectPage'
import Header from '../../Header/Header'
import Home from '../../Home/Home'

describe('App', () => {
  let mockProjects

  beforeEach(() => {
    mockProjects = [
      {
        name: 'Top Notch',
        grade: 13,
        id: 2
      }
    ]
  })
  
  it('should match the snapshot in default case', () => {
    const wrapper = shallow(<App error='' projects={mockProjects} disciplineBoulder={true} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with an error for boulder', () => {
    const wrapper = shallow(<App error='Oh no!' projects={mockProjects} disciplineBoulder={true} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with an error for sport', () => {
    const wrapper = shallow(<App error='Oh no!' projects={mockProjects} disciplineBoulder={false} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with no data', () => {
    const wrapper = shallow(<App error='' projects={[]} disciplineBoulder={false} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with discipline as sport', () => {
    const wrapper = shallow(<App error='' projects={mockProjects} disciplineBoulder={false} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct components if on a project route', () => {
    const wrapper = mount(
      <Provider store={createStore(() => ({
        currentUser: { name: '', email: '', password: '' },
        projects: mockProjects,
        currentProject: 2,
        journal: [],
        milestones: [],
        disciplineBoulder: true
      }))}>
        <MemoryRouter initialEntries={['/projects/:id']}>
          <App 
            error=''
            projects={mockProjects}
            disciplineBoulder={true}
          />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(ProjectPage)).toHaveLength(1)
  })

  it('should render correct components if on root route', () => {
    const wrapper = mount(
      <Provider store={createStore(() => ({
        currentUser: { name: '', email: '', password: '' },
        projects: mockProjects,
        currentProject: 2,
        journal: [],
        milestones: [],
        disciplineBoulder: true
      }))}>
        <MemoryRouter initialEntries={['/']}>
          <App 
            error=''
            projects={mockProjects}
            disciplineBoulder={true}
          />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(Header)).toHaveLength(1)
    expect(wrapper.find(Home)).toHaveLength(1)
  })
})

describe('mapStateToProps', () => {
  it('should return an object with the correct props', () => {
    const mockProjects = [
      {
        name: 'Top Notch',
        grade: 'V13'
      }
    ]
    const mockState = {
      projects: mockProjects,
      disciplineBoulder: true,
      error: ''
    }

    const mappedProps = mapStateToProps(mockState)

    expect(mappedProps).toEqual(mockState)
  })
})

