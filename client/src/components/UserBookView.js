import React, { useEffect, useState, createRef} from 'react'
import SearchBar from './SearchBar';

function UserBookView() {
  
  const [books, setBooks] = useState([]);

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
    // result = await result.json()
    // if(result.status === 200) {
    //   // om det gick bra
    //   console.log(result)
    // } else {
    //   console.log(result)
    // }
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
            <th>Quantity</th>
            <th>Order</th>
          </tr>
          {books.map((book, index) => {
            const ref = createRef();
            return <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity} left</td>
              <td>
                <input type="number" name="amount" ref={ref}/>
                <button onClick={() => orderBook(book.title, ref.current.value)}>Order</button>
              </td>
            </tr>
          })}
        </table>
      </main>
    </div>
  )
}

export default UserBookView