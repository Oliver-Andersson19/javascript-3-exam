import React, { useEffect, useState, createRef } from 'react'
import SearchBar from './SearchBar';
import Modal from './Modal';
import { fetchUsersAndBooks, orderBook } from '../service/bookService';


/*

Bokvyn för admins

Realtidsuppdateringen sköts i useEffect där tiden mellan varje
anrop ökar om inte något har ändrats på servern. Om det har skett
en ändring på servern så börjar intervallet om.


MÅSTE IMPLEMENTERAS FÖR DOM ANDRA ANVÄNDARNA OCKSÅ!!! KOM IHÅG!
*/


function AdminBookView() {

    const [currentView, setCurrentView] = useState("books");

    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);

    const [displayModal, setDisplayModal] = useState(false);
    const [action, setAction] = useState("");
    const [query, setQuery] = useState("");

    const [polling, setPolling] = useState({
        interval: 1000,
        maxTimeout: 3000,
        version: 0
    })

    const [timer, setTimer] = useState(0);

    useEffect(()=>{ // short-polling funktion
        const myTimeout = setTimeout( async () => {
            
            const result = await fetchUsersAndBooks();

            if(polling.version === result.booksResult.version) { // om inget nytt
                if(polling.interval < polling.maxTimeout) {
                    setPolling({...polling, interval: polling.interval + 1000, version: result.booksResult.version})
                } else {
                    setPolling({...polling, interval: polling.maxTimeout, version: result.booksResult.version})
                }
            } else { // om det kom nytt
                setPolling({...polling, interval: 1000, version: result.booksResult.version})
                setUsers(result.usersResult);
                setBooks(result.booksResult.books);
            }

            console.log("Interval: " + polling.interval)
            setTimer((ele) => ele + 1);
        }, polling.interval);
    
        return () => {
            clearTimeout(myTimeout)
        }
    },[timer])

    useEffect(() => {
        // updateData()
    }, [])
    
    
    
    async function updateData() {
        
        const result = await fetchUsersAndBooks();

        setPolling({...polling, version: result.booksResult.version}) // uppdatera versionen på datan
        setUsers(result.usersResult);
        setBooks(result.booksResult.books);
        
    }
    

    function switchView(view) {
        setCurrentView(view)
    }


    function handleOrderClick(book, amount) {
        orderBook(book, amount);
        updateData();
    }

    function closeModal() {
        setDisplayModal(false);
    }

    function openModal(action, query) {
        setAction(action)
        setQuery(query)
        setDisplayModal(true);
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
            {displayModal && <Modal action={action} item={query} closeModal={closeModal} updateData={updateData}/>}
            <main>
                {currentView === "books" && <table>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>
                            <button className='add-new-btn' onClick={() => openModal("add book")}>Add new Book</button>
                            Quantity
                        </th>
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
                                <button onClick={() => handleOrderClick(book.title, ref.current.value)}>Order</button>
                            </td>
                            <td>
                                <button onClick={() => openModal("edit book", book)}>Edit</button>
                                <button onClick={() => openModal("delete book", book)}>Delete</button>
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
                                <button onClick={() => openModal("promote user", user)}>Promote</button>
                                <button onClick={() => openModal("delete user", user)}>Delete</button>
                            </td>
                        </tr>
                    })}
                </table>}
            </main>
        </div>
    )
}

export default AdminBookView