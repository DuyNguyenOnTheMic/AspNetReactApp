import { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
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
        <Navbar
          collapseOnSelect
          expand='lg'
          className='navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3'
        >
          <Container>
            <Navbar.Brand href='/'>AspNetReactApp</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
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
                <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
                  <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <LoginMenu />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>{' '}
      </header>
    )
  }
}
