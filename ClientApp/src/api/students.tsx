import axios from 'axios'
import authService from 'src/components/api-authorization/AuthorizeService'

// ** API uri
const uri = 'api/students'

const getAccessToken = async () => await authService.getAccessToken()

// ** Fetch Students
export const fetchData = async () => {
  const token = await getAccessToken()
  console.log(token)
  const response = await axios.get(uri, {
    headers: !token ? {} : { Authorization: `Bearer ${token}` }
  })

  return response.data
}
