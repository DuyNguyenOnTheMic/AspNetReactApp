import axios from 'axios'
import { FormEvent, Fragment, Reducer, useEffect, useReducer, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addStudent, deleteStudent, fetchData, updateStudent } from 'src/api/students'
import { StudentsType } from 'src/types/studentTypes'
import ModalStudent from './components/students/ModalStudent'
import TableStudent from './components/students/TableStudent'

interface IAction {
  type: string
  value?: string
  student?: StudentsType
}

const initialState: StudentsType = {
  id: '',
  name: '',
  age: Number(''),
  course: '',
  note: ''
}

function reducer(state: StudentsType, action: IAction) {
  switch (action.type) {
    case 'load_form':
      return action.student
    case 'reset':
      return initialState
    default: {
      const result: any = { ...state }
      result[action.type] = action.value

      return result
    }
  }
}

const StudentManagement = () => {
  // Loading useStates
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [studentId, setStudentId] = useState('')
  const [submitAction, setSubmitAction] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Bootstrap modal hooks
  const [state, dispatch] = useReducer<Reducer<StudentsType, IAction>, StudentsType>(
    reducer,
    initialState,
    () => initialState
  )
  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // Actions
  const handleClose = () => {
    setShow(false)
    setShowDelete(false)
    setStudentId('')
    setSubmitAction('')
    setErrorMessage('')
  }
  const handleShow = (modalType: string, student?: StudentsType) => {
    switch (modalType) {
      case 'create':
        dispatch({ type: 'reset' })
        setShow(true)
        break
      case 'edit':
        setStudentId(student!.id)
        dispatch({ type: 'load_form', student })
        setShow(true)
        break
      case 'delete':
        setStudentId(student!.id)
        setShowDelete(true)
        break
      default:
        throw Error('Unknown modal type: ' + modalType)
    }
    setSubmitAction(modalType)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    dispatch({ type: id, value })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const student = state
    try {
      switch (submitAction) {
        case 'create':
          await addStudent(student)
          break
        case 'edit':
          await updateStudent(studentId, student)
          break
        case 'delete':
          await deleteStudent(studentId)
          break
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch (error.response.status) {
            case 400:
              {
                const validationErrors = error.response.data.errors
                if (validationErrors) {
                  const errorSummary = []
                  for (const key in validationErrors) {
                    errorSummary.push(validationErrors[key])
                  }
                  setErrorMessage(errorSummary.join('\n'))
                } else {
                  setErrorMessage(error.response.data.title)
                }
              }
              break
            case 404:
              setErrorMessage(error.response.data.title)
              break
            case 409:
              setErrorMessage('A student with this ID already exists!')
              break
            default:
              break
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setErrorMessage(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(error.message)
        }
      } else {
        console.error(error)
      }

      return false
    }
    toast.success(`${submitAction[0].toUpperCase()}${submitAction.slice(1)} successfully`)
    dispatch({ type: 'reset' })
    populateStudentData()
    handleClose()
  }

  useEffect(() => {
    populateStudentData()
  }, [])

  // Populate student data
  async function populateStudentData() {
    const data = await fetchData()
    setData(data)
    setLoading(false)
  }

  const contents = loading ? (
    <div className='d-flex text-primary justify-content-center align-items-center'>
      <div className='spinner-border me-2' role='status' aria-hidden='true'></div>
      <strong>Loading...</strong>
    </div>
  ) : (
    <Fragment>
      <TableStudent handleShow={handleShow} data={data} />
      <ModalStudent
        show={show}
        showDelete={showDelete}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        studentId={studentId}
        state={state}
      />
      <ToastContainer theme='colored' />
    </Fragment>
  )

  return (
    <div>
      <h1 id='tableLabel'>Student management</h1>
      {contents}
    </div>
  )
}

export default StudentManagement
