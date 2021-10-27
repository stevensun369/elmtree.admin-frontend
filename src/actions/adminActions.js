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
