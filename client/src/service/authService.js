async function handleLogin(e, credentials) {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: credentials.username, password: credentials.password})
    }

    
    const response = await fetch("http://127.0.0.1:3000/auth/login" , options)
    
    if(response.status === 200) {
      // Ger tillbaka true om login gick igenom
      const data = await response.json();
      sessionStorage.setItem("JWT_TOKEN", data.accessToken)
      return true;
    
    } else {
      // Ge annars tillbaka felmeddelande texten
      return await response.text()
    }
  
    
}


async function handleRegister(e, credentials) {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: credentials.username, password: credentials.password})
    }

    const response = await fetch("http://127.0.0.1:3000/auth/register" , options)
    return await response.text()

}


async function fetchProfileData() {
  const options = {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"), 
    }
  }
  
  let result = await fetch("http://127.0.0.1:3000/library/profile", options);
  
  if(result.status === 200) {
    result = await result.json()
    return result.user
  }

}


const authService = { handleLogin, handleRegister, fetchProfileData }
export default authService