import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteStudentSubject,
  getStudent,
} from '../actions/adminActions'

import { Form } from 'react-bootstrap'

import NotAuthorized from '../components/NotAuthorized'
import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'

import styles from '../css/StudentSubjectDeleteScreen.module.css'

import { gradeProtect } from '../utils/protect'

const StudentSubjectDeleteScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const gradeID = match.params.gradeID
  const studentID = match.params.studentID
  const subjectID = match.params.subjectID

  const adminGrades = useSelector((state) => state.adminGrades)
  const { grades } = adminGrades
  const grade = grades[gradeID]

  const authorized = gradeProtect(gradeID, grades)

  // const adminGradesStudents = useSelector(
  //   (state) => state.adminGradesStudents
  // )

  const adminStudent = useSelector((state) => state.adminStudent)
  const { student } = adminStudent

  const adminStudentSubjectDelete = useSelector(
    (state) => state.adminStudentSubjectDelete
  )

  let subject
  for (var subjectIndex in student.subjectList) {
    if (student.subjectList[subjectIndex].subjectID === subjectID) {
      subject = student.subjectList[subjectIndex]
    }
  }

  console.log(adminStudentSubjectDelete.subjects.length)

  useEffect(() => {
    if (!adminStudent.student.studentID) {
      dispatch(getStudent(studentID))
    }

    if (authorized) {
      if (adminStudentSubjectDelete.subjects.length !== 0) {
        history.push(`/admin/elevi/${gradeID}/${studentID}`)
      }
    }
  }, [
    dispatch,
    adminStudent.student.studentID,
    authorized,
    adminStudentSubjectDelete.subjects.length,
    gradeID,
    studentID,
    history,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(deleteStudentSubject(studentID, subjectID))
  }

  if (authorized) {
    return (
      <>
        <HeaderBack backTo={`/admin/elevi/${gradeID}/${studentID}`}>
          {grade.gradeNumber + grade.gradeLetter} - {student.lastName}{' '}
          {student.dadInitials} {student.firstName}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <div className={styles.title}>
            <span>Șterge materia {subject.name}</span>
          </div>
          {/* value : {value} on date {dateDay} - {dateMonth} =&gt; {date} */}

          {adminStudent.loading ? (
            <Loader />
          ) : (
            <div className={styles.mainCard}>
              <Form onSubmit={submitHandler}>
                <input
                  className={styles.submitButton}
                  type='submit'
                  value='Șterge materia'
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

export default StudentSubjectDeleteScreen
