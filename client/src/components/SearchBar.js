import React from 'react'

function SearchBar(props) {

    let timeoutId;

    function handleChange(e) { // Sök om användaren inte skrivit något nytt på en stund
        const query = e.target.value
        
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => { // hantera sökning här inne

            const options = {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"),
                  'Content-Type': "application/json"
                }
            }
          
            let result = await fetch("http://127.0.0.1:3000/library/books/search?q=" + query, options);
            if(result.status === 200) {
                result = await result.json()    
                props.setBooks(result)
            }
        }, 1500)
    }

    return (
        <input type="text" placeholder='Search...' onChange={handleChange}/>
    )
}

export default SearchBar