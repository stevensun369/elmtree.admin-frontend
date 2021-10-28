import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeacherDelete } from '../actions/adminActions'

import HeaderFull from '../components/HeaderFull'
import ListItem from '../components/ListItem'
import Loader from '../components/Loader'

import styles from '../css/TeacherHomeScreen.module.css'

const TeacherHomeScreen = ({ history }) => {
  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const adminGrades = useSelector((state) => state.adminGrades)
  const { grades, loading } = adminGrades

  useEffect(() => {
    if (!adminLogin.adminInfo) {
      history.push('/login')
    }
    dispatch(getTeacherDelete())
  })

  return (
    <>
      {adminInfo && (
        <>
          <HeaderFull />
          <div className='header-margin-bottom'></div>
          <div className='main-container'>
            {adminInfo.adminID && (
              <>
                <Link to='/admin/profesori'>
                  <div className={styles.toHomeroom}>
                    <span>&gt;&gt; către profesori</span>
                  </div>
                </Link>
                <div style={{ marginTop: '2vh' }}></div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div className='list-divider'></div>
                    {grades && (
                      <>
                        {Object.keys(grades).map((gradeID) => (
                          <ListItem
                            linkTo={`/admin/elevi/${grades[gradeID].gradeID}`}
                            key={grades[gradeID].gradeID}
                          >{`${grades[gradeID].gradeNumber}${grades[gradeID].gradeLetter}`}</ListItem>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default TeacherHomeScreen
