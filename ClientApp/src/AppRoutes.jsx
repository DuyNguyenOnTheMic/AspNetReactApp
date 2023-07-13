import { Counter } from './components/Counter'
import { Home } from './components/Home'
import { WeatherForecast } from './components/WeatherForecast'
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes'

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
