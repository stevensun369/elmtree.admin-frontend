import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import HeaderFull from '../components/HeaderFull'
import ListItem from '../components/ListItem'
import Loader from '../components/Loader'

import { getGrades } from '../actions/adminActions'

import styles from '../css/TeacherHomeScreen.module.css'

const TeacherHomeScreen = () => {
  // const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const adminGrades = useSelector((state) => state.adminGrades)
  const { grades, loading } = adminGrades

  // useEffect(() => {
  //   dispatch(getGrades())
  // }, [dispatch])

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
                            linkTo={`/admin/${grades[gradeID].gradeID}`}
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
