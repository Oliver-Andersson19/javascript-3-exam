import React, { useState, useEffect, createRef} from 'react'
import SearchBar from './SearchBar';

function GuestBookView() {
    
  const [currentView, setCurrentView] = useState("books");

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"), 
      }
    }

    async function fetchData() {
      let booksResult = await fetch("http://127.0.0.1:3000/library/books", options);
      if(booksResult.status === 200) {
        booksResult = await booksResult.json()
        setBooks(booksResult);
      } else {
        console.log("No valid JWT");
      }
    }
    
    fetchData();
  }, [])


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
    result = await result.json()
    if(result.status === 200) {
      // om det gick bra
      console.log(result)
    } else {
      console.log(result)
    }
  }

  return (
    <div className='books-container'>
      <header>
        <SearchBar setBooks={(books) => setBooks(books)}></SearchBar>
      </header>
      <main>
          
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Availability</th>
          </tr>
          {books.map((book, index) => {
            const ref = createRef();
            return <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity} left</td>
            </tr>
          })}
        </table>

      </main>
    </div>
  )
}

export default GuestBookView