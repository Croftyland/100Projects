import React, { useState } from 'react';
import './style.css';

import {
	onSearch,
} from '../../actions';
import { connect } from 'react-redux';
  

const SearchContainer = (props) => {
  const [query, setQuery] = useState('');
     return (
        <div className = "contain">
            <div className="search">
                 <input type="text" 
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Write something" 
                        className="search__input" />
                 <button
                 className="search__button" 
                 onClick={() => props.onSearch(query)}
                 tabIndex="-1" 
                 name="search"
                   >Search</button>
            
             </div>
        </div>
     );
 
}

const mapDispatchToProps = dispatch => {
     return {
        onSearch: (values) => dispatch(onSearch(values)),
     }
 }

export default connect(
  null,
  mapDispatchToProps
)(SearchContainer)