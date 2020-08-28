import React from 'react';

import axios from 'axios';


const handleSelectFile = (event) => {
    let file = event.currentTarget.files[0];

    const data = new FormData();
    data.append('file', file, file.name);
    
    return axios.post("http://localhost:5000/api/movie/upload", data, {
      })
      .then(res => {
        console.log(res.data)
      })
}

const UploadMovies = () => {
        return (
                <div className="container">
                     <div className="form-group">
                     <label htmlFor="file">File upload</label>
                     <input id="file" name="file" type="file" onChange={(event) => {
                     handleSelectFile(event);
                  }} className="form-control" />
              
                </div>
                <button type="submit" className="btn btn-primary">submit</button>
              </div>
            );
          }
export default UploadMovies;