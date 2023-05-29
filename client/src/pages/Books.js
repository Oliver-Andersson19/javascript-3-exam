import React, { useContext } from 'react'
import Header from '../components/Header'
import { UserContext } from '../service/UserContext';
import AdminBookView from '../components/AdminBookView'
import UserBookView from '../components/UserBookView'
import GuestBookView from '../components/GuestBookView'
import './books.css'

/*
Routen /books, renderar rätt vy beroende på vilken roll användaren har
*/

function Books() {

  const {user, setUser} = useContext(UserContext);
  console.log(user)

  return (
    <>
      <Header></Header>

      <section className="books-section">
        {(() => {
          switch(user?.role) {
            case 'ADMIN':
              return <AdminBookView></AdminBookView>
            case 'USER':
              return <UserBookView></UserBookView>
            default:
              return <GuestBookView></GuestBookView>
          }
        })()}
          
          
      </section>
    </>
  )
}

export default Books