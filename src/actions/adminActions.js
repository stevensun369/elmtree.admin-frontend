import axios from 'axios'
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
} from '../constants/adminConstants'
import { apiURL } from '../utils/env'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${apiURL}/api/admin/login`,
      { email, password },
      config
    )

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
    localStorage.setItem('userType', 'admin')
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getGrades = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRADES_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().adminLogin.token}`,
      },
    }

    const { data } = await axios.get(
      `${apiURL}/api/admin/grades`,
      config
    )

    var grades = {}
    for (var grade in data) {
      var gradeID = data[grade].gradeID
      grades[gradeID] = data[grade]
    }

    dispatch({
      type: GRADES_SUCCESS,
      payload: grades,
    })
  } catch (error) {
    dispatch({
      type: GRADES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getGradesStudents =
  (gradeID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GRADES_STUDENTS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/admin/grades/students/${gradeID}`,
        config
      )

      dispatch({
        type: GRADES_STUDENTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: GRADES_STUDENTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getStudent =
  (studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/admin/students/${studentID}`,
        config
      )

      dispatch({
        type: STUDENT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteStudentSubject =
  (studentID, subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_SUBJECT_DELETE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.put(
        `${apiURL}/api/admin/students/${studentID}/remove/${subjectID}`,
        {},
        config
      )

      dispatch({
        type: STUDENT_SUBJECT_DELETE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_SUBJECT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteStudentSubjectDelete = () => async (dispatch) => {
  dispatch({
    type: STUDENT_SUBJECT_DELETE_DELETE,
  })
}

export const addStudentSubject =
  (studentID, name, gradeNumber, gradeLetter) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_SUBJECT_ADD_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.put(
        `${apiURL}/api/admin/students/${studentID}/add/`,
        { name, gradeNumber, gradeLetter },
        config
      )

      dispatch({
        type: STUDENT_SUBJECT_ADD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_SUBJECT_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addStudentSubjectDelete = () => async (dispatch) => {
  dispatch({
    type: STUDENT_SUBJECT_ADD_DELETE,
  })
}

export const getTeacher = (cnp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().adminLogin.token}`,
      },
    }

    const { data } = await axios.get(
      `${apiURL}/api/admin/teachers/${cnp}`,
      config
    )

    dispatch({
      type: TEACHER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TEACHER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTeacherDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_DELETE,
  })
}

export const deleteTeacherSubject =
  (cnp, subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_SUBJECT_DELETE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.put(
        `${apiURL}/api/admin/teachers/${cnp}/remove/${subjectID}`,
        {},
        config
      )

      dispatch({
        type: TEACHER_SUBJECT_DELETE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_SUBJECT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteTeacherSubjectDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_SUBJECT_DELETE_DELETE,
  })
}

export const addTeacherSubject =
  (cnp, name, gradeNumber, gradeLetter) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_SUBJECT_ADD_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.put(
        `${apiURL}/api/admin/teachers/${cnp}/add`,
        { name, gradeNumber, gradeLetter },
        config
      )

      dispatch({
        type: TEACHER_SUBJECT_ADD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_SUBJECT_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addTeacherSubjectDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_SUBJECT_ADD_DELETE,
  })
}
