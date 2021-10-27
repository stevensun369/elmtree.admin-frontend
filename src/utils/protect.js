const gradeProtect = (gradeID, grades) => {
  let returnVal = false

  for (let grade in grades) {
    if (grades[grade].gradeID == gradeID) {
      returnVal = true
    }
  }

  return returnVal
}

export { gradeProtect }
