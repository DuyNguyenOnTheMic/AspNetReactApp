import axios from 'axios'
import RequestHeader from 'src/pages/api-authorization/RequestHeader'
import { StudentsType } from 'src/types/studentTypes'

// ** API uri
const uri = 'api/students'

// ** Fetch Students
export const fetchData = async () => {
  const response = await axios.get(uri, await RequestHeader())

  return response.data
}

// ** Add Student
export const addStudent = async (data: StudentsType) => {
  await axios.post(uri, data, await RequestHeader())
}

// ** Update Student
export const updateStudent = async (studentId: string, data: StudentsType) => {
  await axios.put(`${uri}/${studentId}`, data, await RequestHeader())
}

// ** Delete Student
export const deleteStudent = async (studentId: string) => {
  await axios.delete(`${uri}/${studentId}`, await RequestHeader())
}
