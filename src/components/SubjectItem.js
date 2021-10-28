import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/SubjectItem.module.css'

const SubjectItem = ({ children, deleteLinkTo }) => {
  return (
    <>
      <div className={styles.listElementContainer}>
        <div className={styles.listElement}>
          <div className={styles.listElementName}>
            <span className={styles.listElementSpan}>{children}</span>
          </div>
          <div className={styles.listElementDelete}>
            <Link
              to={deleteLinkTo}
              style={{ textDecoration: 'none' }}
            >
              <div className={styles.listElementDeleteDiv}>
                <img
                  className={styles.listElementDeleteImg}
                  src='/img/motivate.truancy.webp'
                  alt=''
                />
                <span>Șterge</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='list-divider'></div>
    </>
  )
}

export default SubjectItem
