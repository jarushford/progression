import React from 'react'
import { shallow } from 'enzyme'
import { mapStateToProps, App } from '../App'

describe('App', () => {
  let mockProjects

  beforeEach(() => {
    mockProjects = [
      {
        name: 'Top Notch',
        grade: 'V13',
        id: 2
      }
    ]
  })
  
  it('should match the snapshot in default case', () => {
    const wrapper = shallow(<App error='Oh no!' projects={mockProjects} disciplineBoulder={false} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with an error', () => {
    const wrapper = shallow(<App error='Oh no!' projects={mockProjects} disciplineBoulder={false} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with data', () => {
    const wrapper = shallow(<App error='Oh no!' projects={mockProjects} disciplineBoulder={false} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with discipline as sport', () => {
    const wrapper = shallow(<App error='Oh no!' projects={mockProjects} disciplineBoulder={false} />)

    expect(wrapper).toMatchSnapshot()
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

