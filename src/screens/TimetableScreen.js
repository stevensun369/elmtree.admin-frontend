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
  // const intervals = ['pm1', 'pm2', 'pm3', 'pm4', 'pm5', 'pm6', 'pm7']

  const daysNames = ['', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri']

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

  if (adminTimetable.periods[1]) {
    console.log(adminTimetable.periods[1]['pm2'][0].periodID)
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
      <HeaderBack backTo={`/admin/elevi/${gradeID}`}>
        {adminGrades.grades[gradeID] && (
          <>
            Orar -{' '}
            {adminGrades.grades[gradeID].gradeNumber +
              adminGrades.grades[gradeID].gradeLetter}{' '}
          </>
        )}
      </HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div class='row'>
          {adminTimetable.periods[1] && (
            <>
              {days.map((day) => (
                <div
                  class='col-6 col-sm-6 col-md-6 col-lg-4 col-xl'
                  style={{
                    float: 'left',
                  }}
                >
                  <table>
                    <thead>
                      <th scope='col' className={styles.thFirst}>
                        <span className={styles.thSpan}>Ora</span>
                      </th>
                      <th scope='col' className={styles.thLast}>
                        <span className={styles.thSpan}>
                          {daysNames[day]}
                        </span>
                      </th>
                    </thead>
                    <tbody onChange={onChangeValue}>
                      {Object.keys(adminTimetable.periods[day]).map(
                        (interval) => (
                          <>
                            {adminTimetable.periods[day][
                              interval
                            ].map((period) => (
                              <tr>
                                <th scope='row'>
                                  <span className={styles.thSpan}>
                                    {interval}
                                  </span>
                                </th>
                                <td
                                  className={
                                    selectedPeriodID ===
                                    period.periodID
                                      ? styles.tableCellSelected
                                      : styles.tableCell
                                  }
                                >
                                  <input
                                    type='radio'
                                    id={period.periodID}
                                    name='period'
                                    value={
                                      period.periodID +
                                      ',' +
                                      period.room +
                                      ',' +
                                      period.subject.name +
                                      ',' +
                                      period.split
                                    }
                                  />
                                  <label
                                    for={period.periodID}
                                    className={styles.label}
                                  >
                                    <span
                                      className={styles.labelSpan}
                                    >
                                      {period.subject.name
                                        ? period.subject.name
                                        : '-'}
                                    </span>
                                  </label>
                                </td>
                              </tr>
                            ))}
                          </>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          )}

          <div style={{ marginTop: '2vh' }}></div>

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

              <>
                <Form onSubmit={unassignSubmitHandler}>
                  <input
                    className={styles.submitButton}
                    style={{ background: 'var(--red)' }}
                    type='submit'
                    value='Sterge materia'
                  />
                </Form>
              </>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default TimetableScreen
