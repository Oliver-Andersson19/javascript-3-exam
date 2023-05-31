import React, { useEffect, useState, createRef} from 'react'
import SearchBar from './SearchBar';
import { fetchBooks, orderBook } from '../service/bookService';

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



  async function updateData() {
    const result = await fetchBooks();

    setPolling({...polling, version: result.booksResult.version}) // uppdatera versionen på datan
    setBooks(result.booksResult.books);
    
  }

  function handleOrderChange(e) { // tillåter användaren att bara skriva in siffor
    if(!/^[0-9\b]+$/.test(e.key) && e.key !== "Backspace"){
        e.preventDefault();
    }
  }

  async function handleOrderClick(book, amount) {
    orderBook(book, amount);
    updateData()
  }

  return (
    <div className='books-container'>
      <header>
        <div className="wrapper">
          <SearchBar setBooks={(books) => setBooks(books)}></SearchBar>
        </div>
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
                <input type="text" name="amount" ref={ref} onKeyDown={handleOrderChange}/>
                <button onClick={() => handleOrderClick(book.title, parseInt(ref.current.value))} className='order-btn'>Order</button>
              </td>
            </tr>
          })}
        </table>
      </main>
    </div>
  )
}

export default UserBookView