import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addTeacherSubject,
  getTeacher,
} from '../actions/adminActions'

import { Form } from 'react-bootstrap'

import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import Message from '../components/Message'

import styles from '../css/StudentSubjectAddScreen.module.css'

const TeacherSubjectAddScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const cnp = match.params.cnp
  const [name, setName] = useState('')
  const [gradeNumber, setGradeNumber] = useState('')
  const [gradeLetter, setGradeLetter] = useState('')

  const adminTeacher = useSelector((state) => state.adminTeacher)
  const { teacher } = adminTeacher

  const adminTeacherSubjectAdd = useSelector(
    (state) => state.adminTeacherSubjectAdd
  )

  useEffect(() => {
    if (!adminTeacher.teacher.teacherID) {
      dispatch(getTeacher(cnp))
    }
    if (adminTeacherSubjectAdd.subjects.length !== 0) {
      history.push(`/admin/profesori/${cnp}`)
    }
  }, [
    dispatch,
    history,
    cnp,
    adminTeacher.teacher.teacherID,
    adminTeacherSubjectAdd.subjects.length,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addTeacherSubject(cnp, name, gradeNumber, gradeLetter))
  }

  return (
    <>
      <HeaderBack backTo={`/admin/profesori/${cnp}/`}>
        {teacher.lastName} {teacher.firstName}
      </HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div className={styles.title}>
          <span>Adauga o materie:</span>
        </div>

        {adminTeacherSubjectAdd.loading ? (
          <Loader />
        ) : (
          <div className={styles.mainCard}>
            <Form onSubmit={submitHandler}>
              {adminTeacherSubjectAdd.error && (
                <Message variant='danger'>
                  {adminTeacherSubjectAdd.error}
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
                type='text'
                className={styles.inputValue}
                name='gradeNumber'
                placeholder='Anul materiei'
                value={gradeNumber}
                onChange={(e) => {
                  setGradeNumber(e.target.value)
                }}
              />

              <input
                type='text'
                className={styles.inputValue}
                name='gradeLetter'
                placeholder='Litera materiei'
                value={gradeLetter}
                onChange={(e) => {
                  setGradeLetter(e.target.value.toUpperCase())
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
}

export default TeacherSubjectAddScreen
