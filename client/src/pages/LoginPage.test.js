import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react'
import '@testing-library/jest-dom'
import LoginPage from './LoginPage'
import {BrowserRouter} from 'react-router-dom'


/*

Testning utav gäst inloggning
// Greta vill inte behöva skapa ett konto, utan hon vill kunna bara logga in som en gästanvändare

*/


// Kolla så att man kan byta från loginsida till gästvyn
test('check so that guest login works', async () => {
    render(<LoginPage />, {wrapper: BrowserRouter})
    global.window = { location: { pathname: null } };

    const loginAsGuestBtn = screen.getByTestId("guest-login");


    expect(global.window.location.pathname).toBe('/'); // bekräfta att vi är på startsidan
    fireEvent.click(loginAsGuestBtn); // Tryck på logga in som gäst knappen
    expect(global.window.location.pathname).toBe('/books'); // bekräfta att vi är inne i /books

})