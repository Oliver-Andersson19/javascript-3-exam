import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import UserStatus from './UserStatus';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../service/UserContext';


/*

Testning utav UserStatus komponenten, som sitter i headern
Greta vill se vilket konto hon är inloggad på

*/


// Kolla så att den renderas...
test("Test if sign out button exists if logged in", () => {

    const user = {
        username: "Greta",
        password: "123",
        role: "ADMIN"
    }

    render(<BrowserRouter><UserContext.Provider value={{user}}><UserStatus /></UserContext.Provider></BrowserRouter>);
  
    const signOutBtn = screen.getByText('Sign out');
      
    expect(signOutBtn).toBeInTheDocument();
});


test("Test if sign in button exists if not logged in to a valid account", () => {

    const user = {
        username: "Bertil",
        password: "123123",
        role: ""
    }

    render(<BrowserRouter><UserContext.Provider value={{user}}><UserStatus /></UserContext.Provider></BrowserRouter>);
  
    const signOutBtn = screen.getByText('Sign in');
      
    expect(signOutBtn).toBeInTheDocument();
});