import React, { useState, useEffect, createRef} from 'react'
import SearchBar from './SearchBar';
import { fetchBooks } from '../service/bookService';


/*
Bokvyn för gästanvändare
*/

function GuestBookView() {
    

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


  return (
    <div className='books-container'>
      <header>
        <div className="wrapper">
          <SearchBar setBooks={(books) => setBooks(books)}></SearchBar>
        </div>
      </header>
      <main>
          
        <table data-testid="table">
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