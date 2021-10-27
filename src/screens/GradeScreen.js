import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeaderBack from '../components/HeaderBack'
import ListItem from '../components/ListItem'
import NotAuthorized from '../components/NotAuthorized'
import Loader from '../components/Loader'

import { getGradesStudents } from '../actions/adminActions'

import { gradeProtect } from '../utils/protect.js'

const TeacherSubjectScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)

  const adminGrades = useSelector((state) => state.adminGrades)
  const { grades, loading } = adminGrades
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
  }, [dispatch])

  let authorized = gradeProtect(gradeID, grades)
  if (authorized) {
    return (
      <>
        {loading && <Loader />}
        {grades && (
          <>
            <HeaderBack backTo='/admin'>
              {grades[gradeID].gradeNumber +
                grades[gradeID].gradeLetter}
            </HeaderBack>
            <div className='header-margin-bottom'></div>
            <div className='main-container'>
              {students && (
                <>
                  <div className='list-divider'></div>
                  {students.map((item) => (
                    <ListItem
                      linkTo={`/admin/${gradeID}/${item.studentID}`}
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
