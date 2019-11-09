import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import axios from "../../axios"; //Using the custom axios instance
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        //The then-method waits until get-method is done returning the data before it is executed
        axios.get("/posts").then(response => {

            //Slices the returned array down to the first twelve elements
            const posts = response.data.slice(0, 4);

            //Adds a hardcoded author to each object in the array
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: "Fredrik"
                }
            });

            this.setState({posts: updatedPosts});
        }).catch(error => {
            this.setState({error: true});
        });
    }

    postClickedHandler = (id) => {
        this.setState({selectedPostId: id})
    };

    render () {
        let posts = <p style={{textAlign: "center", color: "red", fontWeight: "bold"}}>Something went Wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postClickedHandler(post.id)}/>;
            });
        }

        return (
            <div>
                <header>
                    <nav className="Blog">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Blog">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;