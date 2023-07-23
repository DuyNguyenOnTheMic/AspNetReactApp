import { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import './custom.css'
import { Layout } from './pages/Layout'
import AuthorizeRoute from './pages/api-authorization/AuthorizeRoute'

export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route

            return (
              <Route
                key={index}
                {...rest}
                element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element}
              />
            )
          })}
        </Routes>
      </Layout>
    )
  }
}
