import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes'
import { Counter } from './components/Counter'
import { WeatherForecast } from './components/WeatherForecast'
import { Home } from './components/Home'

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/weather-forecast',
    requireAuth: true,
    element: <WeatherForecast />
  },
  ...ApiAuthorzationRoutes
]

export default AppRoutes
