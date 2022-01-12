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
  STUDENT_REQUEST,
  STUDENT_SUCCESS,
  STUDENT_FAIL,
  STUDENT_SUBJECT_DELETE_REQUEST,
  STUDENT_SUBJECT_DELETE_SUCCESS,
  STUDENT_SUBJECT_DELETE_FAIL,
  STUDENT_SUBJECT_DELETE_DELETE,
  STUDENT_SUBJECT_ADD_REQUEST,
  STUDENT_SUBJECT_ADD_SUCCESS,
  STUDENT_SUBJECT_ADD_FAIL,
  STUDENT_SUBJECT_ADD_DELETE,
  TEACHER_REQUEST,
  TEACHER_SUCCESS,
  TEACHER_FAIL,
  TEACHER_DELETE,
  TEACHER_SUBJECT_DELETE_REQUEST,
  TEACHER_SUBJECT_DELETE_SUCCESS,
  TEACHER_SUBJECT_DELETE_FAIL,
  TEACHER_SUBJECT_DELETE_DELETE,
  TEACHER_SUBJECT_ADD_REQUEST,
  TEACHER_SUBJECT_ADD_SUCCESS,
  TEACHER_SUBJECT_ADD_FAIL,
  TEACHER_SUBJECT_ADD_DELETE,
  TIMETABLE_REQUEST,
  TIMETABLE_SUCCESS,
  TIMETABLE_FAIL,
  TIMETABLE_MODIFY_REQUEST,
  TIMETABLE_MODIFY_SUCCESS,
  TIMETABLE_MODIFY_FAIL,
  TIMETABLE_UNASSIGN_REQUEST,
  TIMETABLE_UNASSIGN_SUCCESS,
  TIMETABLE_UNASSIGN_FAIL,
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
        token: action.payload.token,
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
      return { loading: true, students: [] }
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

export const adminStudentReducer = (
  state = { loading: false, student: {} },
  action
) => {
  switch (action.type) {
    case STUDENT_REQUEST:
      return { loading: true, student: {} }
    case STUDENT_SUCCESS:
      return {
        loading: false,
        student: action.payload,
      }
    case STUDENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminStudentSubjectDeleteReducer = (
  state = { loading: false, subjects: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_SUBJECT_DELETE_REQUEST:
      return { loading: true, subjects: [] }
    case STUDENT_SUBJECT_DELETE_SUCCESS:
      return {
        loading: false,
        subjects: action.payload,
      }
    case STUDENT_SUBJECT_DELETE_FAIL:
      return { loading: false, error: action.payload, subjects: [] }

    case STUDENT_SUBJECT_DELETE_DELETE:
      return { loading: false, subjects: [] }
    default:
      return state
  }
}

export const adminStudentSubjectAddReducer = (
  state = { loading: false, subjects: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_SUBJECT_ADD_REQUEST:
      return { loading: true, subjects: [] }
    case STUDENT_SUBJECT_ADD_SUCCESS:
      return {
        loading: false,
        subjects: action.payload,
      }
    case STUDENT_SUBJECT_ADD_FAIL:
      return { loading: false, error: action.payload, subjects: [] }

    case STUDENT_SUBJECT_ADD_DELETE:
      return { loading: false, subjects: [] }
    default:
      return state
  }
}

export const adminTeacherReducer = (
  state = { loading: false, teacher: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_REQUEST:
      return { loading: true, teacher: {} }
    case TEACHER_SUCCESS:
      return {
        loading: false,
        teacher: action.payload,
      }
    case TEACHER_FAIL:
      return { loading: false, error: action.payload, teacher: {} }
    case TEACHER_DELETE:
      return { loading: false, teacher: {} }
    default:
      return state
  }
}

export const adminTeacherSubjectDeleteReducer = (
  state = { loading: false, subjects: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_SUBJECT_DELETE_REQUEST:
      return { loading: true, subjects: [] }
    case TEACHER_SUBJECT_DELETE_SUCCESS:
      return {
        loading: false,
        subjects: action.payload,
      }
    case TEACHER_SUBJECT_DELETE_FAIL:
      return { loading: false, error: action.payload, subjects: [] }

    case TEACHER_SUBJECT_DELETE_DELETE:
      return { loading: false, subjects: [] }
    default:
      return state
  }
}

export const adminTeacherSubjectAddReducer = (
  state = { loading: false, subjects: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_SUBJECT_ADD_REQUEST:
      return { loading: true, subjects: [] }
    case TEACHER_SUBJECT_ADD_SUCCESS:
      return {
        loading: false,
        subjects: action.payload,
      }
    case TEACHER_SUBJECT_ADD_FAIL:
      return { loading: false, error: action.payload, subjects: [] }

    case TEACHER_SUBJECT_ADD_DELETE:
      return { loading: false, subjects: [] }
    default:
      return state
  }
}

export const adminTimetableReducer = (
  state = { loading: false, periods: {} },
  action
) => {
  switch (action.type) {
    case TIMETABLE_REQUEST:
      return { loading: true, periods: {} }
    case TIMETABLE_SUCCESS:
      return {
        loading: false,
        periods: action.payload,
      }
    case TIMETABLE_FAIL:
      return { loading: false, error: action.payload, periods: {} }

    case TIMETABLE_MODIFY_REQUEST:
      return { loading: true, ...state }
    case TIMETABLE_MODIFY_SUCCESS:
      return { loading: false, periods: action.payload }
    case TIMETABLE_MODIFY_FAIL:
      return { loading: false, error: action.payload, ...state }

    case TIMETABLE_UNASSIGN_REQUEST:
      return { loading: true, ...state }
    case TIMETABLE_UNASSIGN_SUCCESS:
      return { loading: false, periods: action.payload }
    case TIMETABLE_UNASSIGN_FAIL:
      return { loading: false, ...state }
    default:
      return state
  }
}
