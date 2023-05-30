import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import AdminBookView from './AdminBookView'
// import { BrowserRouter } from 'react-router-dom';
// import { UserContext } from '../service/UserContext';


/*

Testning utav Modal komponenten, som som dyker när man ska ändra något i admin vyn
Greta vill få en bekräftelse på det hon ska ändra så hon inte råka göra fel.

*/


// Kolla så att rätt modal renderas...
test("Test if correct modal pops up", () => {

    render(<Modal action={"delete book"} item={{title: "Harry potter"}}></Modal>);
  
    const confirmText = screen.getByText('Are you sure you wish to delete book Harry potter?');
      
    expect(confirmText).toBeInTheDocument();
});