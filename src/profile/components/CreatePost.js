import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class CreatePost extends Component {
	render() {
		return (
			<div className="row">
	    
	    <div className="col-md-8 col-md-offset-2">
	        
    		<h3>Create post</h3>
    		
    		<form action="" method="POST">
    		    <div className="form-group">
    		        <label htmlFor="title">Title <span className="require">*</span></label>
    		        <input type="text" className="form-control" name="title" />
    		    </div>
    		    
    		    <div className="form-group">
    		        <label htmlFor="description">Description</label>
    		        <textarea rows="5" className="form-control" name="description" ></textarea>
    		    </div>
    		    
    		    <div className="form-group">
    		        <p><span className="require">*</span> - required fields</p>
    		    </div>
    		    
    		    <div className="form-group">
    		        <button type="submit" className="btn btn-primary">
    		            Create
    		        </button>
    		        <button className="btn btn-default">
    		            Cancel
    		        </button>
    		    </div>
    		</form>
		</div>
		
	</div>
		)
	}
}
export default CreatePost;