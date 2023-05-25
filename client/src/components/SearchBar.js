import React from 'react'
import { search } from '../service/searchService';



function SearchBar({setBooks}) {

    let timeoutId;

    function handleChange(e) { 
        const query = e.target.value
        
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {// Gör sökning om användaren inte skrivit något nytt på en stund
            setBooks(await search(query)) // kommer från searchService
        }, 1500)
    }

    return (
        <input type="text"
            placeholder='Search...'
            onChange={handleChange}
            data-testid="searchbar"/>
    )
}

export default SearchBar