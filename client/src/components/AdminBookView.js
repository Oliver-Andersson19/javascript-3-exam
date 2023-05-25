import React, { useEffect, useState, createRef } from 'react'
import SearchBar from './SearchBar';

function AdminBookView() {

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
          let usersResult = await fetch("http://127.0.0.1:3000/admin/users", options);
          let booksResult = await fetch("http://127.0.0.1:3000/library/books", options);
          if(usersResult.status === 200 && booksResult.status === 200) {
            usersResult = await usersResult.json()
            booksResult = await booksResult.json()
            setUsers(usersResult);
            setBooks(booksResult.books);

            console.log(usersResult)
            console.log(booksResult)
          } else {
            console.log("No valid JWT");
          }
        }
        
        fetchData();
    }, [])


    function switchView(view) {
        setCurrentView(view)
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
                <div className="btn-wrapper">
                    <button onClick={() => switchView("books")} className={currentView === "books" ? 'active' : ''}>Books</button>
                    <button onClick={() => switchView("users")} className={currentView === "users" ? 'active' : ''}>Users</button>
                </div>
            </header>
            <main>
                
                {currentView === "books" && <table>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Order</th>
                        <th>Action</th>
                    </tr>
                    {books.map((book, index) => {
                        const ref = createRef();
                        return <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.quantity}</td>
                            <td>
                                <input type="number" name="amount" ref={ref}/>
                                <button onClick={() => orderBook(book.title, ref.current.value)}>Order</button>
                            </td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    })}
                </table>}

                {currentView === "users" && <table>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Purchases</th>
                        <th>Action</th>
                    </tr>
                    {users.map((user, index) => {
                        return <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.purchases ? user.purchases.length : 0} purchases</td>
                            <td>
                                <button>Promote</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    })}
                </table>}
            </main>
        </div>
    )
}

export default AdminBookView