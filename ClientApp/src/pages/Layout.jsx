import PropTypes from 'prop-types'
import { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { NavMenu } from './components/NavMenu'

export class Layout extends Component {
  static displayName = Layout.name
  static get propTypes() {
    return {
      children: PropTypes.element
    }
  }

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag='main'>{this.props.children}</Container>
      </div>
    )
  }
}
