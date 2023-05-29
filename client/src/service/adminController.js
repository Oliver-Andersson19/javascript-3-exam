async function deleteBook(query) {
    const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"),
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            title: query
        })
    }
    
    let result = await fetch("http://127.0.0.1:3000/admin/books", options);
    if(result.status === 200) {
        result = await result.json()    
        return result;
    }
}

async function promoteUser(query) {
    const options = {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"),
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            username: query
        })
    }
    
    let result = await fetch("http://127.0.0.1:3000/admin/users", options);
    if(result.status === 200) {
        result = await result.json()    
        return result;
    }
}

async function deleteUser(query) {
    const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"),
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            username: query
        })
    }
    
    let result = await fetch("http://127.0.0.1:3000/admin/users", options);
    if(result.status === 200) {
        result = await result.json()    
        return result;
    }
}


async function editBook(query, newBook) {
    const options = {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"),
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            previous: {
                title: query
            },
            current: newBook
        })
    }
    
    let result = await fetch("http://127.0.0.1:3000/admin/books", options);
    if(result.status === 200) {
        result = await result.json()    
        return result;
    }
}

async function addBook(newBook) {
    const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"),
          'Content-Type': "application/json"
        },
        body: JSON.stringify(newBook)
    }
    
    let result = await fetch("http://127.0.0.1:3000/admin/books", options);
    if(result.status === 200) {
        result = await result.json()    
        return result;
    }
}

export {deleteBook, promoteUser, deleteUser, editBook, addBook};