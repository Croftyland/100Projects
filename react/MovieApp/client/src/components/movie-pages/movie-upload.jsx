import React, { Fragment, useState } from 'react';
import Message from './movie-message';

import axios from 'axios';

const UploadMovies = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Upload file only in .txt format.');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');


  const onChange = (event) => {
    setFile(event.currentTarget.files[0]);
    setFilename(event.currentTarget.files[0].name);
  };

  const handleSelectFile = async event => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await axios.post("http://localhost:5000/api/movie/upload", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
      
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSelectFile}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename} 
          </label>
          <p className="custom-file-text">
            "Example of File" <br/>
            Title: Blazing Saddles<br/>
            Release Year: 1974<br/>
            Format: VHS <br/>
            Stars: Mel Brooks, Clevon Little, Harvey Korman</p>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
          </div>
        </div>
      ) : null}
    {message ? <Message msg={message} /> : null}
    </Fragment>
  );
};

export default UploadMovies;