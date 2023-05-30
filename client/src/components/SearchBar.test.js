import SearchBar from "./SearchBar";
import { search } from "../service/searchService.js";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";


/*

Testning utav Sökkomponenten
// Greta vill ha ett sökfält så hon kan söka efter speciella böcker

*/


// Kolla så att den renderas...
test("Check if searchbar is rendering", () => {
    render(<BrowserRouter><SearchBar /></BrowserRouter>);
  
    const SearchbarField = screen.getByTestId('searchbar');
      
    expect(SearchbarField).toBeInTheDocument();
});


// Kolla så att den ger tillbaka det som är förväntat
test("Check if searchbar function works", async () => {

    const res = await search("Harry");

    let foundHarryBook = false;

    for (let i = 0; i < res.length; i++) {
        if (res[i].title === "Harry potter the sorcerer's stone") {
            foundHarryBook = true;
        }
    }

    expect(foundHarryBook).toBeTruthy();
});