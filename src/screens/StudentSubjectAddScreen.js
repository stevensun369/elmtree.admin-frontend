import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addStudentSubject,
  getStudent,
} from '../actions/adminActions'

import { Form } from 'react-bootstrap'

import NotAuthorized from '../components/NotAuthorized'
import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import Message from '../components/Message'

import styles from '../css/StudentSubjectAddScreen.module.css'

import { gradeProtect } from '../utils/protect'

const StudentSubjectAddScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')

  const gradeID = match.params.gradeID
  const studentID = match.params.studentID

  const adminGrades = useSelector((state) => state.adminGrades)
  const { grades } = adminGrades
  const grade = grades[gradeID]

  const authorized = gradeProtect(gradeID, grades)

  // const adminGradesStudents = useSelector(
  //   (state) => state.adminGradesStudents
  // )

  const adminStudent = useSelector((state) => state.adminStudent)
  const { student } = adminStudent

  const adminStudentSubjectAdd = useSelector(
    (state) => state.adminStudentSubjectAdd
  )

  useEffect(() => {
    if (!adminStudent.student.studentID) {
      dispatch(getStudent(studentID))
    }

    if (authorized) {
      if (adminStudentSubjectAdd.subjects.length !== 0) {
        history.push(`/admin/elevi/${gradeID}/${studentID}`)
      }
    }
  }, [
    dispatch,
    adminStudent.student.studentID,
    authorized,
    adminStudentSubjectAdd.subjects.length,
    gradeID,
    studentID,
    history,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      addStudentSubject(
        studentID,
        name,
        String(student.grade.gradeNumber),
        student.grade.gradeLetter
      )
    )
  }

  if (authorized) {
    return (
      <>
        <HeaderBack backTo={`/admin/elevi/${gradeID}/${studentID}`}>
          {grade.gradeNumber} {grade.gradeLetter} - {student.lastName}{' '}
          {student.dadInitials} {student.firstName}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <div className={styles.title}>
            <span>Adauga o materie:</span>
          </div>

          {adminStudentSubjectAdd.loading ? (
            <Loader />
          ) : (
            <div className={styles.mainCard}>
              <Form onSubmit={submitHandler}>
                {adminStudentSubjectAdd.error && (
                  <Message variant='danger'>
                    {adminStudentSubjectAdd.error}
                  </Message>
                )}
                <input
                  type='text'
                  className={styles.inputValue}
                  name='nume'
                  placeholder='Numele materiei'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />

                <input
                  className={styles.submitButton}
                  type='submit'
                  value='Adaugă materia'
                />
              </Form>
            </div>
          )}
        </div>
      </>
    )
  } else {
    return <NotAuthorized />
  }
}

export default StudentSubjectAddScreen
