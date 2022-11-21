import { useState } from "react";
import {SearchBar,SearchForm,SearchFormButton,SearchFormButtonLabel,SearchFormInput} from './SearchBar.styled'


export const Searchbar = (props) =>{
  const [search, setSearch] = useState('')
  
  const  changeValue = (event) => {

    setSearch(event.target.value)
    }
 const handelSubmit = (e) => {
   e.preventDefault()   
   
       props.onSubmit(search, 1)

    }

 
        return (
          
                <SearchBar className="searchbar">
  <SearchForm className="form" onSubmit={handelSubmit} >
    <SearchFormButton type="submit" className="button">
      <SearchFormButtonLabel className="button-label">Search</SearchFormButtonLabel>
    </SearchFormButton>

                        <SearchFormInput
    
                            
        className="input"
         value={search}
      type="text"
      // autocomplete="off"
      // autofocus
      placeholder="Search images and photos"
      onChange={changeValue}
    />
  </SearchForm>
</SearchBar>

           
        )
    
}