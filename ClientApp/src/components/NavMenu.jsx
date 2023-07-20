import { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import DarkModeDropdown from './DarkModeDropdown'
import './NavMenu.css'
import { LoginMenu } from './api-authorization/LoginMenu'

export class NavMenu extends Component {
  static displayName = NavMenu.name

  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand='lg' className='navbar-toggleable-sm ng-white border-bottom box-shadow mb-3'>
          <Container>
            <Navbar.Brand href='/'>AspNetReactApp</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse className='mt-2' id='responsive-navbar-nav'>
              <Nav defaultActiveKey='/' className='me-auto'>
                <Nav.Link as={NavLink} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to='/counter'>
                  Counter
                </Nav.Link>
                <Nav.Link as={NavLink} to='/weather-forecast'>
                  Weather Forecast
                </Nav.Link>
                <Nav.Link as={NavLink} to='/student-management'>
                  Student Management
                </Nav.Link>
                <Nav.Link as={NavLink} to='/swagger' target='_blank' rel='noreferrer'>
                  Swagger
                </Nav.Link>
                <DarkModeDropdown />
              </Nav>
              <Nav>
                <LoginMenu />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }
}
