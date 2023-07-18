import axios from 'axios'
import { Component } from 'react'
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
      <table className='table table-striped table-hover' aria-labelledby='tableLabel'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
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
      </table>
    )
  }

  render() {
    const contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
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
