import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import {
  adminGradesReducer,
  adminLoginReducer,
  adminGradesStudentsReducer,
  adminStudentReducer,
  adminStudentSubjectDeleteReducer,
  adminStudentSubjectAddReducer,
  adminTeacherReducer,
  adminTeacherSubjectDeleteReducer,
  adminTeacherSubjectAddReducer,
} from './reducers/adminReducers'

const reducer = combineReducers({
  adminLogin: adminLoginReducer,

  // student
  adminGrades: adminGradesReducer,
  adminGradesStudents: adminGradesStudentsReducer,
  adminStudent: adminStudentReducer,
  adminStudentSubjectDelete: adminStudentSubjectDeleteReducer,
  adminStudentSubjectAdd: adminStudentSubjectAddReducer,

  // teacher
  adminTeacher: adminTeacherReducer,
  adminTeacherSubjectDelete: adminTeacherSubjectDeleteReducer,
  adminTeacherSubjectAdd: adminTeacherSubjectAddReducer,
})

const userTypeFromStorage = localStorage.getItem('userType')
const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

var adminLoggedIn
var adminLoggedInInfo
var adminLoggedInToken

if (userTypeFromStorage === 'admin') {
  adminLoggedIn = userFromStorage
  adminLoggedInInfo = {
    adminID: adminLoggedIn.adminID,
    schoolID: adminLoggedIn.schoolID,
    firstName: adminLoggedIn.firstName,
    lastName: adminLoggedIn.lastName,
    email: adminLoggedIn.email,
  }
  adminLoggedInToken = adminLoggedIn.token
}

const initialState = {
  adminLogin: {
    adminInfo: adminLoggedInInfo,
    token: adminLoggedInToken,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
