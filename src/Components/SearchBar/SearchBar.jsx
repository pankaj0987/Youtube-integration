import React from 'react'
import './style.css'

function SearchBar() {
    return (

                <div className="search-bar">
                    <form>
                        <input type="text" placeholder="Search..." />
                        <button><i className="fa fa-search"></i></button>
                    </form>
                </div>

    )
}

export default SearchBar