import { Component } from 'react'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'
import { Link, NavLink } from 'react-router-dom'
import { LoginMenu } from './api-authorization/LoginMenu'
import './NavMenu.css'

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
          className='navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3'
          container
          light
        >
          <NavbarBrand tag={Link} to='/'>
            AspNetReactApp
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className='mr-2' />
          <Collapse className='d-sm-inline-flex flex-sm-row-reverse' isOpen={!this.state.collapsed} navbar>
            <ul className='navbar-nav flex-grow'>
              <NavItem>
                <NavLink className='nav-link text-dark' to='/' end>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link text-dark' to='/counter'>
                  Counter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link text-dark' to='/weather-forecast'>
                  Weather Forecast
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link text-dark' to='/student-management'>
                  Student Management
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link text-dark' to='/swagger' target='_blank' rel='noreferrer'>
                  Swagger
                </NavLink>
              </NavItem>
              <LoginMenu />
            </ul>
          </Collapse>
        </Navbar>
      </header>
    )
  }
}
