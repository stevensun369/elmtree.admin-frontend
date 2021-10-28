import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeaderBack from '../components/HeaderBack'
import NotAuthorized from '../components/NotAuthorized'
import Loader from '../components/Loader'
import SubjectItem from '../components/SubjectItem'

import { Link } from 'react-router-dom'

import styles from '../css/StudentScreen.module.css'

import {
  deleteStudentSubjectDelete,
  addStudentSubjectDelete,
  getStudent,
} from '../actions/adminActions'

import { gradeProtect } from '../utils/protect.js'

const StudentScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)

  const adminGrades = useSelector((state) => state.adminGrades)
  const { grades, loading } = adminGrades

  const adminStudent = useSelector((state) => state.adminStudent)
  const { student } = adminStudent

  const gradeID = match.params.gradeID
  const studentID = match.params.studentID

  // if user not logged in
  if (!adminLogin.adminInfo) {
    history.push('/login')
  }

  useEffect(() => {
    dispatch(deleteStudentSubjectDelete())
    dispatch(addStudentSubjectDelete())
    dispatch(getStudent(studentID))
  }, [dispatch, studentID])

  let authorized = gradeProtect(gradeID, grades)
  if (authorized) {
    return (
      <>
        {loading && <Loader />}
        {student.studentID && (
          <>
            <HeaderBack backTo={`/admin/elevi/${gradeID}`}>
              {grades[gradeID].gradeNumber +
                grades[gradeID].gradeLetter}{' '}
              -{' '}
              {`${student.lastName} ${student.dadInitials} ${student.firstName}`}
            </HeaderBack>
            <div className='header-margin-bottom'></div>
            <div className='main-container'>
              <Link
                to={`/admin/elevi/${gradeID}/${studentID}/adauga`}
              >
                <div className={styles.toAddSubject}>
                  <span>&gt;&gt; adaugă o materie</span>
                </div>
              </Link>
              <div style={{ marginTop: '2vh' }}></div>
              {student.subjectList.length !== 0 ? (
                <>
                  <div className='list-divider'></div>
                  {student.subjectList.map((item) => (
                    <SubjectItem
                      deleteLinkTo={`/admin/elevi/${gradeID}/${studentID}/sterge/${item.subjectID}`}
                      key={item.studentID}
                    >
                      {item.name}
                    </SubjectItem>
                  ))}
                </>
              ) : (
                <div>Nu exista materii la acest elev</div>
              )}
            </div>
          </>
        )}
      </>
    )
  } else {
    return <NotAuthorized />
  }
}

export default StudentScreen
