/*

Komponent som sitter längst till höger i headern,
visar rätt text och knapp beroende på vem som är inloggad

*/

import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../service/UserContext';
import './userStatus.css'

function UserStatus({signOut}) {

    const {user, setUser} = useContext(UserContext);

    return (
        <div className="user-status-container">
            {user !== undefined && user.role && <>
                <div className="wrapper">
                    <p className='username'>{user.username}</p>
                    <p className='role'>{user.role.toUpperCase()}</p>
                </div>
                <button className='sign-btn' onClick={signOut} data-testid="sign-btn">Sign out</button>
            </>}
            {(user === undefined || user.role === undefined || user.role === "") && <>
                <p>Guest</p>
                <Link to="/login" className='sign-btn' data-testid="sign-btn">Sign in</Link>
            </>}
        </div>
    )
}

export default UserStatus