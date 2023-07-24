import axios from 'axios'
import { Component } from 'react'
import Table from 'react-bootstrap/Table'
import authService from './api-authorization/AuthorizeService'

export class WeatherForecast extends Component {
  static displayName = WeatherForecast.name

  constructor(props) {
    super(props)
    this.state = { forecasts: [], loading: true }
  }

  componentDidMount() {
    this.populateWeatherData()
  }

  static renderForecastsTable(forecasts) {
    return (
      <Table striped hover aria-labelledby='tableLabel'>
        <thead>
          <tr>
            <th className='no-sort'>Date</th>
            <th className='no-sort'>Temp. (C)</th>
            <th className='no-sort'>Temp. (F)</th>
            <th className='no-sort'>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    const contents = this.state.loading ? (
      <div className='d-flex text-primary justify-content-center align-items-center'>
        <div className='spinner-border me-2' role='status' aria-hidden='true'></div>
        <strong>Loading...</strong>
      </div>
    ) : (
      WeatherForecast.renderForecastsTable(this.state.forecasts)
    )

    return (
      <div>
        <h1 id='tableLabel'>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    )
  }

  async populateWeatherData() {
    const token = await authService.getAccessToken()
    const response = await axios.get('weatherforecast', {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    })
    const data = await response.data
    this.setState({ forecasts: data, loading: false })
  }
}
