import { Counter } from './components/Counter'
import { Home } from './components/Home'
import StudentManagement from './components/StudentManagement'
import { WeatherForecast } from './components/WeatherForecast'
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes'

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
  {
    path: '/student-management',
    requireAuth: true,
    element: <StudentManagement />
  },
  ...ApiAuthorizationRoutes
]

export default AppRoutes
