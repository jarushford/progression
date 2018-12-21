export const addNewUser = async (user) => {
  const url = 'http://localhost:3000/api/progressionusers/new'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (!response.ok) {
    throw new Error('User already exists, try another email!')
  }
}

export const loginUser = async (user) => {
  const url = 'http://localhost:3000/api/progressionusers'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Incorrect email or password')
  }
  const result = await response.json()
  return result.data
}