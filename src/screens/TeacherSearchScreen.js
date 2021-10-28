import React, { useState } from 'react'
import HeaderBack from '../components/HeaderBack'

import { Form } from 'react-bootstrap'

import styles from '../css/TeacherScreen.module.css'

const TeacherScreen = ({ history }) => {
  const [cnp, setCNP] = useState('')

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

        <div style={{ marginTop: '2vh' }}></div>
      </div>
    </>
  )
}

export default TeacherScreen
