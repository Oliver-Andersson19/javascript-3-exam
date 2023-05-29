async function fetchUsersAndBooks() {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"), 
        }
      }

    let usersResult = await fetch("http://127.0.0.1:3000/admin/users", options);
    let booksResult = await fetch("http://127.0.0.1:3000/library/books", options);
    if(usersResult.status === 200 && booksResult.status === 200) {
        usersResult = await usersResult.json()
        booksResult = await booksResult.json()

        return { booksResult, usersResult }

    } else {
        console.log("No valid JWT");
    }
}

async function fetchBooks() {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"), 
        }
    }

    let booksResult = await fetch("http://127.0.0.1:3000/library/books", options);
    if( booksResult.status === 200) {
        
        booksResult = await booksResult.json()
        return { booksResult }

    } else {
        console.log("No valid JWT");
    }
}

async function orderBook(book, amount) {
    const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"),
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          title: book,
          quantity: amount
        })
      }
    
      let result = await fetch("http://127.0.0.1:3000/library/user/books", options);
    //   result = await result.json()
      if(result.status === 200) {
        // om det gick bra
        console.log(result)
      } else {
        console.log(result)
      }
}


export {fetchUsersAndBooks, fetchBooks, orderBook }