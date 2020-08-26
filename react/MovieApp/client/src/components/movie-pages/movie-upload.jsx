import React from 'react';
import { connect } from 'react-redux';
import { onUploadMovies } from '../../actions';


const handleSelectFile = (event) => {
    let file = event.currentTarget.files[0];
    let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    this.props.onUploadMovies (reader.result)
  };

  reader.onerror = function() {
    console.log(reader.error);
  };
}

const UploadMovies = (props) => {
    console.log(props.onUploadMovies)
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
const mapStateToProps = state => ({
            file: state.file
});

const mapDispatchToProps = dispatch => {
    return {
        onUploadMovies : (values) => dispatch(onUploadMovies(values)),
    }
}
        
export default connect( mapStateToProps,mapDispatchToProps)(UploadMovies );
