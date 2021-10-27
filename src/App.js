import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getGrades } from './actions/adminActions'

import LoginScreen from './screens/LoginScreen'
import Index from './screens/Index'
import HomeScreen from './screens/HomeScreen'
import GradeScreen from './screens/GradeScreen'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGrades())
  }, [dispatch])

  return (
    <Router>
      <Route path='/' component={Index} exact />
      <Route path='/login' component={LoginScreen} exact />
      <Route path='/admin' component={HomeScreen} exact />
      <Route path='/admin/:gradeID' component={GradeScreen} />
    </Router>
  )
}

export default App
