import { render, screen } from '@testing-library/react';
import Header from './Header';
import authService from '../service/authService';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../service/UserContext';


/*

Testning utav Header komponenten, hämtar ner användardata

*/

const MOCK_RESPONSE = {
    username: "Greta",
    password: "123",
    role: "ADMIN"
}

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_RESPONSE)
    })
  });
  
afterEach(() => {
    jest.restoreAllMocks();
});


// Kolla så att den renderas...
test("Test if fetching userdata works", async () => {
    
    
    let userData = await fetch("http://127.0.0.1/library/profile")
    userData = await userData.json()
    
    expect(userData).toBe(MOCK_RESPONSE)
  
});