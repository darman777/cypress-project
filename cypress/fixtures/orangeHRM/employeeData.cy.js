function generateUniqueId() {
    // Take timestamp in base36 + random part
    return (Date.now().toString(36) + Math.random().toString(36).substring(2, 5))
      .substring(0, 10) // cut to max 10 chars
  }
  
  const employeeID = generateUniqueId()
 
  



export const employeeData = {
    firstName: 'Thomas',
    middleName: 'Junior',
    lastName: 'Wellington',
    employeeID: employeeID,
    photo: 'employee.jpg'
}