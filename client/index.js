
import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import UserList from './components/UserList.jsx'

class App extends React.Component {

  state = { users: [] }

  componentDidMount = async () => {
    try {
      const { data } = await axios.get('/api/users')
      this.setState({ users: data })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return <UserList users={this.state.users} />
  }
}


render(<App />, document.getElementById('app'))