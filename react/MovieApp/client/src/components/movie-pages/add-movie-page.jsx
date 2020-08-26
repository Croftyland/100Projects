import React from 'react';
import {
  Link
} from "react-router-dom";
import Modal from "./modal";

import './style.css';


const AddMoviePage = ({location}) => {
  const { state = {} } = location;
  const { modal} = state;
  return (
    <div className={modal ? "modal-state" : undefined}>
      {modal && <Link to="/"><span className="close">Close modal</span></Link>}
      <div>
        <Modal/>
      </div>
    </div>

    );
}

export default AddMoviePage;