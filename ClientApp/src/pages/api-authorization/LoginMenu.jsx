import { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { ApplicationPaths } from './ApiAuthorizationConstants'
import authService from './AuthorizeService'

export class LoginMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      userName: null
    }
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState())
    this.populateState()
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription)
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name
    })
  }

  render() {
    const { isAuthenticated, userName } = this.state
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`
      const loginPath = `${ApplicationPaths.Login}`

      return this.anonymousView(registerPath, loginPath)
    } else {
      const profilePath = `${ApplicationPaths.Profile}`
      const logoutPath = `${ApplicationPaths.LogOut}`
      const logoutState = { local: true }

      return this.authenticatedView(userName, profilePath, logoutPath, logoutState)
    }
  }

  authenticatedView(userName, profilePath, logoutPath, logoutState) {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} tag={Link} to={profilePath}>
            Hello {userName}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} tag={Link} replace to={logoutPath} state={logoutState}>
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }

  anonymousView(registerPath, loginPath) {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to={registerPath}>
            Register
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={loginPath}>
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }
}
