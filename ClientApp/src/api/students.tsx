import axios from 'axios'
import RequestHeader from 'src/components/api-authorization/RequestHeader'

// ** API uri
const uri = 'api/students'

// ** Fetch Students
export const fetchData = async () => {
  const response = await axios.get(uri, await RequestHeader())

  return response.data
}
