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

export const getTimetable =
  (gradeID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TIMETABLE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/admin/timetable/${gradeID}`,
        config
      )

      var days = [1, 2, 3, 4, 5]
      var intervals = [
        'pm1',
        'pm2',
        'pm3',
        'pm4',
        'pm5',
        'pm6',
        'pm7',
      ]
      var periods = {}

      for (var dayKey in days) {
        var day = days[dayKey]
        periods[day] = {}
        for (var intervalKey in intervals) {
          var interval = intervals[intervalKey]
          periods[day][interval] = []
        }
      }

      for (var key in data) {
        var period = data[key]
        periods[period.day][period.interval].push(period)
      }

      dispatch({
        type: TIMETABLE_SUCCESS,
        payload: periods,
      })
    } catch (error) {
      dispatch({
        type: TIMETABLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const modifyPeriod =
  (periodID, gradeID, room, subjectName) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TIMETABLE_MODIFY_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const grades = getState().adminGrades.grades
      const subjectGradeNumber = grades[gradeID].gradeNumber
      const subjectGradeLetter = grades[gradeID].gradeLetter

      const { data } = await axios.put(
        `${apiURL}/api/admin/timetable/${periodID}`,
        {
          room,
          subjectName,
          subjectGradeNumber: String(subjectGradeNumber),
          subjectGradeLetter,
        },
        config
      )

      // getting the current periods
      let periods = getState().adminTimetable.periods

      // getting the data identifiers
      const day = data.day
      const interval = data.interval

      for (var period in periods[day][interval]) {
        if (
          periods[day][interval][period].periodID === data.periodID
        ) {
          periods[day][interval][period] = data
        }
      }

      dispatch({
        type: TIMETABLE_MODIFY_SUCCESS,
        payload: periods,
      })
    } catch (error) {
      dispatch({
        type: TIMETABLE_MODIFY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const unassignPeriod =
  (periodID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TIMETABLE_UNASSIGN_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.token}`,
        },
      }

      const { data } = await axios.delete(
        `${apiURL}/api/admin/timetable/${periodID}`,
        config
      )

      // getting the current periods
      let periods = getState().adminTimetable.periods

      // getting the data identifiers
      const day = data.day
      const interval = data.interval

      periods[day][interval] = data

      dispatch({
        type: TIMETABLE_UNASSIGN_SUCCESS,
        payload: periods,
      })
    } catch (error) {
      dispatch({
        type: TIMETABLE_UNASSIGN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
