import React from 'react'
import { expect, enzyme, shallow } from '../lib/test-setup'
import UserList from './UserList.jsx'
import User from './User.jsx'

const fakeUsers = [
  { id: 1, firstName: "First",  lastName: "User", email: "first.user@example.com"},
  { id: 2, firstName: "Second", lastName: "User", email: "second.user@example.com"},
  { id: 3, firstName: "Third",  lastName: "User", email: "third.user@example.com"},
]

describe('UserList Component', () => {
  it('should render a User component for each user passed in', () => {
    const userList = shallow(<UserList users={fakeUsers} />)
    expect(userList.find(User).length).to.equal(fakeUsers.length)
  })
})
