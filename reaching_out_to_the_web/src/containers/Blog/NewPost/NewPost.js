import React, { Component } from 'react';
import './NewPost.css';
import axios from "axios";
import {Redirect} from "react-router-dom";

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Fredrik',
        submitted: false
    };

    postDataHandler = () => {
        const postData = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };

        axios.post("/posts", postData).then(response => {
            console.log(response);
            this.props.history.push("/posts"); //Simpler method for redirecting. Remove comment and render {redirect} in the return statement for conditional redirection. Use .replace() instead of .push() if you don't want to add the current page to the stack.
            //this.setState({submitted: true});
        });
    };

    render () {
        /* let redirect = null;

        if (this.state.submitted) {
            redirect = <Redirect to="/posts/" />;
        } */

        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Fredrik">Fredrik</option>
                    <option value="Anders">Anders</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;