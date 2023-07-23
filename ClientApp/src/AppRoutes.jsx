import { Counter } from './pages/Counter'
import { Home } from './pages/Home'
import StudentManagement from './pages/StudentManagement'
import { WeatherForecast } from './pages/WeatherForecast'
import ApiAuthorizationRoutes from './pages/api-authorization/ApiAuthorizationRoutes'

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
