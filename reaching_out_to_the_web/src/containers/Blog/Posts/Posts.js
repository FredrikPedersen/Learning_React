import React, {Component} from "react";
import "./Posts.css";
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import {Link} from "react-router-dom";

class Posts extends Component {
    state = {
        posts: [],
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
            console.log(error);
        });
    }

    postClickedHandler = (id) => {
        this.setState({selectedPostId: id})
    };

    render() {
        let posts = <p style={{textAlign: "center", color: "red", fontWeight: "bold"}}>Something went Wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Link to={"/" + post.id } key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postClickedHandler(post.id)}/>
                    </Link>
                );
            });

            return (
                <section className="Posts">
                    {posts}
                </section>
            );
        }
    }
}

export default Posts;