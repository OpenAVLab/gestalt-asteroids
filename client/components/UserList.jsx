
import React from 'react'
import User from './User.jsx'

export default ({ users }) => (
  <div className="user-list">

    <p className='lead'>Here's a list of {users.length} completely fictitious people:</p>

    <table className="table">
      <tbody>
        { users.map(u => <User {...u} key={u.id} />) }
      </tbody>
    </table>
  </div>
)