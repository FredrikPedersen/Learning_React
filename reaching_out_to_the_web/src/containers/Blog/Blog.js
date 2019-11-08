import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from "axios";
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        //The then-method waits until get-method is done returning the data before it is executed
        axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {

            //Slices the returned array down to the first twelve elements
            const posts = response.data.slice(0, 12);

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
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;