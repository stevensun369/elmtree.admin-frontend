import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getGrades } from './actions/adminActions'

import LoginScreen from './screens/LoginScreen'
import Index from './screens/Index'
import HomeScreen from './screens/HomeScreen'
import GradeScreen from './screens/GradeScreen'
import StudentScreen from './screens/StudentScreen'
import StudentSubjectDeleteScreen from './screens/StudentSubjectDeleteScreen'
import StudentSubjectAddScreen from './screens/StudentSubjectAddScreen'
import TeacherSearchScreen from './screens/TeacherSearchScreen'
import TeacherScreen from './screens/TeacherScreen'
import TeacherSubjectDeleteScreen from './screens/TeacherSubjectDeleteScreen'
import TeacherSubjectAddScreen from './screens/TeacherSubjectAddScreen'

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

      {/* teacher part */}
      <Route
        path='/admin/profesori'
        component={TeacherSearchScreen}
        exact
      />
      <Route
        path='/admin/profesori/:cnp'
        component={TeacherScreen}
        exact
      />
      <Route
        path='/admin/profesori/:cnp/sterge/:subjectID'
        component={TeacherSubjectDeleteScreen}
        exact
      />
      <Route
        path='/admin/profesori/:cnp/adauga'
        component={TeacherSubjectAddScreen}
        exact
      />

      {/* student part */}
      <Route
        path='/admin/elevi/:gradeID'
        component={GradeScreen}
        exact
      />
      <Route
        path='/admin/elevi/:gradeID/:studentID'
        component={StudentScreen}
        exact
      />
      <Route
        path='/admin/elevi/:gradeID/:studentID/sterge/:subjectID'
        component={StudentSubjectDeleteScreen}
        exact
      />

      <Route
        path='/admin/elevi/:gradeID/:studentID/adauga'
        component={StudentSubjectAddScreen}
        exact
      />
    </Router>
  )
}

export default App
