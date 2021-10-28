import React, { useEffect, useState } from 'react'

import Loader from '../components/Loader'
import SubjectItem from '../components/SubjectItem'
import HeaderBack from '../components/HeaderBack'
import Message from '../components/Message'

import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import styles from '../css/TeacherScreen.module.css'

import {
  addTeacherSubjectDelete,
  deleteTeacherSubjectDelete,
  getTeacher,
} from '../actions/adminActions'

import { useSelector, useDispatch } from 'react-redux'

const TeacherScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const adminTeacher = useSelector((state) => state.adminTeacher)
  const { teacher, loading } = adminTeacher

  const [cnp, setCNP] = useState('')

  useEffect(() => {
    dispatch(getTeacher(match.params.cnp))
    dispatch(deleteTeacherSubjectDelete())
    dispatch(addTeacherSubjectDelete())
  }, [dispatch, match.params.cnp])

  const submitHandler = (e) => {
    e.preventDefault()
    history.push(`/admin/profesori/${cnp}`)
  }

  return (
    <>
      <HeaderBack backTo={`/admin`}>Profesori</HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <Form onSubmit={submitHandler}>
          <input
            type='text'
            className={styles.inputValue}
            name='cnp'
            placeholder='CNP'
            value={cnp}
            onChange={(e) => {
              setCNP(e.target.value)
            }}
          />
          <input
            className={styles.submitButton}
            type='submit'
            value='Caută profesor'
          />
        </Form>

        {adminTeacher.error && (
          <Message variant='danger'>{adminTeacher.error}</Message>
        )}

        <div style={{ marginTop: '2vh' }}></div>
        {teacher.subjectList && (
          <>
            {loading && <Loader />}

            <Link to={`/admin/profesori/${teacher.cnp}/adauga`}>
              <div className={styles.toAddSubject}>
                <span>&gt;&gt; adaugă o materie</span>
              </div>
            </Link>
            <div style={{ marginTop: '2vh' }}></div>
            <div
              style={{
                marginLeft: '1vh',
                fontSize: '1.1em',
                fontWeight: '600',
              }}
            >
              {teacher.lastName} {teacher.firstName}:
            </div>
            <div style={{ marginTop: '2vh' }}></div>
            {teacher.subjectList.length !== 0 ? (
              <>
                <div className='list-divider'></div>
                {teacher.subjectList.map((item) => (
                  <SubjectItem
                    deleteLinkTo={`/admin/profesori/${teacher.cnp}/sterge/${item.subjectID}`}
                    key={teacher.teacherID}
                  >
                    {item.grade.gradeNumber + item.grade.gradeLetter}{' '}
                    - {item.name}
                  </SubjectItem>
                ))}
              </>
            ) : (
              <div>Nu exista materii la acest profesor</div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default TeacherScreen
