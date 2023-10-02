import React from 'react'
import search from "../assets/search.png"


const SearchBar = (props) => {
  return (
  
      <>
        <input onChange={(e)=>props.setSearchedWord(e.target.value)}value={props.searchedWord} type="text" className="form-control" placeholder="Search for Products..." aria-label="Search" aria-describedby="button-addon2"/>
        <div className="input-group-append">
          <button onClick={props.handleFiltering}className="btn btn-secondary m-1" type="button" id="button-addon2">
            <img style={{filter:"invert(1)"}} src={search} width={25} height={25}/></button>
        </div>


    </>

  )
}

export default SearchBar