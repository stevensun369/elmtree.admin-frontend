import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteTeacherSubject,
  getTeacher,
} from '../actions/adminActions'

import { Form } from 'react-bootstrap'

import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'

import styles from '../css/StudentSubjectDeleteScreen.module.css'

const TeacherSubjectDeleteScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const cnp = match.params.cnp
  const subjectID = match.params.subjectID

  const adminTeacher = useSelector((state) => state.adminTeacher)
  const { teacher } = adminTeacher

  const adminTeacherSubjectDelete = useSelector(
    (state) => state.adminTeacherSubjectDelete
  )

  let subject
  for (var subjectIndex in teacher.subjectList) {
    if (teacher.subjectList[subjectIndex].subjectID === subjectID) {
      subject = teacher.subjectList[subjectIndex]
    }
  }

  useEffect(() => {
    if (!adminTeacher.teacher.teacherID) {
      dispatch(getTeacher(cnp))
    }
    if (adminTeacherSubjectDelete.subjects.length !== 0) {
      history.push(`/admin/profesori/${cnp}`)
    }
  }, [
    dispatch,
    history,
    cnp,
    adminTeacher.teacher.teacherID,
    adminTeacherSubjectDelete.subjects.length,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(deleteTeacherSubject(cnp, subjectID))
  }

  if (teacher.teacherID) {
    return (
      <>
        <HeaderBack backTo={`/admin/profesori/${cnp}`}>
          {teacher.lastName} {teacher.firstName}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <div className={styles.title}>
            {subject.grade && (
              <span>
                Șterge materia{' '}
                {subject.grade.gradeNumber +
                  subject.grade.gradeLetter}{' '}
                - {subject.name}
              </span>
            )}
          </div>

          {adminTeacher.loading ? (
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
    return <></>
  }
}

export default TeacherSubjectDeleteScreen
