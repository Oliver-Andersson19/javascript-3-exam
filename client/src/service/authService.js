/*

Fil som sköter inloggning, registrering och hämtning av användardata

*/


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

      let data;

      try {
        data = await response.json();
      } catch {
        data = "error parsing json data"
      }
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

    let response = await fetch("http://127.0.0.1:3000/auth/register" , options)
    response = await response.json()
    return response

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

    let data;

    try {
      data = await result.json();
    } catch {
      data = "error parsing json data"
    }
    // result = await result.json()
    return data.user
  }

}


const authService = { handleLogin, handleRegister, fetchProfileData }
export default authService