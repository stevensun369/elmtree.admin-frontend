import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GRADES_REQUEST,
  GRADES_SUCCESS,
  GRADES_FAIL,
  GRADES_STUDENTS_REQUEST,
  GRADES_STUDENTS_SUCCESS,
  GRADES_STUDENTS_FAIL,
} from '../constants/adminConstants'

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true }
    case LOGIN_SUCCESS:
      const adminInfoDestructure = {
        adminID: action.payload.adminID,
        schoolID: action.payload.schoolID,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      }
      return {
        loading: false,
        adminInfo: adminInfoDestructure,
        adminToken: action.payload.token,
      }
    case LOGIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminGradesReducer = (
  state = { loading: true, grades: {} },
  action
) => {
  switch (action.type) {
    case GRADES_REQUEST:
      return { loading: true, grades: {} }
    case GRADES_SUCCESS:
      return {
        loading: false,
        grades: action.payload,
      }
    case GRADES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminGradesStudentsReducer = (
  state = { loading: true, students: [] },
  action
) => {
  switch (action.type) {
    case GRADES_STUDENTS_REQUEST:
      return { loading: true }
    case GRADES_STUDENTS_SUCCESS:
      return {
        loading: false,
        students: action.payload,
      }
    case GRADES_STUDENTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
