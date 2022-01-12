import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getGrades, login } from '../actions/adminActions'

import styles from '../css/LoginScreen.module.css'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { loading, error } = adminLogin

  useEffect(() => {
    if (adminLogin.adminInfo) {
      history.push('/')
      dispatch(getGrades())
    }
  }, [history, dispatch, adminLogin.adminInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <div className={styles.logo}>
        <img
          src='/img/tree.green.webp'
          alt='logo'
          className={styles.logoImg}
        />
        <span className={styles.logoText}>elmtree</span>
      </div>

      <div className={styles.mainCard}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <input
                type='email'
                className={styles.input}
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                className={styles.input}
                placeholder='Parola'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div
                  className={styles.messageContainer}
                  style={{ marginTop: '2vh' }}
                >
                  <Message variant='danger'>{error}</Message>
                </div>
              )}

              <input
                type='submit'
                className={styles.submitButton}
                value='Conectare'
              />
            </Form>
          </>
        )}
      </div>
    </>
  )
}

export default LoginScreen
