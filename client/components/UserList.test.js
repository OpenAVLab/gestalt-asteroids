import React from 'react'
import { expect, enzyme, shallow } from '../lib/test-setup'
import UserList from './UserList.jsx'
import User from './User.jsx'

const fakeUsers = [
  { id: 1, firstName: "First",  lastName: "User", email: "first.user@example.com"