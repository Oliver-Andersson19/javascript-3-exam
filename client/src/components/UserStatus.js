/*

Komponent som sitter längst till höger i headern,
visar rätt text och knapp beroende på vem som är inloggad

*/

import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../service/UserContext';

function UserStatus({signOut}) {

    const {user, setUser} = useContext(UserContext);

    return (
        <div className="user-status-container">
            {user !== undefined && user.role && <>
                <p>Browsing as {user.role.toLowerCase()} {user.username}</p>
                <button className='sign-btn' onClick={signOut}>Sign out</button>
            </>}
            {(user === undefined || user.role === undefined) && <>
                <p>Browsing as guest...</p>
                <Link to="/login" className='sign-btn'>Sign in</Link>
            </>}
        </div>
    )
}

export default UserStatus