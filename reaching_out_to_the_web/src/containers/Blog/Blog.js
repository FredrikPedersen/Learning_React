import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from "axios";
import './Blog.css';

class Blog extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        //The then-method waits until get-method is done returning the data before it is executed
        const posts = axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {

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
        });
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author}/>;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;