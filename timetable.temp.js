import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTimetable,
  modifyPeriod,
  unassignPeriod,
} from '../actions/adminActions'
import HeaderBack from '../components/HeaderBack'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Form } from 'react-bootstrap'

import styles from '../css/TimetableScreen.module.css'

const TimetableScreen = ({ match }) => {
  const dispatch = useDispatch()

  const gradeID = match.params.gradeID

  const adminGrades = useSelector((state) => state.adminGrades)

  const adminTimetable = useSelector((state) => state.adminTimetable)

  const days = [1, 2, 3, 4, 5]
  const intervals = ['pm1', 'pm2', 'pm3', 'pm4', 'pm5', 'pm6', 'pm7']

  // state
  const [selectedPeriodID, setSelectedPeriodID] = useState('')
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')

  const onChangeValue = (e) => {
    const value = e.target.value.split(',')
    setSelectedPeriodID(value[0])
    if (value[1] === 'undefined') {
      setRoom('')
    } else {
      setRoom(value[1])
    }

    if (value[2] === 'undefined') {
      setName('')
    } else {
      setName(value[2])
    }
  }

  const modifySubmitHandler = (e) => {
    e.preventDefault()
    dispatch(modifyPeriod(selectedPeriodID, gradeID, room, name))
  }

  const unassignSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(unassignPeriod(selectedPeriodID))
  }

  useEffect(() => {
    dispatch(getTimetable(gradeID))
  }, [dispatch, gradeID])

  return (
    <>
      <HeaderBack backTo='/admin'>
        {adminGrades.grades[gradeID] && (
          <>
            Orar -{' '}
            {adminGrades.grades[gradeID].gradeNumber +
              adminGrades.grades[gradeID].gradeLetter}
          </>
        )}
      </HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        {adminTimetable.periods[1] && (
          <>
            <table>
              <thead>
                <th
                  class={(styles.thRowFirst, styles.thRowLast)}
                  scope='col'
                >
                  Ora
                </th>
                <th scope='col'>Luni</th>
                <th scope='col'>Marți</th>
                <th scope='col'>Miercuri</th>
                <th scope='col'>Joi</th>
                <th class={styles.thRowLast} scope='col'>
                  Vineri
                </th>
              </thead>
              <tbody onChange={onChangeValue}>
                {intervals.map((interval) => (
                  <tr>
                    <th scope='row'>{interval}</th>
                    {days.map((day) => (
                      <td
                        class={
                          selectedPeriodID ===
                          adminTimetable.periods[day][interval]
                            .periodID
                            ? styles.tableCellSelected
                            : styles.tableCell
                        }
                      >
                        <input
                          type='radio'
                          id={
                            adminTimetable.periods[day][interval]
                              .periodID
                          }
                          name='period'
                          value={
                            adminTimetable.periods[day][interval]
                              .periodID +
                            ',' +
                            adminTimetable.periods[day][interval]
                              .room +
                            ',' +
                            adminTimetable.periods[day][interval]
                              .subject.name
                          }
                        />
                        <label
                          for={
                            adminTimetable.periods[day][interval]
                              .periodID
                          }
                        >
                          {adminTimetable.periods[day][interval]
                            .subject.name
                            ? adminTimetable.periods[day][interval]
                                .subject.name
                            : '-'}
                        </label>
                        <br />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
          </>
        )}

        {adminTimetable.loading && <Loader></Loader>}

        {/* the window for modyfing the periods */}
        {selectedPeriodID && !adminTimetable.loading && (
          <>
            <Form onSubmit={modifySubmitHandler}>
              {adminTimetable.error && (
                <Message variant='danger'>
                  {adminTimetable.error}
                </Message>
              )}
              <input
                type='text'
                className={styles.inputValue}
                name='nume'
                placeholder='Numele materiei'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />

              <input
                type='text'
                className={styles.inputValue}
                name='room'
                placeholder='Sala'
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value)
                }}
              />

              <input
                className={styles.submitButton}
                type='submit'
                value='Modifica materia'
              />
            </Form>
            <Form onSubmit={unassignSubmitHandler}>
              <input
                className={styles.submitButton}
                style={{ background: 'var(--red)' }}
                type='submit'
                value='Sterge materia'
              />
            </Form>
          </>
        )}
      </div>
    </>
  )
}

export default TimetableScreen
