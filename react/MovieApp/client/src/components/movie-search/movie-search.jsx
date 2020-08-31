import React, { useState } from 'react';
import './style.css';

import {
	onSearch,
} from '../../actions';
import { connect } from 'react-redux';


  

const SearchContainer = (props) => {
  const [query, setQuery] = useState('');

  const _handleKeyPress = (event) => {
   if (event.key === 'Enter') {
      props.onSearch(query);
   }
 }
     return (
        <div className = "contain">
            <div className="search">
                 <input type="text" 
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyPress={(event) => _handleKeyPress(event)}
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