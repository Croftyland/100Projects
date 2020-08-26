import React from 'react';
import './style.css';

import {
	onSort,
} from '../../actions';
import { connect } from 'react-redux';
  

const MovieSort = () => {
     return (
        <div className = "contain">
                 <button
                 onClick={() => {onSort()}}
                 tabIndex="-1" 
                 name="search"
                   >Sort</button>
        </div>
     );
 
}

const mapDispatchToProps = dispatch => {
     return {
        onSort: () => dispatch(onSort()),
     }
 }

export default connect(
  null,
  mapDispatchToProps
)(MovieSort)