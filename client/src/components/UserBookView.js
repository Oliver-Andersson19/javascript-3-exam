import React, { useEffect, useState, createRef} from 'react'
import SearchBar from './SearchBar';
import { fetchBooks } from '../service/bookService';

/*
Bokvyn för inloggade användare (ej admin)
*/

function UserBookView() {
  
  const [books, setBooks] = useState([]);

  
  const [polling, setPolling] = useState({
    interval: 1000,
    maxTimeout: 3000,
    version: 0
  })

  const [timer, setTimer] = useState(0);

  useEffect(()=>{ // short-polling funktion
    const myTimeout = setTimeout( async () => {
        
        const result = await fetchBooks();

        if(polling.version === result.booksResult.version) { // om inget nytt
            if(polling.interval < polling.maxTimeout) {
                setPolling({...polling, interval: polling.interval + 1000, version: result.booksResult.version})
            } else {
                setPolling({...polling, interval: polling.maxTimeout, version: result.booksResult.version})
            }
        } else { // om det kom nytt
            setPolling({...polling, interval: 1000, version: result.booksResult.version})
            setBooks(result.booksResult.books);
        }

        console.log("Interval: " + polling.interval)
        setTimer((ele) => ele + 1);
    }, polling.interval);

    return () => {
        clearTimeout(myTimeout)
    }
  },[timer])


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