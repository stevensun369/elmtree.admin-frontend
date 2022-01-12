import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeaderBack from '../components/HeaderBack'
import ListItem from '../components/ListItem'
import NotAuthorized from '../components/NotAuthorized'
import { Link } from 'react-router-dom'

import { getGradesStudents } from '../actions/adminActions'

import { gradeProtect } from '../utils/protect.js'

const TeacherSubjectScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)

  const adminGrades = useSelector((state) => state.adminGrades)
  const { grades } = adminGrades
  const gradeID = match.params.gradeID

  const adminGradesStudents = useSelector(
    (state) => state.adminGradesStudents
  )
  const { students } = adminGradesStudents

  // if user not logged in
  if (!adminLogin.adminInfo) {
    history.push('/login')
  }

  useEffect(() => {
    dispatch(getGradesStudents(gradeID))
  }, [dispatch, gradeID])

  let authorized = gradeProtect(gradeID, grades)
  if (authorized) {
    return (
      <>
        {/* {loading && <Loader />} */}
        {grades.length !== 0 && (
          <>
            <HeaderBack backTo='/admin'>
              {grades[gradeID].gradeNumber +
                grades[gradeID].gradeLetter}
            </HeaderBack>
            <div className='header-margin-bottom'></div>
            <div className='main-container'>
              {students && (
                <>
                  <Link to={`/admin/orar/${gradeID}`}>
                    <div className='toTimetable'>
                      <span>&gt;&gt; către orar</span>
                    </div>
                  </Link>
                  <div style={{ marginTop: '2vh' }}></div>

                  <div className='list-divider'></div>
                  {students.map((item) => (
                    <ListItem
                      linkTo={`/admin/elevi/${gradeID}/${item.studentID}`}
                      key={item.studentID}
                    >
                      {item.lastName} {item.dadInitials}{' '}
                      {item.firstName}
                    </ListItem>
                  ))}
                </>
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

export default TeacherSubjectScreen
